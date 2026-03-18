import React, { useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input, Upload } from "antd";
import Select from "react-select";
import { MenuSelectStyle } from "../../utils";
import { INPUT_ACCEPT_FILE_TYPE } from "../../utils/constants";
import toaster from "../../common/toast";
import File from '../../model/file';

const LoadFromLocal = ({ mode, addFile, toggleDialog }) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [author, setAuthor] = useState("");
  const [brief, setBrief] = useState("");
  const [currentSelected, setCurrentSelected] = useState(null);
  const [tmpFile, setTmpFile] = useState(null);

  const options = useMemo(() => [
    { value: "古典", label: "古典" },
    { value: "同人", label: "同人" },
    { value: "言情", label: "言情" },
    { value: "其他", label: "其他" },
  ], []);

  const isOnline = useMemo(() => mode === "online", [mode]);

  const onChange = useCallback((option) => {
    setCurrentSelected(option);
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
  }, []);

  const initFileInfo = useCallback((file, tmpFileContent) => {
    setFilename(file.name);
    setAuthor("");
    setBrief(tmpFileContent.slice(0, 300).replace(/\s+/gi, "").slice(0, 100));
  }, []);

  const onClear = useCallback(() => {
    setFile(null);
    setTmpFile(null);
  }, []);

  const uploadToServer = useCallback((fileObj) => {
    const { name, author, detail, brief, tag, size } = fileObj;
    const cover_photo = "";
    const price = 0;
    toaster.warning("正在上传中...");
    window.app.api.addNovel(name, cover_photo, author, detail, price, brief, size, tag)
    .then((res) => {
      const userId = window.app.state.user.id;
      const book_id = res.data[0].id;
      window.app.api.updateUserBook(userId, book_id).then((res) => {
        if (res.data === 'success') {
          toaster.success("上传成功");
        }
      });
    })
    .catch((err) => {
      toaster.danger("上传失败");
      // eslint-disable-next-line no-console
      console.log(err);
    });
  }, []);

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
          <Button type="primary">选择本地文件</Button>
        </Upload>
        <p>支持上传 {INPUT_ACCEPT_FILE_TYPE} 等文本文件</p>
      </div>  
    );
  }

  return (
    <div className="local-file-info">
      <Form>
        <Form.Item label="名称">
          <Input
            value={filename}
            onChange={(e) => {
              setFilename(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="作者">
          <Input
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="分类">
          <Select
            value={currentSelected}
            options={options}
            onChange={onChange}
            captureMenuScroll={false}
            className="load-from-local-type-select"
            classNamePrefix
            isMulti
            placeholder="选择分类"
            styles={MenuSelectStyle}
          />
        </Form.Item>
        <Form.Item label="摘要">
          <Input.TextArea
            value={brief}
            onChange={(e) => {
              setBrief(e.target.value);
            }}
          />
        </Form.Item>
        <Button onClick={onUpload} type="primary">上传</Button>
        <Button onClick={onClear}>取消</Button>
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
