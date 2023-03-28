import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink } from "reactstrap";
import BasicSettings from "./basic-settings";
import AdvanceSettings from "./advance-settings";

import "./index.css";

class Settings extends Component {
  // 这里应该把设置对象传过来
  static propTypes = {
  };

  constructor (props) {
    super(props);
    this.state = {
      activeTab: "basic"
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
    // 这里切换后，也需要重新设置主题样式
    // 如果是高级模式，切换成初级模式，那么切换成默认的初级样式，这里写一个默认值
  };

  render () {
    const { isShowRightPanel } = this.props;
    const { activeTab } = this.state;
    return (
      <div id="settings" className="settings" style={{ width: isShowRightPanel ? 200 : 0 }}>
        <div className='settings-header'>
          <Nav fill justified pills tabs>
            <NavItem>
              <NavLink className={activeTab === "basic" ? "active" : ""} onClick={this.toggle.bind(this, "basic")}>
                基本设置
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={activeTab === "advance" ? "active" : ""} onClick={this.toggle.bind(this, "advance")}>
                高级设置
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <div className='settings-body'>
          {activeTab === "basic" &&
            <BasicSettings changeStyle={this.props.changeStyle} style={this.props.style} changeMode={this.props.changeMode} />
          }
          {activeTab === "advance" &&
            <AdvanceSettings changeStyle={this.props.changeStyle} style={this.props.style} />
          }
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  isShowRightPanel: PropTypes.bool.isRequired,
  changeStyle: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired
};

export default Settings;
