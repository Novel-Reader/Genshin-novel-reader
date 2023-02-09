import React, { Component } from "react";
import FontSettings from "./font-settings";
import ThemeSettings from "./theme-settings";
import ModeSettings from './mode-settings';
import "./index.css";

export default class BasicSettings extends Component {

  onSaveFont = (index) => {
    const fontMap = {
      1: "24px",
      2: "16px",
      3: "12px",
    };
    let style = {
      fontSize: fontMap[index]
    };
    if (this.props.style["fontSize"] !== fontMap[index]) {
      this.changeStyle(style);
    }
  }

  onSaveTheme = (index) => {
    const colorMap = {
      1: "#212529",
      2: "#212529",
      3: "rgb(153, 153, 153)",
    };
    const backgroundMap = {
      1: "rgb(251, 246, 236)",
      2: "rgb(220, 236, 210)",
      3: "rgb(50, 55, 59)",
    };
    let style = {
      color: colorMap[index],
      backgroundColor: backgroundMap[index],
    };
    if (this.props.style["color"] !== colorMap[index] || this.props.style["backgroundColor"] !== backgroundMap[index]) {
      this.changeStyle(style);
    }
  }

  changeStyle = (style) => {
    this.props.changeStyle(style);
  }
  
  render() {
    // TODO：这里从父组件中获取到当前的颜色，然后再给子组件传参
    return (
      <div className='basic-settings'>
        <FontSettings onSave={this.onSaveFont} />
        <div className='setting-divide-line'></div>
        <ThemeSettings onSave={this.onSaveTheme} />
        <div className='setting-divide-line'></div>
        <ModeSettings changeMode={this.props.changeMode} />
      </div>
    );
  }
}
