import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { parseTxtToHTML } from '../../utils';

import './index.css';

export default class LongPage extends Component {

  static propTypes = {
    currentFile: PropTypes.string,
    style: PropTypes.object,
  }

  render() {
    const { currentFile, style = {} } = this.props;
    const list = parseTxtToHTML(currentFile);
    // 测试背景图片
    const pageStyle = {
      backgroundImage: `url('https://julia-1994.github.io/images/KamisatoAyaka/02.jpg')`,
    };
    // 此时 style 背景色需要变成 0.8 半透明效果比较好
    return (
      <div className="long-page" style={pageStyle}>
        <div className='long-page-container' style={style}>
          {list.map((item, index) => {
            return (<p key={index}>{item}</p>);
          })}
        </div>
      </div>
    )
  }
}
