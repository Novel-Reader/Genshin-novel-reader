import React, { Component } from "react";
import { UncontrolledTooltip } from "reactstrap";
import "./index.css";

export default class ScrollTopIcon extends Component {
  render() {
    const id = "novel-scroll-top-icon";
    return (
      <>
        <div className="scroll-top-icon" onClick={this.props.onClick} style={{bottom: this.props.bottom}} id={id}></div>
        <UncontrolledTooltip
          placement='right'
          target={id}
          fade={false}
          delay={{show: 0, hide: 0}}
        >
          {"回到顶部"}
        </UncontrolledTooltip>
      </>
    );
  }
}
