import React, { Component } from "react";
import { RightIcon, LeftIcon } from "../../common/icons";

export default class FoldedIcon extends Component {
  render() {
    return (
      <div className="folder-icon" onClick={this.props.toggleRightPanel}>
        {this.props.isShowRightPanel ? <RightIcon /> : <LeftIcon />}
      </div>
    );
  }
}
