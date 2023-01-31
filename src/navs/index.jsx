import React, { Component } from "react";
import PropTypes from "prop-types";
import NavFooter from "./nav-footer";
import NavHeader from "./nav-header";
import NavBody from "./nav-body";

import "./index.css";

export default class Navs extends Component {

  static propTypes = {
    currentIndex: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { currentIndex } = this.props;
    return (
      <div id="navs" className="navs">
        <NavHeader
        />
        <NavBody
          files={this.props.files}
          changeIndex={this.props.changeIndex}
          deleteFile={this.props.deleteFile}
          currentIndex={currentIndex}
        />
        <NavFooter addFile={this.props.addFile} />
      </div>
    );
  }
}
