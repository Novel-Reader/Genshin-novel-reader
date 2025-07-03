import React, { useState } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Tabs } from "antd";
import BasicSettings from "./basic-settings";
import AdvanceSettings from "./advance-settings";

import "./index.css";

const Settings = (props) => {
  const [activeTab, setActiveTab] = useState("basic");

  const onChange = (key) => {
    setActiveTab(key);
  };

  return (
    <div
      id="settings"
      className="settings"
      style={{ width: props.isShowRightPanel ? 250 : 0, padding: props.isShowRightPanel ? '0 10px' : 0 }}
    >
      <Tabs
        activeKey={activeTab}
        onChange={onChange}
        items={[
          {
            label: intl.get('Basic_settings'),
            key: "basic",
            children: (
              <BasicSettings
                changeStyle={props.changeStyle}
                style={props.style}
                changeMode={props.changeMode}
              />
            ),
          },
          {
            label: intl.get('Advanced_settings'),
            key: "advance",
            children: (
              <AdvanceSettings
                changeStyle={props.changeStyle}
                style={props.style}
              />
            ),
          },
        ]}
      />
    </div>
  );
}

Settings.propTypes = {
  isShowRightPanel: PropTypes.bool.isRequired,
  changeStyle: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
}

export default Settings;
