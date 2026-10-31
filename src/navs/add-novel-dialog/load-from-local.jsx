import React, { useState, useCallback, useMemo, useContext } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Button, Form, Input, Upload } from "antd";
import Select from "react-select";
import { MenuSelectStyle } from "../../utils";
import { INPUT_ACCEPT_FILE_TYPE } from "../../utils/constants";
import toaster from "../../common/toast";
import File from '../../model/file';
import { AppContext } from "../../context";

const LoadFromLocal = ({ mode, addFile, toggleDialog }) => {
  const { api, user } = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [author, setAuthor] = useState("");
  const [brief, setBrief] = useState("");
  const [currentSelected, setCurrentSelected] = useState(null);
  const [tmpFile, setTmpFile] = useState(null);

  const options = useMemo(() => [
    { value: "古典", label: intl.get('Classical') },
    { value: "同人", label: intl.get('Fan fiction') },
    { value: "言情", label: intl.get('Romance') },
    { value: "其他", label: intl.get('Other') },
  ], []);

  const isOnline = useMemo(() => mode === "online", [mode]);

  const onChange = useCallback((option) => {
    setCurrentSelected(option);
  }, []);

  const initFileInfo = useCallback((file, tmpFileContent) => {
    setFilename(file.name);
    setAuthor("");
    setBrief(tmpFileContent.slice(0, 300).replace(/\s+/gi, "").slice(0, 100));
  }, []);

  const onFileChange = useCallback((info) => {
    const file = info.file;
    const reader = new FileReader();
    reader.readAsText(file, "utf-8");
    reader.onload = function () {
      setTmpFile(this.result);
      setFile(file);
      initFileInfo(file, this.result);
    };
  }, [initFileInfo]);

  const onClear = useCallback(() => {
    setFile(null);
    setTmpFile(null);
  }, []);

  const uploadToServer = useCallback((fileObj) => {
    if (!api || !user) return;
    const { name, author, detail, brief, tag, size } = fileObj;
    const cover_photo = "";
    const price = 0;
    toaster.warning(intl.get('Uploading...'));
    api.addNovel(name, cover_photo, author, detail, price, brief, size, tag)
    .then((res) => {
      const userId = user.id;
      const book_id = res.data[0].id;
      api.updateUserBook(userId, book_id).then((res) => {
        if (res.data === 'success') {
          toaster.success(intl.get('Upload successful'));
        }
      });
    })
    .catch((err) => {
      toaster.danger(intl.get('Upload failed'));
      console.log(err);
    });
  }, [api, user]);

  const onUpload = useCallback(() => {
    const tag = currentSelected ? currentSelected.map((option) => option.value).join(" ") : "";
    const fileObj = new File({
      name: filename.trim(),
      size: file.size,
      author,
      detail: tmpFile,
      brief: brief.trim(),
      tag,
    });
    addFile(fileObj);
    if (isOnline) {
      uploadToServer(fileObj);
    }
    toggleDialog();
  }, [file, filename, author, brief, currentSelected, tmpFile, isOnline, addFile, uploadToServer, toggleDialog]);

  if (!file) {
    return (
      <div>
        <Upload
          accept={INPUT_ACCEPT_FILE_TYPE}
          onChange={onFileChange}
          beforeUpload={() => false}
        >
          <Button type="primary">{intl.get('Choose local file')}</Button>
        </Upload>
        <p>{intl.get('Supported text file types', { fileTypes: INPUT_ACCEPT_FILE_TYPE })}</p>
      </div>  
    );
  }

  return (
    <div className="local-file-info">
      <Form>
        <Form.Item label={intl.get('Name')}>
          <Input
            value={filename}
            onChange={(e) => {
              setFilename(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label={intl.get('Author')}>
          <Input
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label={intl.get('Category')}>
          <Select
            value={currentSelected}
            options={options}
            onChange={onChange}
            captureMenuScroll={false}
            className="load-from-local-type-select"
            classNamePrefix
            isMulti
            placeholder={intl.get('Select category')}
            styles={MenuSelectStyle}
          />
        </Form.Item>
        <Form.Item label={intl.get('Summary')}>
          <Input.TextArea
            value={brief}
            onChange={(e) => {
              setBrief(e.target.value);
            }}
          />
        </Form.Item>
        <Button onClick={onUpload} type="primary">{intl.get('Upload')}</Button>
        <Button onClick={onClear}>{intl.get('Cancel')}</Button>
      </Form>
    </div>
  );
};

LoadFromLocal.propTypes = {
  mode: PropTypes.string,
  addFile: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
};

export default LoadFromLocal;
