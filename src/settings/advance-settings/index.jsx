import React, { Component } from 'react';
import AdvanceThemeSettings from './advance-theme-settings';
import ColorSettings from './color-settings';
import FontSettings from './font-settings';
import { FONT_SIZES, FONT_FAMILYS, FONT_WEIGHTS, LINE_HEIGHTS } from '../constants';

export default class AdvanceSettings extends Component {

  changeStyle = (style) => {
    this.props.changeStyle(style);
  }
  
  render() {
    const changeStyle = this.changeStyle;
    return (
      <div className='advance-settings' style={{padding: '16px'}}>
        {/* 将来考虑权限控制 */}
        {/* {isPro ? <>欢迎使用高级功能</> : <>请升级到专业版本</>} */}
        {/* 背景图设置 */}
        <AdvanceThemeSettings
          changeStyle={changeStyle}
        />
        <div className='setting-divide-line'></div>
        <FontSettings
          options={FONT_SIZES}
          title="字号"
          save={(option) => {this.changeStyle({fontSize: option.value});}}
        />
        <FontSettings
          options={FONT_FAMILYS}
          title="字体"
          save={(option) => {this.changeStyle({fontFamily: option.value});}}
        />
        <FontSettings
          options={FONT_WEIGHTS}
          title="粗细"
          save={(option) => {this.changeStyle({fontWeight: option.value});}}
        />
        <FontSettings
          options={LINE_HEIGHTS}
          title="行高"
          save={(option) => {this.changeStyle({lineHeight: option.value});}}
        />
        <div className='setting-divide-line'></div>
        <ColorSettings
          changeStyle={changeStyle}
          title='文字颜色'
          color='#666' // init color
          settingKey="color"
        />
        <ColorSettings
          changeStyle={changeStyle}
          title='背景颜色'
          color='#aaa' // init color
          settingKey="backgroundColor"
        />
      </div>
    )
  }
}
