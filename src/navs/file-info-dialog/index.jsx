import React from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Modal, Button } from "antd";
import { generatorBase64Code } from '../../utils/index';

function FileInfoDialog({ file, toggleDialog }) {

  const renderInfo = (file) => {
    const fileArr = [];
    for (const key in file) {
      if (file[key] && key !== 'detail') {
        fileArr.push([key, file[key]]);
      }
    }
    return (
      <div>
        {fileArr.map(file => {
          return (
            <div key={generatorBase64Code()}>
              <span>{file[0]}</span>
              <span>: </span>
              <span>{file[1]}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Modal
      open={true}
      onCancel={toggleDialog}
      title={intl.get('Information')}
      footer={[
        <Button key="close" onClick={toggleDialog}>{intl.get('Close')}</Button>,
      ]}
    >
      {renderInfo(file)}
    </Modal>
  );
}

FileInfoDialog.propTypes = {
  toggleDialog: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
};

export default FileInfoDialog;
