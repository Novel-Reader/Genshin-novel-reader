import React, { Component } from "react";
import PropTypes from 'prop-types';
import { RightIcon, LeftIcon } from "../../common/icons";

class FoldedIcon extends Component {
  render () {
    return (
      <div className="folder-icon" onClick={this.props.toggleRightPanel}>
        {this.props.isShowRightPanel ? <RightIcon /> : <LeftIcon />}
      </div>
    );
  }
}

FoldedIcon.propTypes = {
  isShowRightPanel: PropTypes.bool.isRequired,
  toggleRightPanel: PropTypes.func.isRequired
};

export default FoldedIcon;
