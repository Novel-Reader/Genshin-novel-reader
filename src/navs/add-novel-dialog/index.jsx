import React, { useState } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Modal, Tabs, Button } from "antd";
import LoadFromLocal from "./load-from-local";
import LoadFromServer from "./load-from-server";
import LoadFromLocalBatch from "./load-from-local-batch";

import "./index.less";

const AddNovelDialog = (props) => {
  const { toggleDialog, addFile, checkFileExist, mode, server } = props;
  const [activeTab, setActiveTab] = useState("local");
  const isOnline = mode === "online";

  const handleTabChange = (activeTab) => {
    setActiveTab(activeTab);
  };

  const tabItems = [
    {
      key: "local",
      label: intl.get('Local import'),
      children: (
        <LoadFromLocal
          addFile={addFile}
          toggleDialog={toggleDialog}
          mode={mode}
          server={server}
        />
      ),
    },
    isOnline && {
      key: "batch",
      label: intl.get('Batch import'),
      children: (
        <LoadFromLocalBatch
          toggleDialog={toggleDialog}
          mode={mode}
          server={server}
        />
      ),
    },
    {
      key: "network",
      label: intl.get('Online search'),
      children: (
        <LoadFromServer
          addFile={addFile}
          toggleDialog={toggleDialog}
          checkFileExist={checkFileExist}
          mode={mode}
          server={server}
        />
      ),
    },
  ].filter(Boolean);

  return (
    <Modal
      title="导入"
      open={true}
      footer={[
        <Button key="back" onClick={toggleDialog}>取消</Button>
      ]}
      onCancel={toggleDialog}
      className="add-novel-dialog"
      width={800}
    >
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={tabItems}
      />
    </Modal>
  );
};

AddNovelDialog.propTypes = {
  toggleDialog: PropTypes.func.isRequired,
  addFile: PropTypes.func.isRequired,
  checkFileExist: PropTypes.func.isRequired,
  mode: PropTypes.string,
  server: PropTypes.string,
};

export default AddNovelDialog;
