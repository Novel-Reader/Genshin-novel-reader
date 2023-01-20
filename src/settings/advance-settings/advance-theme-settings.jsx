import React, { Component } from 'react'
import Select from 'react-select';
import { Label } from 'reactstrap';
import { MenuSelectStyle } from '../../utils';

export default class AdvanceThemeSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSelected: null,
    };
    // 最好是 16 ：9 的比例
    // 图片在外部服务器，所以加载特别慢
    const preLink = 'https://julia-1994.github.io/images/';
    this.options = [
      { value: `${preLink}KamisatoAyaka/02.jpg`, label: '神里凌华' },
      { value: 'https://julia-1994.github.io/images/Xiaogong/%E5%AE%B5%E5%AE%AB-100948840_p0.jpg', label: '宵宫' },
      { value: 'https://julia-1994.github.io/images/Barbara/100974140_p0.jpg', label: '芭芭拉' },
      { value: 'https://julia-1994.github.io/images/Keqing/391665038937_.pic_hd.jpg', label: '刻晴' },
      { value: 'https://julia-1994.github.io/images/Amber/amber.jpg', label: '安柏' },
      { value: 'https://julia-1994.github.io/images/Jane/441665038946_.pic_hd.jpg ', label: '丽莎' },
      { value: 'https://julia-1994.github.io/images/Keqing/381665038936_.pic.jpg ', label: '小艾咪' },
      { value: 'https://julia-1994.github.io/images/Noelle/01.webp', label: '诺艾尔' },
    ];
  }

  onChange = (option) => {
    this.setState({ currentSelected: option });
    // 这个组件目前只处理背景图，不考虑全局的字体和背景色
    // 现在 value 是字符串，未来考虑改成对象，包括下面三个属性
    // backgroundImage
    // color
    // backgroundColor
    this.props.changeStyle({
      backgroundImage: option.value
    });
  }

  render() {
    const preCls = 'advance-theme-settings'
    return (
      <div className={preCls}>
        <Label>系列主题</Label>
        <Select
          value={this.state.currentSelected}
          options={this.options}
          onChange={this.onChange}
          captureMenuScroll={false}
          className={`${preCls}-select`}
          classNamePrefix
          placeholder='选择主题'
          styles={MenuSelectStyle}
        />
      </div>
    )
  }
}

