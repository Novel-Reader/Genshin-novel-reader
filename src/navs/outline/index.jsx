import React from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { PAGES, PARAGRAPHS } from "../../utils/constants";

import "./index.less";

const Outline = ({ currentPageIndex, currentFile, changePageIndex }) => {
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
              onClick={() => changePageIndex(index)}
              key={item + index}
            >{intl.get(type === PAGES ? 'Page {number}' : 'Chapter {number}', { number: index + 1 })}</div>
          );
        })}
      </div>
    );
  }
  
  return null;
};

Outline.propTypes = {
  currentFile: PropTypes.object,
  changePageIndex: PropTypes.func,
  currentPageIndex: PropTypes.number,
};

export default Outline;
