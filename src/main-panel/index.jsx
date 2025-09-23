import React, { Component } from "react";
import PropTypes from "prop-types";
import { TbCircleDotted, TbMenu2, TbSettings } from "react-icons/tb";
import ScrollTopIcon from "../common/scroll-top-button";
import TextViewer from "../common/text-viewer";
import FoldedIcon from "./folded-icon";
import { PAGES, PARAGRAPHS, DEFAULT_IMAGE } from "../utils/constants";

import "./index.less";

export default class MainPanel extends Component {
  static propTypes = {
    toggleRightPanel: PropTypes.func.isRequired,
    toggleLeftPanel: PropTypes.func.isRequired,
    isShowRightPanel: PropTypes.bool.isRequired,
    currentPageIndex: PropTypes.number.isRequired,
    currentFile: PropTypes.object,
    detail: PropTypes.string,
    style: PropTypes.object,
    files: PropTypes.array.isRequired,
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
    this.setState({ isMoving: true }, () => {
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
    });
  };

  renderDetail = () => {
    const { currentFile, currentPageIndex } = this.props;
    let detail = "";
    if (currentFile.type === PAGES || currentFile.type === PARAGRAPHS) {
      detail = currentFile.detail[currentPageIndex];
    } else {
      detail = currentFile.detail;
    }
    return <TextViewer detail={detail} />;
  };
  
  renderMobileHeader = () => {
    const { currentFile, files } = this.props;
    const headerName = currentFile ? files.find(file => file.id === currentFile.id).name : 'Novel reader';
    return (
      <div className="mobile-header">
        <button onClick={this.props.toggleLeftPanel}>
          <TbMenu2 />
        </button>
        <h1>{headerName}</h1>
        <button onClick={this.props.toggleRightPanel}>
          <TbSettings />
        </button>
      </div>
    );
  };

  render() {
    const { currentFile, style } = this.props;

    if (!currentFile) {
      return (
        <div
          id="main"
          className="center"
          style={window.isMobile ? { flexDirection: "column", justifyContent: "space-between" }: {}}
        >
          {window.isMobile && this.renderMobileHeader()}
          <TbCircleDotted />
        </div>
      );
    }

    return (
      <div id="main" className="main">
        {window.isMobile && this.renderMobileHeader()}
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
