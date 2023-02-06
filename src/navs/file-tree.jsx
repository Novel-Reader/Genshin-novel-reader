import React, { Component } from "react";
import classnames from "classnames";

// 文件树组件
export default class FileTree extends Component {
  render() {
    const { files, currentIndex } = this.props;
    return (
      <div>
        {files.map((file, index) => {
          const isActive = currentIndex === index;
          return (
            <div key={index} className={classnames("navs-body-item text-truncate d-flex", {"active": isActive})}>
              <span className='navs-body-item-name text-truncate' onClick={() => this.props.changeFileIndex(index)}>{file.name}</span>
              <span className="navs-body-item-delete d-block" onClick={() => this.props.deleteFile(index)}>x</span>
            </div>
          );
        })}
      </div>
    );
  }
}
