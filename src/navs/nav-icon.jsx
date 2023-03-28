import React from "react";
import PropTypes from "prop-types";

export default class NavIcon extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.any
  };

  render () {
    return (
      <div className="navs-header-icon" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
}
