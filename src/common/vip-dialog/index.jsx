import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, Button, Input, Label } from "reactstrap";
import "./index.css";

class VipDialog extends Component {
  render () {
    return (
      <Modal isOpen={true} toggle={this.props.toggleUpgrade} className="vip-dialog">
        <ModalHeader toggle={this.props.toggleUpgrade}>升级 VIP</ModalHeader>
        <ModalBody>
          <div style={{ marginBottom: 5 }}>你当前的账户不支持这个功能，升级 VIP，使用更多精彩的功能。</div>
          {["超过30万本在线小说", "在线极速查询", "在线24小时客服", "本地存储100本小说"].map(item => {
            return (
              <div key={item}>
                <Input type="checkbox" checked={true} readOnly />
                <Label check >{item}</Label>
              </div>
            );
          })}
          <Button color="warning" className="vip-dialog-upgrade-btn">升级VIP</Button>
        </ModalBody>
      </Modal>
    );
  }
}

VipDialog.propTypes = {
  toggleUpgrade: PropTypes.func.isRequired
};

export default VipDialog;
