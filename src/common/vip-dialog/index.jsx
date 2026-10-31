import React from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Modal, Button, Checkbox, Typography } from 'antd';

import "./index.less";

const VipDialog = ({ toggleUpgrade }) => {
  const serviceList = [
    intl.get('Over 300,000 online novels'),
    intl.get('Fast online search'),
    intl.get('24-hour online support'),
    intl.get('Store up to 100 books locally'),
  ];
  return (
    <Modal
      open={true}
      onCancel={toggleUpgrade}
      className="vip-dialog"
      title={intl.get('Upgrade to VIP')}
      footer={[
        <Button key="submit" type="primary" className="vip-dialog-upgrade-btn">
          {intl.get('Upgrade to VIP')}
        </Button>,
      ]}
    >
      <div style={{ marginBottom: 5 }}>
        {intl.get('Your account does not support this feature. Upgrade to VIP to enjoy more features.')}
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
