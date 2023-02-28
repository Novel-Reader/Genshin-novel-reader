import React, { Component } from "react";
import PropTypes from "prop-types";
import LongPage from "./long-page";
import FoldedIcon from "./folded-icon";
import { PAGES, PARAGRAPHS } from "../utils/constants";
import "./index.css";

const LONG_PAGE = "long_page";
// const SHORT_PAGE = 'short_page';

export default class Main extends Component {

  static propTypes = {
    currentFile: PropTypes.object,
    style: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      mode: LONG_PAGE,
    };
  }

  render() {
    const { mode } = this.state;
    const { currentFile, style, currentPageIndex } = this.props;
    if (!currentFile) {
      return (
        <div id="main" className="main error center">
          当前没有文本，请上传并选择文本
        </div>
      );
    }

    let context = "";
    if (currentFile.type === PAGES || currentFile.type === PARAGRAPHS) {
      context = currentFile.context[currentPageIndex];
    }
    else {
      context = currentFile.context;
    }

    return (
      <div id="main" className="main">
        {mode === LONG_PAGE &&
          <LongPage
            context={context}
            style={style}
            isShowRightPanel={this.state.isShowRightPanel}
          />
        }
        {/* {mode === SHORT_PAGE &&
          <ShortPage />
        } */}
        <FoldedIcon toggleRightPanel={this.props.toggleRightPanel} isShowRightPanel={this.props.isShowRightPanel} />
      </div>
    );
  }
}
