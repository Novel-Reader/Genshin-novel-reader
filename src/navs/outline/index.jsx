import React, { Component } from "react";
import { PAGES, PARAGRAPHS } from "../../utils/constants";
import './index.css';

export default class Outline extends Component {
  render() {
    const { files, currentFileIndex, currentPageIndex } = this.props;
    const file = files[currentFileIndex];
    const { name, context, type } = file;
    if (type === PAGES || type === PARAGRAPHS) {
      const pageLen = context.length;
      const arr = new Array(pageLen).fill(1);
      return (
        <div className="outline outline-pages">
          <div className="outline-novel-name">{name}</div>
          {arr.map((item, index) => {
            return (
              <div
                className="outline-novel-index"
                style={{color: currentPageIndex === index ? 'red' : '#333'}}
                onClick={() => this.props.changePageIndex(index)}
                key={item + index}
              >{`第${index + 1}${type === PAGES ? '页' : '章'}`}</div>
            );
          })}
        </div>
      );
    }
    return null;
  }
}
