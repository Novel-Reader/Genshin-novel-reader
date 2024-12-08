import React, { Component } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import {
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
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

  toggle = (activeTab) => {
    this.setState({ activeTab });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <Modal
        isOpen={true}
        toggle={this.props.toggleDialog}
        className="add-novel-dialog"
        size="lg"
      >
        <ModalHeader toggle={this.props.toggleDialog}>导入</ModalHeader>
        <ModalBody>
          <div className="add-novel-dialog-side">
            <Nav pills vertical>
              <NavItem>
                <NavLink
                  className={activeTab === "local" ? "active" : ""}
                  onClick={this.toggle.bind(this, "local")}
                >
                  {intl.get('Local import')}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "network" ? "active" : ""}
                  onClick={this.toggle.bind(this, "network")}
                >
                  {intl.get('Online import')}
                </NavLink>
              </NavItem>
              {this.isOnline &&
              <NavItem>
                <NavLink
                  className={activeTab === "batch" ? "active" : ""}
                  onClick={this.toggle.bind(this, "batch")}
                >
                  {intl.get('Local import batch')}
                </NavLink>
              </NavItem>
              }
            </Nav>
          </div>
          <div className="add-novel-dialog-main">
            {activeTab === "local" && (
              <LoadFromLocal
                addFile={this.props.addFile}
                toggleDialog={this.props.toggleDialog}
              />
            )}
            {activeTab === "network" && (
              <LoadFromServer
                addFile={this.props.addFile}
                toggleDialog={this.props.toggleDialog}
                checkFileExist={this.props.checkFileExist}
              />
            )}
            {activeTab === "batch" && (
              <LoadFromLocalBatch
                toggleDialog={this.props.toggleDialog}
              />
            )}
          </div>
        </ModalBody>
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
