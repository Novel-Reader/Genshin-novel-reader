import React, { Component } from "react";
import PropTypes from "prop-types";
import { UncontrolledTooltip } from "reactstrap";
import "./index.css";

class ScrollTopIcon extends Component {
  render() {
    const id = "novel-scroll-top-icon";
    return (
      <>
        <div
          className="scroll-top-icon"
          onClick={this.props.onClick}
          style={this.props.style}
          id={id}
        ></div>
        <UncontrolledTooltip
          placement="right"
          target={id}
          fade={false}
          delay={{ show: 0, hide: 0 }}
        >
          回到顶部
        </UncontrolledTooltip>
      </>
    );
  }
}

ScrollTopIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object.isRequired,
};

export default ScrollTopIcon;
