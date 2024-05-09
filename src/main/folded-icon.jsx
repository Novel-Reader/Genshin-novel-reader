import React, { Component } from "react";
import PropTypes from "prop-types";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

class FoldedIcon extends Component {
  render() {
    return (
      <div className="folder-icon" onClick={this.props.toggleRightPanel}>
        {this.props.isShowRightPanel ? <BsArrowRight /> : <BsArrowLeft />}
      </div>
    );
  }
}

FoldedIcon.propTypes = {
  isShowRightPanel: PropTypes.bool.isRequired,
  toggleRightPanel: PropTypes.func.isRequired,
};

export default FoldedIcon;
