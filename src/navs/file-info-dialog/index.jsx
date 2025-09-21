import React from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Modal, Button, Table } from "antd";
import { generatorBase64Code } from '../../utils/index';

function FileInfoDialog({ file, toggleDialog }) {

  const renderInfo = (file) => {
    const fileArr = [];
    for (const key in file) {
      if (file[key] && key !== 'detail') {
        fileArr.push({
          key: generatorBase64Code(),
          name: key,
          value: file[key]
        });
      }
    }
    
    const columns = [
      {
        title: '属性',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
        render: text => <strong>{text}</strong>
      },
      {
        title: '值',
        dataIndex: 'value',
        key: 'value',
        width: '80%'
      }
    ];
    
    return (
      <Table
        columns={columns}
        dataSource={fileArr}
        pagination={false}
        size="small"
        rowKey="key"
        bordered
      />
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
