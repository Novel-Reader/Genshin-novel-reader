import React, { Component } from "react";
import PropTypes from "prop-types";
import NavFooter from "./nav-footer";
import NavHeader from "./nav-header";
import FileTree from "./file-tree";
import Outline from "./outline";

import "./index.css";

export default class Navs extends Component {

  static propTypes = {
    files: PropTypes.array.isRequired,
    currentFile: PropTypes.object,
    addFile: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired,
    changeFileIndex: PropTypes.func.isRequired,
    isShowLeftPanel: PropTypes.bool.isRequired,
    currentPageIndex: PropTypes.number.isRequired,
    changePageIndex: PropTypes.func.isRequired,
    currentFileIndex: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isSearch: false,
      searchValue: "",
      currentNav: "filetree", // filetree or outline
    };
  }

  changeCurrentNav = (currentNav) => {
    this.setState({ currentNav });
  };

  openSearch = () => {
    this.setState({ isSearch: true });
  };

  closeSearch = () => {
    this.setState({ isSearch: false, searchValue: "" });
  };

  onSearchChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  renderFileTree = () => {
    const { currentFileIndex, files } = this.props;
    const { searchValue } = this.state;
    return (
      <div>
        {files.map((file, index) => {
          return (
            <FileTree
              file={file}
              key={file.id}
              index={index}
              changeFileIndex={this.props.changeFileIndex}
              deleteFile={this.props.deleteFile}
              currentFileIndex={currentFileIndex}
              searchValue={searchValue}
            />
          );
        })}
      </div>
    );
  };

  render() {
    const { isShowLeftPanel, currentFile } = this.props;
    const { isSearch, currentNav, searchValue } = this.state;
    return (
      <div
        id="navs"
        className="navs"
        style={{
          width: isShowLeftPanel ? 200 : 0,
          display: isShowLeftPanel ? "block" : "none",
        }}
      >
        <NavHeader
          isSearch={isSearch}
          currentNav={currentNav}
          changeCurrentNav={this.changeCurrentNav}
          openSearch={this.openSearch}
          searchValue={searchValue}
          onSearchChange={this.onSearchChange}
          closeSearch={this.closeSearch}
        />
        <div className="navs-body">
          {currentNav === "filetree" && this.renderFileTree()}
          {currentNav === "outline" && (
            <Outline
              currentFile={currentFile}
              currentPageIndex={this.props.currentPageIndex}
              changePageIndex={this.props.changePageIndex}
            />
          )}
        </div>
        <NavFooter addFile={this.props.addFile} />
      </div>
    );
  }
}
