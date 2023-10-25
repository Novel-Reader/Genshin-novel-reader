import React, { Component } from "react";
import PropTypes from 'prop-types';
import FontSettings from "./font-settings";
import ThemeSettings from "./theme-settings";
import ModeSettings from './mode-settings';
import LangSettings from './lang-settings';
import Share from './share';

import "./index.css";

class BasicSettings extends Component {
  onSaveFont = (index) => {
    const fontMap = {
      1: "24px",
      2: "16px",
      3: "12px"
    };
    const style = {
      fontSize: fontMap[index]
    };
    if (this.props.style.fontSize !== fontMap[index]) {
      this.changeStyle(style);
    }
  };

  onSaveTheme = (index) => {
    const colorMap = {
      1: "#212529",
      2: "#212529",
      3: "rgb(153, 153, 153)"
    };
    const backgroundMap = {
      1: "rgb(251, 246, 236)",
      2: "rgb(220, 236, 210)",
      3: "rgb(50, 55, 59)"
    };
    const style = {
      color: colorMap[index],
      backgroundColor: backgroundMap[index]
    };
    if (this.props.style.color !== colorMap[index] || this.props.style.backgroundColor !== backgroundMap[index]) {
      this.changeStyle(style);
    }
  };

  changeStyle = (style) => {
    this.props.changeStyle(style);
  };

  render () {
    // TODO：get current from parent component
    return (
      <div className='basic-settings'>
        <Share/>
        <div className='setting-divide-line'></div>
        <LangSettings/>
        <div className='setting-divide-line'></div>
        <FontSettings onSave={this.onSaveFont} />
        <div className='setting-divide-line'></div>
        <ThemeSettings onSave={this.onSaveTheme} />
        <div className='setting-divide-line'></div>
        <ModeSettings changeMode={this.props.changeMode} />
      </div>
    );
  }
}

BasicSettings.propTypes = {
  style: PropTypes.object.isRequired,
  changeStyle: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired
};

export default BasicSettings;
