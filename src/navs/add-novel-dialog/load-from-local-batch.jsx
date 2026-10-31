import React, { useContext, useRef } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Button } from "antd";
import { INPUT_ACCEPT_FILE_TYPE } from "../../utils/constants.js";
import toaster from "../../common/toast/index.js";
import { AppContext } from "../../context";

const LoadFromLocalBatch = (props) => {
  const { toggleDialog } = props;
  const { api } = useContext(AppContext);
  const uploadRef = useRef(null);

  const onClick = () => {
    uploadRef.current?.click();
  };

  const onFileChange = (event) => {
    const files = Array.from(event.target.files);
    toaster.warning(intl.get('Uploading...'));
    api.uploadNovels(files).then(() => {
      toaster.success(intl.get('Upload successful'));
      toggleDialog();
    }).catch(() => {
      toaster.danger(intl.get('Upload failed'));
      toggleDialog();
    });
  };

  return (
    <div>
      <Button type="primary" onClick={onClick}>{intl.get('Choose multiple local files')}</Button>
      <p>{intl.get('Batch upload file guidance', { fileTypes: INPUT_ACCEPT_FILE_TYPE })}</p>
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
};

export default LoadFromLocalBatch;
