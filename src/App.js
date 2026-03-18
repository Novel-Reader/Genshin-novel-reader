import React, { useState, useEffect, useRef, useCallback } from "react";
import Cookies from 'js-cookie';
import intl from "react-intl-universal";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import MainPanel from "./main-panel";
import Navs from "./navs";
import Settings from "./settings";
import LocalAPI from "./api/local-api";
import { isSameObject, loadExample, isMobile } from "./utils";
import { getLocalValue, setLocalValue, NOVEL_READER_STYLE_SAVE_KEY } from "./utils/store";
import { isUp, isDown } from "./utils/hotkey";
import { convertNovel2Pages, convertNovel2Paragraph, checkParaGraph, parseNovel } from "./utils/parse";
import { DEFAULT_STYLE, PAGES, PARAGRAPHS } from "./utils/constants";
import { AppContext } from "./context";
import toaster from "./common/toast";
import File from './model/file';
import { NUM_ADD, NUM_REDUCE, NUM_CHANGE } from './reducers/reducer-types';
import LoginDialog from "./dialog/login-dialog";

import "./locale/index.js";
import "./css/App.less";

const App = ({ 
  mode = 'offline',
  server = '',
}) => {
  const [files, setFiles] = useState([]);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [currentFile, setCurrentFile] = useState(null);
  const [style, setStyle] = useState(DEFAULT_STYLE);
  const [isShowRightPanel, setIsShowRightPanel] = useState(window.isMobile ? false : true);
  const [isShowLeftPanel, setIsShowLeftPanel] = useState(window.isMobile ? false : true);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [api, setApi] = useState(null);
  const [user, setUser] = useState(null);
  const [isShowLoginDialog, setIsShowLoginDialog] = useState(false);
  
  const apiRef = useRef(null);

  useEffect(() => {
    window.isMobile = isMobile();
  }, []);

  useEffect(() => {
    if (mode === "online") {
      if (!Cookies.get("username")) {
        setIsShowLoginDialog(true); 
      } else {
        initFromServer();
      }
    } else {
      toaster.success(intl.get("Welcome_to_use_offline_mode"));
    }
    initDataFromLocalStore();
    document.addEventListener("keydown", onKeydown);
    window.app = { 
      changePageIndex, 
      changeFileIndex: handleChangeFileIndex,
      addFile,
      deleteFile: handleDeleteFile
    };

    return () => {
      document.removeEventListener("keydown", onKeydown);
      window.app = null;
    };
  }, []);

  const initDataFromLocalStore = useCallback(() => {
    getLocalValue(NOVEL_READER_STYLE_SAVE_KEY).then((localStyleStr) => {
      if (localStyleStr) {
        setStyle(JSON.parse(localStyleStr) || DEFAULT_STYLE);
      }
    });
  }, []);

  const changePageIndex = useCallback((newPageIndex) => {
    setCurrentPageIndex(newPageIndex);
  }, []);

  const closeLoginDialog = useCallback(() => {
    setIsShowLoginDialog(false);
    initFromServer();
  }, []);

  const initFromServer = useCallback(() => {
    const username = Cookies.get("username");
    if (!username) {
      toaster.warning(intl.get('Please login first'));
      setTimeout(() => {
        setIsShowLoginDialog(true);
      }, 100);
      return;
    }
    const newApi = new LocalAPI();
    newApi.init({
      server: server,
      token: Cookies.get("novelToken"),
    });
    setApi(newApi);
    apiRef.current = newApi;
    newApi.getUserInfo(username).then(res => {
      const userInfo = res.data[0];
      if (!userInfo) {
        toaster.warning(intl.get('Please login first'));
        return;
      }
      newApi.setUserInfo({ user_id: userInfo.id, username: username });
      newApi.getUserBookList(userInfo.id).then(res => {
        let fileList = res.data;
        if (fileList.length === 0) {
          const examples = loadExample();
          fileList = examples.map((file) => {
            return Object.assign(new File(file), parseNovel(file.detail));
          });
        } else {
          fileList = fileList.map(file => new File(file));
        }
        setUser(userInfo);
        setFiles(fileList);
        setCurrentFileIndex(0);
        setCurrentFile(fileList[0]);
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        toaster.warning(intl.get('Please login first'));
        setTimeout(() => {
          setIsShowLoginDialog(true);
        }, 100);
      });
    });
  }, [server]);

  const onKeydown = useCallback((e) => {
    if (isUp(e)) {
      if (document.activeElement.nodeName.toLowerCase() !== 'body') return;
      e.preventDefault();
      if (currentPageIndex === 0) {
        toaster.closeAll();
        toaster.warning(intl.get('This is already the first page'));
        return;
      }
      changePageIndex(currentPageIndex - 1);
    } else if (isDown(e)) {
      if (document.activeElement.nodeName.toLowerCase() !== 'body') return;
      e.preventDefault();
      const file = files[currentFileIndex];
      const maxIndex = file.detail.length - 1;
      if (currentPageIndex === maxIndex) {
        toaster.closeAll();
        toaster.warning(intl.get('This is already the last page'));
        return;
      }
      changePageIndex(currentPageIndex + 1);
    }
  }, [files, currentFileIndex, currentPageIndex, changePageIndex]);

  const changeMode = useCallback((mode) => {
    if (!currentFile) return;
    
    let detail = currentFile.detail;
    if (Array.isArray(detail)) {
      detail = detail.join(' ');
    } else if (typeof detail !== 'string') {
      detail = 'Article data structure is not correct, please reupload or re-download this article.';
    }
    if (mode === PAGES) {
      setCurrentFile(Object.assign({}, currentFile, convertNovel2Pages(detail)));
      setIsShowRightPanel(true);
    } else if (mode === PARAGRAPHS) {
      if (checkParaGraph(detail)) {
        setCurrentFile(Object.assign({}, currentFile, convertNovel2Paragraph(detail)));
        setIsShowRightPanel(true);
      } else {
        toaster.warning(intl.get('Paragraph not found, Paragraph mode not supported'));
      }
    }
  }, [currentFile]);

  const addFile = useCallback((file) => {
    setFiles(prevFiles => [...prevFiles, file]);
  }, []);

  const handleChangeFileIndex = useCallback((newFileIndex) => {
    setCurrentFile(files[newFileIndex]);
    setCurrentFileIndex(newFileIndex);
    setCurrentPageIndex(0);
    showNovel();
  }, [files]);

  const showNovel = useCallback(() => {
    if (window.isMobile) {
      setIsShowRightPanel(false);
      setIsShowLeftPanel(false);
    }
  }, []);

  const handleDeleteFile = useCallback((index) => {
    const newFiles = [...files];
    const book_id = newFiles[index].id;
    newFiles.splice(index, 1);
    setFiles(newFiles);
    setCurrentFile(newFiles[currentFileIndex]);
    
    if (index === currentFileIndex) {
      setCurrentFileIndex(0);
      setCurrentPageIndex(0);
    }
    apiRef.current && apiRef.current.deleteUserBook(user?.id, book_id);
  }, [files, currentFileIndex, user]);

  const changeStyle = useCallback((newStyle) => {
    const updatedStyle = Object.assign({}, style, newStyle);
    if (!isSameObject(updatedStyle, style)) {
      setStyle(updatedStyle);
      setLocalValue(NOVEL_READER_STYLE_SAVE_KEY, JSON.stringify(updatedStyle));
    }
    showNovel();
  }, [style, showNovel]);

  const toggleRightPanel = useCallback(() => {
    setIsShowRightPanel(prev => !prev);
  }, []);

  const toggleLeftPanel = useCallback(() => {
    setIsShowLeftPanel(prev => !prev);
  }, []);

  const username = Cookies.get("username");
  const isAdmin = username === "admin";
  const currentFileObj = files[currentFileIndex];

  return (
    <AppContext.Provider value={{ api, username, isAdmin }}>
      <div id="app">
        <Navs
          addFile={addFile}
          files={files}
          changeFileIndex={handleChangeFileIndex}
          deleteFile={handleDeleteFile}
          currentFileIndex={currentFileIndex}
          currentFile={currentFileObj}
          currentPageIndex={currentPageIndex}
          changePageIndex={changePageIndex}
          isShowLeftPanel={isShowLeftPanel}
          mode={mode}
          server={server}
        />
        <MainPanel
          currentFile={currentFileObj}
          files={files}
          style={style}
          toggleRightPanel={toggleRightPanel}
          isShowRightPanel={isShowRightPanel}
          currentPageIndex={currentPageIndex}
          toggleLeftPanel={toggleLeftPanel}
        />
        <Settings
          style={style}
          changeStyle={changeStyle}
          isShowRightPanel={isShowRightPanel}
          changeMode={changeMode}
        />
      </div>
      {isShowLoginDialog && (
        <LoginDialog toggle={closeLoginDialog} server={server}/>
      )}
    </AppContext.Provider>
  );
};

App.propTypes = {
  fileIndex: PropTypes.object.isRequired,
  addFileIndex: PropTypes.func.isRequired,
  deleteFileIndex: PropTypes.func.isRequired,
  changeFileIndex: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({ ...state, ...props });

const mapDispatchToProps = (dispatch) => (
  {
    addFileIndex: (payload) => dispatch({ type: NUM_ADD, payload }),
    deleteFileIndex: (payload) => dispatch({ type: NUM_REDUCE, payload }),
    changeFileIndex: (payload) => dispatch({ type: NUM_CHANGE, payload }),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
