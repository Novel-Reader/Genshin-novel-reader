import React, { Component } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Modal, Tabs, Button } from "antd";
import LoadFromLocal from "./load-from-local";
import LoadFromServer from "./load-from-server";
import LoadFromLocalBatch from "./load-from-local-batch";
import setting from "../../setting.js";

import "./index.css";

class AddNovelDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "local",
    };
    this.isOnline = setting.mode === "online";
  }

  handleTabChange = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { activeTab } = this.state;
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
        <Tabs activeKey={activeTab} onChange={this.handleTabChange}>
          <Tabs.TabPane tab={intl.get('Local import')} key="local">
            <LoadFromLocal
              addFile={this.props.addFile}
              toggleDialog={this.props.toggleDialog}
            />
          </Tabs.TabPane>
          {this.isOnline && (
            <Tabs.TabPane tab={intl.get('Batch import')} key="batch">
              <LoadFromLocalBatch
                toggleDialog={this.props.toggleDialog}
              />
            </Tabs.TabPane>
          )}
          <Tabs.TabPane tab={intl.get('Online search')} key="network">
            <LoadFromServer
              addFile={this.props.addFile}
              toggleDialog={this.props.toggleDialog}
              checkFileExist={this.props.checkFileExist}
            />
          </Tabs.TabPane>
        </Tabs>
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
