import React from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";
import { SearchIcon, ListIcon, TreeIcon, BackIcon } from "../common/icons";
import NavIcon from './nav-icon';

export default class NavHeader extends React.Component {
  static propTypes = {
    changeCurrentNav: PropTypes.func.isRequired,
    closeSearch: PropTypes.func.isRequired,
    openSearch: PropTypes.func.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    searchValue: PropTypes.string.isRequired,
    isSearch: PropTypes.bool,
    currentNav: PropTypes.string
  };

  openOutline = () => {
    this.props.changeCurrentNav("outline");
  };

  openFileTree = () => {
    this.props.changeCurrentNav("filetree");
  };

  render () {
    const { isSearch, currentNav } = this.props;
    if (isSearch === true) {
      return (
        <div className="navs-header">
          <div className="navs-header-search">
            <NavIcon onClick={this.props.closeSearch}>
              <BackIcon />
            </NavIcon>
            <Input
              className="navs-header-search-input"
              value={this.props.searchValue}
              onChange={this.props.onSearchChange}
              placeholder="查找"
              autoFocus
            ></Input>
          </div>
        </div>
      );
    }
    if (currentNav === "filetree" && isSearch === false) {
      return (
        <div className="navs-header">
          <NavIcon onClick={this.openOutline}><ListIcon /></NavIcon>
          <span>文件</span>
          <NavIcon onClick={this.props.openSearch}><SearchIcon/></NavIcon>
        </div>
      );
    }
    if (currentNav === "outline" && isSearch === false) {
      return (
        <div className="navs-header">
          <NavIcon onClick={this.openFileTree}><TreeIcon /></NavIcon>
          <span>大纲</span>
          <NavIcon onClick={this.props.openSearch}><SearchIcon/></NavIcon>
        </div>
      );
    }
    return null;
  }
}
