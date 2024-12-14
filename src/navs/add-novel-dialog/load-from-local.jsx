import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, FormGroup, Form, Label, Input, ModalFooter } from "reactstrap";
import Select from "react-select";
import { MenuSelectStyle } from "../../utils";
import { INPUT_ACCEPT_FILE_TYPE } from "../../utils/constants";
import setting from "../../setting.js";
import toaster from "../../common/toast";
import File from '../../model/file';

class LoadFromLocal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      filename: "",
      author: "",
      brief: "",
      currentSelected: null,
    };
    // TODO 关键词或者分类，自定义上传，便于搜索
    this.options = [
      { value: "古典", label: "古典" },
      { value: "同人", label: "同人" },
      { value: "言情", label: "言情" },
      { value: "其他", label: "其他" },
    ];
    this.isOnline = setting.mode === "online";
  }

  onClick = () => {
    this.uploadRef.click();
  };

  onChange = (option) => {
    this.setState({ currentSelected: option });
  };

  onFileChange = () => {
    const file = this.uploadRef.files[0];
    const reader = new FileReader();
    reader.readAsText(file, "utf-8");
    const that = this;
    reader.onload = function () {
      that.tmpFile = this.result;
      that.setState({ file }, () => {
        that.initFileInfo();
      });
    };
  };

  initFileInfo = () => {
    this.setState({
      filename: this.state.file.name,
      author: "",
      brief: this.tmpFile.slice(0, 300).replace(/\s+/gi, "").slice(0, 100),
    });
  };

  onClear = () => {
    this.setState({ file: null });
    this.tmpFile = null;
  };

  onUpload = () => {
    const { filename, file, author, brief, currentSelected } = this.state;
    const tag = currentSelected ? currentSelected.map((option) => option.value).join(" ") : "";
    const fileObj = new File({
      name: filename.trim(),
      size: file.size,
      author,
      detail: this.tmpFile,
      brief: brief.trim(),
      tag,
    });
    this.props.addFile(fileObj);
    if (this.isOnline) {
      this.uploadToServer(fileObj);
    }
    this.props.toggleDialog();
  };

  uploadToServer = (fileObj) => {
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
  };

  render() {
    if (!this.state.file) {
      return (
        <div>
          <Button onClick={this.onClick} color="primary">选择本地文件</Button>
          <p>支持上传 {INPUT_ACCEPT_FILE_TYPE} 等文本文件</p>
          <input
            className="local-file-input"
            type="file"
            accept={INPUT_ACCEPT_FILE_TYPE}
            onChange={this.onFileChange}
            ref={(node) => {
              this.uploadRef = node;
            }}
          ></input>
        </div>
      );
    }
    return (
      <div className="local-file-info">
        <Form>
          <FormGroup>
            <Label for="filename">名称</Label>
            <Input
              id="filename"
              name="text"
              placeholder="请输入上传作品的名称"
              type="text"
              value={this.state.filename}
              onChange={(e) => {
                this.setState({ filename: e.target.value });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="author">作者</Label>
            <Input
              id="author"
              name="text"
              placeholder="请输入作者名称"
              type="text"
              value={this.state.author}
              onChange={(e) => {
                this.setState({ author: e.target.value });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="file-tag">分类</Label>
            <Select
              value={this.state.currentSelected}
              options={this.options}
              onChange={this.onChange}
              captureMenuScroll={false}
              className="load-from-local-type-select"
              classNamePrefix
              isMulti
              placeholder="选择分类"
              styles={MenuSelectStyle}
            />
          </FormGroup>
          <FormGroup>
            <Label for="brief">摘要（默认选择原文前 100 字）</Label>
            <Input
              className="load-from-local-brief"
              id="brief"
              name="text"
              type="textarea"
              value={this.state.brief}
              onChange={(e) => {
                this.setState({ brief: e.target.value });
              }}
            />
          </FormGroup>
          <ModalFooter>
            <Button onClick={this.onUpload} color="primary">
              上传
            </Button>
            <Button onClick={this.onClear} color="secondary">
              取消
            </Button>
          </ModalFooter>
        </Form>
      </div>
    );
  }
}

LoadFromLocal.propTypes = {
  addFile: PropTypes.func.isRequired,
  toggleDialog: PropTypes.func.isRequired,
};

export default LoadFromLocal;
