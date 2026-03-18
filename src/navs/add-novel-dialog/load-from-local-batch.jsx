import React, { useRef } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { Button } from "antd";
import { INPUT_ACCEPT_FILE_TYPE } from "../../utils/constants.js";
import toaster from "../../common/toast/index.js";

const LoadFromLocalBatch = (props) => {
  const { toggleDialog, mode, server } = props;
  const isOnline = mode === "online";
  const uploadRef = useRef(null);

  const onClick = () => {
    uploadRef.current?.click();
  };

  const onFileChange = (event) => {
    const files = Array.from(event.target.files);
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    toaster.warning("正在上传中...");
    axios.post(`${server}/api/batch-upload-novel`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      toaster.success("上传成功");
      toggleDialog();
    }).catch(error => {
      toaster.danger("上传失败");
      toggleDialog();
    });
  };

  return (
    <div>
      <Button type="primary" onClick={onClick}>选择多个本地文件</Button>
      <p>支持上传 {INPUT_ACCEPT_FILE_TYPE} 等文本文件，不超过10个文件</p>
      <input
        className="local-file-input"
        type="file"
        accept={INPUT_ACCEPT_FILE_TYPE}
        onChange={onFileChange}
        ref={uploadRef}
        multiple
      ></input>
    </div>
  );
};

LoadFromLocalBatch.propTypes = {
  toggleDialog: PropTypes.func.isRequired,
  mode: PropTypes.string,
  server: PropTypes.string,
};

export default LoadFromLocalBatch;
