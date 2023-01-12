import React, { Component } from 'react';
import AdvanceThemeSettings from './advance-theme-settings';

export default class AdvanceSettings extends Component {

  changeStyle = (style) => {
    this.props.changeStyle(style);
  }
  
  render() {
    return (
      <div className='advance-settings'>
        {/* 将来考虑权限控制 */}
        {
          window.isPro ? <>欢迎使用高级功能</> : <>请升级到专业版本</>
        }
        <AdvanceThemeSettings />
      </div>
    )
  }
}
