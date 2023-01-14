import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LongPage from './long-page';
import './index.css';

const LONG_PAGE = 'long_page';
// const SHORT_PAGE = 'short_page';

export default class Main extends Component {

  static propTypes = {
    currentFile: PropTypes.object,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      // 模式：长页面，还是分页展示
      mode: LONG_PAGE,
      // 内容：支持本地上传，或者从服务端请求，这个应该在上层组件管理 texts 和 current_index，然后传参到这里获取当前的文本。
      // 目前这个状态先写成常量
      // 后续不同等级的标题，需要渲染成单独的字号等？
    };
  }

  render() {
    const { mode } = this.state;
    const { currentFile, style } = this.props;
    if (!currentFile) {
      return (
        <div id="main" className="main error center">
          当前没有文本，请上传并选择文本
        </div>
      );
    }
    // 这个 width 需要计算
    return (
      <div id="main" className="main">
        {mode === LONG_PAGE &&
          <LongPage currentFile={currentFile.context} style={style} />
        }
        {/* {mode === SHORT_PAGE &&
          <ShortPage />
        } */}
      </div>
    )
  }
}
