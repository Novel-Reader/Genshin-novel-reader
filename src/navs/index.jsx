import React, { useState } from "react";
import PropTypes from "prop-types";
import NavFooter from "./nav-footer";
import NavHeader from "./nav-header";
import FileTree from "./file-tree";
import Outline from "./outline";
import { NAV_TYPE } from "./constants";

import "./index.less";

const Navs = (props) => {
  const {
    files,
    currentFile,
    addFile,
    deleteFile,
    changeFileIndex,
    isShowLeftPanel,
    currentPageIndex,
    changePageIndex,
    currentFileIndex,
    mode,
    server
  } = props;
  
  const [isSearch, setIsSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentNav, setCurrentNav] = useState(NAV_TYPE.FILE_TREE);

  const changeCurrentNav = (currentNav) => {
    setCurrentNav(currentNav);
  };

  const openSearch = () => {
    setIsSearch(true);
  };

  const closeSearch = () => {
    setIsSearch(false);
    setSearchValue("");
  };

  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const checkFileExist = (book_id) => {
    return files.find(file => file.id === book_id);
  };

  const renderFileTree = () => {
    return (
      <div>
        {files.map((file, index) => {
          return (
            <FileTree
              file={file}
              key={file.id}
              index={index}
              changeFileIndex={changeFileIndex}
              deleteFile={deleteFile}
              currentFileIndex={currentFileIndex}
              searchValue={searchValue}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div
      id="navs"
      className="navs"
      style={{
        width: isShowLeftPanel ? 250 : 0,
        display: isShowLeftPanel ? "block" : "none",
      }}
    >
      <NavHeader
        isSearch={isSearch}
        currentNav={currentNav}
        changeCurrentNav={changeCurrentNav}
        openSearch={openSearch}
        searchValue={searchValue}
        onSearchChange={onSearchChange}
        closeSearch={closeSearch}
      />
      <div className="navs-body">
        {currentNav === NAV_TYPE.FILE_TREE && renderFileTree()}
        {currentNav === NAV_TYPE.OUTLINE && (
          <Outline
            currentFile={currentFile}
            currentPageIndex={currentPageIndex}
            changePageIndex={changePageIndex}
          />
        )}
      </div>
      <NavFooter
        addFile={addFile}
        checkFileExist={checkFileExist}
        mode={mode}
        server={server}
      />
    </div>
  );
};

Navs.propTypes = {
  files: PropTypes.array.isRequired,
  currentFile: PropTypes.object,
  addFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  changeFileIndex: PropTypes.func.isRequired,
  isShowLeftPanel: PropTypes.bool.isRequired,
  currentPageIndex: PropTypes.number.isRequired,
  changePageIndex: PropTypes.func.isRequired,
  currentFileIndex: PropTypes.number.isRequired,
  mode: PropTypes.string,
  server: PropTypes.string,
};

export default Navs;
