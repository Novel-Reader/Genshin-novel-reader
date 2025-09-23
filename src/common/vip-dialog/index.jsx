import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Checkbox, Typography } from 'antd';

import "./index.less";

const VipDialog = ({ toggleUpgrade }) => {
  const serviceList = [
    "超过30万本在线小说",
    "在线极速查询",
    "在线24小时客服",
    "本地存储100本小说",
  ];
  return (
    <Modal
      open={true}
      onCancel={toggleUpgrade}
      className="vip-dialog"
      title="升级 VIP"
      footer={[
        <Button key="submit" type="primary" className="vip-dialog-upgrade-btn">
          升级VIP
        </Button>,
      ]}
    >
      <div style={{ marginBottom: 5 }}>
        你当前的账户不支持这个功能，升级 VIP，使用更多精彩的功能。
      </div>
      {serviceList.map((item, index) => {
        return (
          <div key={index}>
            <Checkbox checked={true} readOnly />
            <Typography.Title level={5}>{item}</Typography.Title>
          </div>
        );
      })}
    </Modal>
  );
};

VipDialog.propTypes = {
  toggleUpgrade: PropTypes.func.isRequired,
};

export default VipDialog;
