import React from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";
import intl from "react-intl-universal";
import { SearchIcon, ListIcon, TreeIcon, BackIcon } from "../common/icons";
import NavIcon from "./nav-icon";
import { NAV_TYPE } from "./constants";


function NavHeader(props) {
  const { isSearch, currentNav } = props;
  if (isSearch === true) {
    return (
      <div className="navs-header">
        <div className="navs-header-search">
          <NavIcon onClick={props.closeSearch}>
            <BackIcon />
          </NavIcon>
          <Input
            className="navs-header-search-input"
            value={props.searchValue}
            onChange={props.onSearchChange}
            placeholder={intl.get('Search')}
            autoFocus
          ></Input>
        </div>
      </div>
    );
  }
  if (currentNav === NAV_TYPE.FILETREE && isSearch === false) {
    return (
      <div className="navs-header">
        <NavIcon onClick={() => props.changeCurrentNav(NAV_TYPE.OUTLINE)}>
          <ListIcon />
        </NavIcon>
        <span>{intl.get('File')}</span>
        <NavIcon onClick={props.openSearch}>
          <SearchIcon />
        </NavIcon>
      </div>
    );
  }
  if (currentNav === NAV_TYPE.OUTLINE && isSearch === false) {
    return (
      <div className="navs-header">
        <NavIcon onClick={() => props.changeCurrentNav(NAV_TYPE.FILETREE)}>
          <TreeIcon />
        </NavIcon>
        <span>{intl.get('Outline')}</span>
        <NavIcon onClick={props.openSearch}>
          <SearchIcon />
        </NavIcon>
      </div>
    );
  }
  return null;
}

NavHeader.propTypes = {
  changeCurrentNav: PropTypes.func.isRequired,
  closeSearch: PropTypes.func.isRequired,
  openSearch: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  isSearch: PropTypes.bool,
  currentNav: PropTypes.string,
};

export default NavHeader;
