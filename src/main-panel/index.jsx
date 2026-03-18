import React, { useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { TbCircleDotted, TbMenu2, TbSettings } from "react-icons/tb";
import ScrollTopIcon from "../common/scroll-top-button";
import TextViewer from "../common/text-viewer";
import FoldedIcon from "./folded-icon";
import { PAGES, PARAGRAPHS, DEFAULT_IMAGE } from "../utils/constants";

import "./index.less";

const MainPanel = (props) => {
  const {
    toggleRightPanel,
    toggleLeftPanel,
    isShowRightPanel,
    currentPageIndex,
    currentFile,
    style,
    files
  } = props;
  
  const [isMoving, setIsMoving] = useState(false);
  const [isShowTopIcon, setIsShowTopIcon] = useState(false);
  const longPageRef = useRef(null);
  const timerRef = useRef(null);

  const onScroll = useCallback((e) => {
    if (
      !isMoving &&
      !isShowTopIcon &&
      e.target.scrollTop > window.innerHeight
    ) {
      setIsShowTopIcon(true);
    }
    if (
      !isMoving &&
      isShowTopIcon &&
      e.target.scrollTop < window.innerHeight
    ) {
      setIsShowTopIcon(false);
    }
  }, [isMoving, isShowTopIcon]);

  const scrollToTop = useCallback(() => {
    setIsMoving(true);
    let currentTop = longPageRef.current?.scrollTop || 0;
    const indent = currentTop / 50;
    
    timerRef.current = setInterval(() => {
      currentTop = currentTop - indent * 3;
      if (longPageRef.current) {
        longPageRef.current.scrollTop = currentTop;
      }
      if (currentTop < 0) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsMoving(false);
        setIsShowTopIcon(false);
      }
    }, 20);
  }, []);

  const renderDetail = useCallback(() => {
    let detailContent = "";
    if (currentFile.type === PAGES || currentFile.type === PARAGRAPHS) {
      detailContent = currentFile.detail[currentPageIndex];
    } else {
      detailContent = currentFile.detail;
    }
    return <TextViewer detail={detailContent} />;
  }, [currentFile, currentPageIndex]);

  const renderMobileHeader = useCallback(() => {
    const headerName = currentFile ? files.find(file => file.id === currentFile.id).name : 'Novel reader';
    return (
      <div className="mobile-header">
        <button onClick={toggleLeftPanel}>
          <TbMenu2 />
        </button>
        <h1>{headerName}</h1>
        <button onClick={toggleRightPanel}>
          <TbSettings />
        </button>
      </div>
    );
  }, [currentFile, files, toggleLeftPanel, toggleRightPanel]);

  if (!currentFile) {
    return (
      <div
        id="main"
        className="center"
        style={window.isMobile ? { flexDirection: "column", justifyContent: "space-between" }: {}}
      >
        {window.isMobile && renderMobileHeader()}
        <TbCircleDotted />
      </div>
    );
  }

  return (
    <div id="main" className="main">
      {window.isMobile && renderMobileHeader()}
      <div
        className="long-page"
        style={{
          backgroundImage: `url('${style.backgroundImage || DEFAULT_IMAGE}')`,
        }}
        onScroll={onScroll}
        ref={longPageRef}
      >
        <div
          className="long-page-container"
          style={Object.assign({}, { opacity: 0.75 }, style)}
        >
          {renderDetail()}
        </div>
        <ScrollTopIcon
          onClick={scrollToTop}
          style={{ bottom: isShowTopIcon ? 20 : -70 }}
        />
      </div>
      <FoldedIcon
        toggleRightPanel={toggleRightPanel}
        isShowRightPanel={isShowRightPanel}
      />
    </div>
  );
};

MainPanel.propTypes = {
  toggleRightPanel: PropTypes.func.isRequired,
  toggleLeftPanel: PropTypes.func.isRequired,
  isShowRightPanel: PropTypes.bool.isRequired,
  currentPageIndex: PropTypes.number.isRequired,
  currentFile: PropTypes.object,
  detail: PropTypes.string,
  style: PropTypes.object,
  files: PropTypes.array.isRequired,
};

export default MainPanel;
