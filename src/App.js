import React, { Component } from "react";
import cookie from "react-cookies";
import intl from "react-intl-universal";
import Main from "./main";
import Navs from "./navs";
import Settings from "./settings";
import LocalAPI from "./api/local-api";
import { isSameObject, loadExample } from "./utils";
import { getLocalValue, setLocalValue, NOVEL_READER_STYLE_SAVE_KEY } from "./utils/store";
import { isUp, isDown } from "./utils/hotkey";
import { convertNovel2Pages, convertNovel2Paragraph, checkParaGraph, parseNovel } from "./utils/parse";
import { DEFAULT_STYLE, PAGES, PARAGRAPHS } from "./utils/constants";
import { AppContext } from "./context";
import toaster from "./common/toast";
import setting from "./setting.js";
import File from './model/file';

// init language
import "./locale/index.js";

import "./css/App.css";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.examples = loadExample();
    const files = this.examples.map((file) => {
      return Object.assign(new File(file), parseNovel(file.detail));
    });
    this.state = {
      files,
      currentFileIndex: 0,
      currentFile: files[0],
      style: DEFAULT_STYLE,
      isShowRightPanel: true,
      isShowLeftPanel: true,
      currentPageIndex: 0,
      api: null,
    };
    this.api = null;
  }

  componentDidMount() {
    if (setting.mode === "online") {
      this.initFromServer();
    } else {
      toaster.success(intl.get("Welcome_to_use_offline_mode"));
    }
    this.initDataFromLocalStore();
    document.addEventListener("keydown", this.onKeydown);
    window.app = this;
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown);
    window.app = null;
  }

  /**
   * get init data(novel-reader-style) from local store
   * future support local novels and folder tree
   */
  initDataFromLocalStore = () => {
    getLocalValue(NOVEL_READER_STYLE_SAVE_KEY).then((localStyleStr) => {
      if (localStyleStr) {
        this.setState({
          style: JSON.parse(localStyleStr) || DEFAULT_STYLE,
        });
      }
    });
  };

  changePageIndex = (currentPageIndex) => {
    this.setState({ currentPageIndex });
  };

  initFromServer = () => {
    const api = new LocalAPI();
    api.init({
      server: setting.server,
      token: cookie.load("novelToken"),
    });
    this.setState({ api }); // for { api } = useContext(AppContext)
    this.api = api; // for window.app.api
  };

  onKeydown = (e) => {
    const { files, currentFileIndex, currentPageIndex } = this.state;
    if (isUp(e)) {
      if (document.activeElement.nodeName.toLowerCase() !== 'body') return;
      e.preventDefault();
      if (currentPageIndex === 0) {
        toaster.warning(intl.get('This is already the first page'));
        return;
      }
      this.changePageIndex(currentPageIndex - 1);
    } else if (isDown(e)) {
      if (document.activeElement.nodeName.toLowerCase() !== 'body') return;
      e.preventDefault();
      const file = files[currentFileIndex];
      const maxIndex = file.detail.length - 1;
      if (currentPageIndex === maxIndex) {
        toaster.warning(intl.get('This is already the last page'));
        return;
      }
      this.changePageIndex(currentPageIndex + 1);
    }
  };

  changeMode = (mode) => {
    const { currentFile } = this.state;
    // If this is array (if it has already been paginated or divided into chapters, it will first become the original string);
    // If it is another type of file, directly process it as an empty string
    let detail = currentFile.detail;
    if (Array.isArray(detail)) {
      detail = detail.join(' ');
    } else if (typeof detail !== 'string') {
      detail = 'Article data structure is not correct, please reupload or redownload this article.';
    }
    // change mode
    if (mode === PAGES) {
      this.setState({
        currentFile: Object.assign({}, currentFile, convertNovel2Pages(detail)),
        isShowRightPanel: true,
      });
    }
    else if (mode === PARAGRAPHS) {
      if (checkParaGraph(detail)) {
        this.setState({
          currentFile: Object.assign({}, currentFile, convertNovel2Paragraph(detail)),
          isShowRightPanel: true,
        });
      } else {
        toaster.warning(intl.get('Paragraph not found, Paragraph mode not supported'));
      }
    }
  };

  addFile = (file) => {
    const files = this.state.files.slice(0);
    files.push(file);
    this.setState({ files });
  };

  changeFileIndex = (currentFileIndex) => {
    this.setState({
      currentFile: this.state.files[currentFileIndex],
      currentFileIndex,
      currentPageIndex: 0,
    });
  };

  deleteFile = (index) => {
    const files = this.state.files.slice(0);
    files.splice(index, 1);
    this.setState({
      files,
      currentFile: files[this.state.currentFileIndex],
    });
    if (index === this.state.currentFileIndex) {
      this.setState({
        currentFileIndex: 0,
        currentPageIndex: 0,
      });
    }
  };

  changeStyle = (newStyle) => {
    const style = Object.assign({}, this.state.style, newStyle);
    if (!isSameObject(style, this.state.style)) {
      this.setState({ style });
      setLocalValue(NOVEL_READER_STYLE_SAVE_KEY, JSON.stringify(style));
    }
  };

  toggleRightPanel = () => {
    this.setState({
      isShowRightPanel: !this.state.isShowRightPanel,
    });
  };

  render() {
    const { files, currentFileIndex, style, currentFile } = this.state;
    const username = cookie.load("username");
    const isAdmin = username === "admin";
    return (
      <AppContext.Provider value={{ api: this.state.api, username, isAdmin }}>
        <div id="app">
          <Navs
            addFile={this.addFile}
            files={files}
            changeFileIndex={this.changeFileIndex}
            deleteFile={this.deleteFile}
            currentFileIndex={currentFileIndex}
            currentFile={currentFile}
            currentPageIndex={this.state.currentPageIndex}
            changePageIndex={this.changePageIndex}
            isShowLeftPanel={this.state.isShowLeftPanel}
          />
          <Main
            currentFile={currentFile}
            style={style}
            toggleRightPanel={this.toggleRightPanel}
            isShowRightPanel={this.state.isShowRightPanel}
            currentPageIndex={this.state.currentPageIndex}
          />
          <Settings
            style={style}
            changeStyle={this.changeStyle}
            isShowRightPanel={this.state.isShowRightPanel}
            changeMode={this.changeMode}
          />
        </div>
      </AppContext.Provider>
    );
  }
}
