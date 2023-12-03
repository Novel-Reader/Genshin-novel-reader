import React, { Component } from "react";
import PropTypes from "prop-types";
import { PAGES, PARAGRAPHS } from "../../utils/constants";

import "./index.css";

class Outline extends Component {
  render() {
    const { currentPageIndex, currentFile } = this.props;
    if (!currentFile) {
      return null;
    }
    const { name, detail, type } = currentFile;
    if (type === PAGES || type === PARAGRAPHS) {
      const pageLen = detail.length;
      const arr = new Array(pageLen).fill(1);
      return (
        <div className="outline outline-pages">
          <div className="outline-novel-name">{name}</div>
          {arr.map((item, index) => {
            return (
              <div
                className="outline-novel-index"
                style={{ color: currentPageIndex === index ? "red" : "#333" }}
                onClick={() => this.props.changePageIndex(index)}
                key={item + index}
              >{`第${index + 1}${type === PAGES ? "页" : "章"}`}</div>
            );
          })}
        </div>
      );
    }
    return null;
  }
}

Outline.propTypes = {
  currentFile: PropTypes.object,
  changePageIndex: PropTypes.func,
  currentPageIndex: PropTypes.number,
};

export default Outline;
