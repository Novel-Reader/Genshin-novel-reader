import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { Button } from "reactstrap";
import { INPUT_ACCEPT_FILE_TYPE } from "../../utils/constants.js";
import setting from "../../setting.js";
import toaster from "../../common/toast/index.js";

class LoadFromLocalBatch extends Component {
  constructor(props) {
    super(props);
    this.isOnline = setting.mode === "online";
  }

  onClick = () => {
    this.uploadRef.click();
  };

  onFileChange = (event) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    toaster.warning("正在上传中...");
    axios.post(`${setting.server}/api/batch-upload-novel`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      toaster.success("上传成功");
      this.props.toggleDialog();
    }).catch(error => {
      toaster.danger("上传失败");
      this.props.toggleDialog();
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.onClick} color="primary">选择多个本地文件</Button>
        <p>支持上传 {INPUT_ACCEPT_FILE_TYPE} 等文本文件，不超过10个文件</p>
        <input
          className="local-file-input"
          type="file"
          accept={INPUT_ACCEPT_FILE_TYPE}
          onChange={this.onFileChange}
          ref={(node) => { this.uploadRef = node; }}
          multiple
        ></input>
      </div>
    );
  }
}

LoadFromLocalBatch.propTypes = {
  toggleDialog: PropTypes.func.isRequired,
};

export default LoadFromLocalBatch;
