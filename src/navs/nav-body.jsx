import React, { Component } from "react";
import classnames from "classnames";

export default class NavBody extends Component {
  render() {
    return (
      <div className="navs-body">
        {this.props.files.map((file, index) => {
          const isActive = this.props.currentIndex === index;
          return (
            <div key={index} className={classnames("navs-body-item text-truncate d-flex", {"active": isActive})}>
              <span className='navs-body-item-name text-truncate' onClick={() => this.props.changeIndex(index)}>{file.name}</span>
              <span className="navs-body-item-delete d-block" onClick={() => this.props.deleteFile(index)}>x</span>
            </div>
          );
        })}
      </div>
    );
  }
}
