import React, { Component } from 'react'
import Select from 'react-select';
import { Label } from 'reactstrap';

export default class AdvanceThemeSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSelected: null,
    };
    this.options = [
      { value: 1, label: '神里凌华' },
      { value: 2, label: '雷电将军' },
      { value: 3, label: '珊瑚宫心海' },
      { value: 4, label: '荒泷一斗' },
    ];
  }

  // 最好是 16 ：9 的比例
  // 图片在外部服务器，所以加载特别慢
  // https://julia-1994.github.io/images/KamisatoAyaka/02.jpg
  // https://julia-1994.github.io/images/Xiaogong/%E5%AE%B5%E5%AE%AB-100948840_p0.jpg
  // https://julia-1994.github.io/images/Xiaogong/%E5%AE%B5%E5%AE%AB-101128510_p0.jpg
  // https://julia-1994.github.io/images/Barbara/101042063_p0.jpg
  // https://julia-1994.github.io/images/Barbara/100974140_p0.jpg
  // https://julia-1994.github.io/images/Keqing/%E5%88%BB%E6%99%B4-101081619_p0.png

  onChange = (e) => {
    this.setState({ currentSelected: e });
    console.log(e);
    // backgroundImage
    // color
    // backgroundColor
  }

  render() {
    // 这个后期再说，技术比较成熟
    const preCls = 'advance-theme-settings'
    return (
      <div className={preCls}>
        <Label>原神系列主题</Label>
        <Select
          value={this.state.currentSelected}
          options={this.options}
          onChange={this.onChange}
          captureMenuScroll={false}
          className={`${preCls}-select`}
          classNamePrefix
          placeholder='选择主题'
        />
      </div>
    )
  }
}

