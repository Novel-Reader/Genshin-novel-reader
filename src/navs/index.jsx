import React, { Component } from "react";
import PropTypes from "prop-types";
import NavFooter from "./nav-footer";
import NavHeader from "./nav-header";
import FileTree from "./file-tree";
import Outline from "./outline";

import "./index.css";

export default class Navs extends Component {

  static propTypes = {
    currentIndex: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      searchValue: "",
      currentNav: "filetree", // filetree or outline 文件树或者大纲
    };
  }

  changeCurrentNav = (currentNav) => {
    this.setState({ currentNav });
  }

  openSearch = () => {
    this.setState({ isSearch: true });
  }

  closeSearch = () => {
    this.setState({ isSearch: false, searchValue: "", });
  }

  onSearchChange = (e) => {
    this.setState({ searchValue: e.target.value });
  }

  render() {
    const { currentIndex } = this.props;
    const { isSearch, currentNav, searchValue } = this.state;
    return (
      <div id="navs" className="navs">
        <NavHeader
          isSearch={isSearch}
          currentNav={currentNav}
          changeCurrentNav={this.changeCurrentNav}
          // search
          openSearch={this.openSearch}
          searchValue={searchValue}
          onSearchChange={this.onSearchChange}
          closeSearch={this.closeSearch}
        />
        <div className="navs-body">
          {currentNav === "filetree" &&
            <FileTree
              files={this.props.files}
              changeFileIndex={this.props.changeFileIndex}
              deleteFile={this.props.deleteFile}
              currentIndex={currentIndex}
              searchValue={searchValue}
            />
          }
          {currentNav === "outline" &&
            <Outline
              searchValue={searchValue}
              files={this.props.files}
              currentIndex={currentIndex}
              currentPageIndex={this.props.currentPageIndex}
              changePageIndex={this.props.changePageIndex}
            />
          }
        </div>
        <NavFooter addFile={this.props.addFile} />
      </div>
    );
  }
}
