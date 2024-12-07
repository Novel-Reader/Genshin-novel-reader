import React from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
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
      isOpen={true}
      toggle={toggleDialog}
      className="book-detail-dialog"
    >
      <ModalHeader toggle={toggleDialog}>{intl.get('Information')}</ModalHeader>
      <ModalBody>
        {renderInfo(file)}
      </ModalBody>
      <ModalFooter>
        <Button onClick={toggleDialog}>{intl.get('Close')}</Button>
      </ModalFooter>
    </Modal>
  );
}

FileInfoDialog.propTypes = {
  toggleDialog: PropTypes.func.isRequired,
  file: PropTypes.object.isRequired,
};

export default FileInfoDialog;
