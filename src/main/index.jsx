import PropTypes from "prop-types";
import React, { Component } from "react";
import intl from "react-intl-universal";
import ScrollTopIcon from "../common/scroll-top-button";
import MarkdownViewer from "../common/markdown-viewer";
import TextViewer from "../common/text-viewer";
import CodeViewer from "../common/code-viewer";
import FoldedIcon from "./folded-icon";
import {
  PAGES,
  PARAGRAPHS,
  DEFAULT_IMAGE,
  UPLOAD_FILE_TYPES,
} from "../utils/constants";
import { getSuffix } from "../utils";

import "./index.css";

export default class Main extends Component {
  static propTypes = {
    toggleRightPanel: PropTypes.func.isRequired,
    isShowRightPanel: PropTypes.bool.isRequired,
    currentPageIndex: PropTypes.number.isRequired,
    currentFile: PropTypes.object,
    detail: PropTypes.string,
    style: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      isMoving: false,
      isShowTopIcon: false,
    };
    this.timer = null;
  }

  onScroll = (e) => {
    if (
      !this.state.isMoving &&
      !this.state.isShowTopIcon &&
      e.target.scrollTop > window.innerHeight
    ) {
      this.setState({
        isShowTopIcon: true,
      });
    }
    if (
      !this.state.isMoving &&
      this.state.isShowTopIcon &&
      e.target.scrollTop < window.innerHeight
    ) {
      this.setState({
        isShowTopIcon: false,
      });
    }
  };

  scrollToTop = () => {
    this.setState(
      {
        isMoving: true,
      },
      () => {
        let currentTop = this.longPageRef.scrollTop;
        const indent = currentTop / 50;
        this.timer = setInterval(() => {
          currentTop = currentTop - indent * 3;
          this.longPageRef.scrollTop = currentTop;
          if (currentTop < 0) {
            clearInterval(this.timer);
            this.timer = null;
            this.setState({
              isMoving: false,
              isShowTopIcon: false,
            });
          }
        }, 20);
      }
    );
  };

  renderDetail = () => {
    const { currentFile, currentPageIndex } = this.props;

    // 这里数据类型处理的不好，未来重新处理
    let detail = "";
    if (currentFile.type === PAGES || currentFile.type === PARAGRAPHS) {
      detail = currentFile.detail[currentPageIndex];
    } else {
      detail = currentFile.detail;
    }

    const fileName = currentFile.name.toLowerCase();
    const suffix = getSuffix(fileName);

    if (currentFile) {
      // markdown阅读器
      if (suffix === "md") {
        return <MarkdownViewer detail={detail} />;
      }
      // 代码片段阅读器
      if (UPLOAD_FILE_TYPES.includes(suffix)) {
        return <CodeViewer detail={detail} lan={suffix} />;
      }
    }
    // 其他都使用 txt 格式
    return <TextViewer detail={detail} />;
  };

  render() {
    const { currentFile, style } = this.props;

    if (!currentFile) {
      return (
        <div id="main" className="main error center">
          {intl.get('There is currently no text available, please upload and select the text')}
        </div>
      );
    }

    return (
      <div id="main" className="main">
        <div
          className="long-page"
          style={{
            backgroundImage: `url('${style.backgroundImage || DEFAULT_IMAGE}')`,
          }}
          onScroll={this.onScroll}
          ref={(node) => {
            this.longPageRef = node;
          }}
        >
          <div
            className="long-page-container"
            style={Object.assign({}, { opacity: 0.75 }, style)}
          >
            {this.renderDetail()}
          </div>
          <ScrollTopIcon
            onClick={this.scrollToTop}
            style={{ bottom: this.state.isShowTopIcon ? 20 : -70 }}
          />
        </div>
        <FoldedIcon
          toggleRightPanel={this.props.toggleRightPanel}
          isShowRightPanel={this.props.isShowRightPanel}
        />
      </div>
    );
  }
}
