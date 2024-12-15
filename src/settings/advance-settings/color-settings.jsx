import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography, Popover } from 'antd';
import { SketchPicker } from "react-color";

class ColorSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.color,
      isShowPicker: false,
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.onDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onDocumentClick);
  }

  onDocumentClick = (e) => {
    if (!this.state.isShowPicker) return;
    let dom = e.target;
    while (dom) {
      if (dom.className.includes("font-color-settings-picker")) {
        return;
      }
      dom = dom.parentElement;
    }
    this.setState({
      isShowPicker: false,
    });
  };

  handleChangeComplete = (colorObj) => {
    this.setState({ color: colorObj.hex });
    this.props.changeStyle({
      [this.props.settingKey]: colorObj.hex,
    });
  };

  toggle = (e) => {
    e.stopPropagation();
    this.setState({ isShowPicker: !this.state.isShowPicker });
  };

  handleVisibleChange = (visible) => {
    this.setState({ isShowPicker: visible });
  };

  render() {
    return (
      <div className="advance-font-settings">
        <Typography.Title level={5}>{this.props.title}</Typography.Title>
        <div
          style={{ backgroundColor: this.state.color }}
          onClick={this.toggle}
          className="font-color-settings-current"
        ></div>
        <Popover
          content={
            <SketchPicker
              className="font-color-settings-picker"
              color={this.state.color}
              onChangeComplete={this.handleChangeComplete}
            />
          }
          trigger="click"
          open={this.state.isShowPicker}
          onOpenChange={this.handleVisibleChange}
        >
          <div></div>
        </Popover>
      </div>
    );
  }
}

ColorSettings.propTypes = {
  color: PropTypes.string.isRequired,
  changeStyle: PropTypes.func.isRequired,
  settingKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ColorSettings;
