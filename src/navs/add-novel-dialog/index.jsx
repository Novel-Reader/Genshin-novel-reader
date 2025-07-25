import React, { Component } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Modal, Tabs, Button } from "antd";
import LoadFromLocal from "./load-from-local";
import LoadFromServer from "./load-from-server";
import LoadFromLocalBatch from "./load-from-local-batch";

import "./index.css";

class AddNovelDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "local",
    };
    this.isOnline = this.props.mode === "online";
  }

  handleTabChange = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { activeTab } = this.state;
    const tabItems = [
      {
        key: "local",
        label: intl.get('Local import'),
        children: (
          <LoadFromLocal
            addFile={this.props.addFile}
            toggleDialog={this.props.toggleDialog}
            mode={this.props.mode}
            server={this.props.server}
          />
        ),
      },
      this.isOnline && {
        key: "batch",
        label: intl.get('Batch import'),
        children: (
          <LoadFromLocalBatch
            toggleDialog={this.props.toggleDialog}
            mode={this.props.mode}
            server={this.props.server}
          />
        ),
      },
      {
        key: "network",
        label: intl.get('Online search'),
        children: (
          <LoadFromServer
            addFile={this.props.addFile}
            toggleDialog={this.props.toggleDialog}
            checkFileExist={this.props.checkFileExist}
            mode={this.props.mode}
            server={this.props.server}
          />
        ),
      },
    ].filter(Boolean);

    return (
      <Modal
        title="导入"
        open={true}
        footer={[
          <Button key="back" onClick={this.props.toggleDialog}>取消</Button>
        ]}
        onCancel={this.props.toggleDialog}
        className="add-novel-dialog"
        width={800}
      >
        <Tabs
          activeKey={activeTab}
          onChange={this.handleTabChange}
          items={tabItems}
        />
      </Modal>
    );
  }
}

AddNovelDialog.propTypes = {
  toggleDialog: PropTypes.func.isRequired,
  addFile: PropTypes.func.isRequired,
  checkFileExist: PropTypes.func.isRequired,
};

export default AddNovelDialog;
