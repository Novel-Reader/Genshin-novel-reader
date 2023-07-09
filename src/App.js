import React, { Component } from "react";
import cookie from 'react-cookies';
import Main from "./main";
import Navs from "./navs";
import Settings from "./settings";
import LocalAPI from "./api/local-api";
import { isSameObject, loadExample } from "./utils";
import { getLocalValue, setLocalValue, NOVEL_READER_STYLE_SAVE_KEY } from './utils/store';
import { isUp, isDown } from './utils/hotkey';
import { convertNovel2Pages, convertNovel2Paragraph, checkParaGraph, parseNovel } from './utils/parse';
import { DEFAULT_STYLE, PAGES, PARAGRAPHS, FULLSCREEN } from "./utils/constants";
import { AppContext } from './context';
import toaster from './common/toast';
import setting from "./setting.json";

import "./css/App.css";

export default class App extends Component {
  constructor (props) {
    super(props);
    this.examples = loadExample();
    const files = this.examples.map(file => {
      return Object.assign(
        { name: file.name },
        parseNovel(file.context)
      );
    });
    this.state = {
      files,
      currentFileIndex: 0,
      style: DEFAULT_STYLE,
      isShowRightPanel: true,
      isShowLeftPanel: true,
      currentPageIndex: 0
    };
    this.api = null;
  }

  componentDidMount () {
    if (setting.mode === 'online') {
      this.initFromServer();
    } else {
      toaster.success("欢迎使用离线模式");
    }
    this.initDataFromLocalStore();
    document.addEventListener('keydown', this.onKeydown);
    window.app = this;
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onKeydown);
    window.app = null;
  }

  /**
   * get init data(novel-reader-style) from local store
   * future support local novels and folder tree
   */
  initDataFromLocalStore = () => {
    getLocalValue(NOVEL_READER_STYLE_SAVE_KEY).then(localStyleStr => {
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
    this.api = new LocalAPI();
    this.api.init({
      server: setting.server,
      token: cookie.load('novelToken')
    });
  };

  onKeydown = (e) => {
    const { files, currentFileIndex, currentPageIndex } = this.state;
    if (isUp(e)) {
      e.preventDefault();
      if (currentPageIndex === 0) {
        toaster.warning('已经是第一页了');
        return;
      }
      this.changePageIndex(currentPageIndex - 1);
    } else if (isDown(e)) {
      e.preventDefault();
      const file = files[currentFileIndex];
      const maxIndex = file.context.length - 1;
      if (currentPageIndex === maxIndex) {
        toaster.warning('已经是最后一页了');
        return;
      }
      this.changePageIndex(currentPageIndex + 1);
    }
  };

  changeMode = (mode) => {
    const { currentFileIndex, files } = this.state;
    const currentNovel = this.examples[this.state.currentFileIndex];
    if (mode === PAGES) {
      files[currentFileIndex] = Object.assign({ name: currentNovel.name }, convertNovel2Pages(currentNovel.context));
      this.setState({
        files,
        isShowLeftPanel: true,
        isShowRightPanel: true
      });
    } else if (mode === PARAGRAPHS) {
      if (checkParaGraph(currentNovel.context)) {
        files[currentFileIndex] = Object.assign({ name: currentNovel.name }, convertNovel2Paragraph(currentNovel.context));
        this.setState({
          files,
          isShowLeftPanel: true,
          isShowRightPanel: true
        });
      } else {
        toaster.warning('当前小说没有找到章节，不支持章节模式');
      }
    } else if (mode === FULLSCREEN) {
      this.setState({
        isShowLeftPanel: false,
        isShowRightPanel: false
      });
      // TODO change files data structure
    }
  };

  addFile = (file) => {
    // todo change new file data structure
    const files = this.state.files.slice(0);
    files.push(file);
    this.setState({
      files,
      currentFileIndex: files.length - 1
    });
  };

  changeFileIndex = (currentFileIndex) => {
    this.setState({
      currentFileIndex,
      currentPageIndex: 0
    });
  };

  deleteFile = (index) => {
    const files = this.state.files.slice(0);
    files.splice(index, 1);
    this.setState({
      files,
      currentFileIndex: files.length - 1,
      currentPageIndex: 0
    });
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
      isShowRightPanel: !this.state.isShowRightPanel
    });
  };

  render () {
    const { files, currentFileIndex, style } = this.state;
    const currentFile = files[currentFileIndex];
    return (
      <AppContext.Provider value={{ api: this.api }}>
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
