import React, { Component } from "react";
import Main from "./main";
import Navs from "./navs";
import Settings from "./settings";
import LocalAPI from "./api/local-api";
import { isSameObject, getLocalValue, setLocalValue, loadExample } from "./utils";
import { isUp, isDown } from './utils/hotkey';
import { convertNovel2Pages, convertNovel2Paragraph, checkParaGraph, parseNovel } from './utils/parse';
import { DEFAULT_STYLE } from "./settings/constants";
import LoginDialog from "./common/login-dialog";
import toaster from './common/toast';
import setting from "./setting.json";

import "./css/App.css";

export default class App extends Component {

  constructor(props) {
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
      style: JSON.parse(getLocalValue("novel-reader-style")) || DEFAULT_STYLE,
      isShowRightPanel: true,
      isShowLeftPanel: true,
      currentPageIndex: 0,
      isShowLogin: false,
    };
    this.isConnect = false;
  }

  componentDidMount() {
    if (setting.mode === 'online') {
      this.toggleLoginDialog();
    } else {
      toaster.success("欢迎使用离线模式");
    }
    document.addEventListener('keydown', this.onKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeydown);
  }

  changePageIndex = (currentPageIndex) => {
    this.setState({ currentPageIndex });
  }

  initFromServer = (token) => {
    this.api = new LocalAPI();
    this.api.init({server: setting.server, token});
    // // 测试 token 是否正常使用
    // setTimeout(() => {
    //   this.api.getUsers().then(res => {
    //   }).catch(err => {
    //   });
    // }, 1000);
  }

  onKeydown = (e) => {
    const { files, currentFileIndex, currentPageIndex } = this.state;
    if (isUp(e)) {
      e.preventDefault();
      if (currentPageIndex === 0) {
        toaster.warning('已经是第一页了');
        return;
      }
      this.changePageIndex(currentPageIndex - 1);
    }
    else if (isDown(e)) {
      e.preventDefault();
      const file = files[currentFileIndex];
      const maxIndex = file.context.length - 1;
      if (currentPageIndex === maxIndex) {
        toaster.warning('已经是最后一页了');
        return;
      }
      this.changePageIndex(currentPageIndex + 1);
    }
  }

  changeMode = (mode) => {
    let { currentFileIndex, files } = this.state;
    let currentNovel = this.examples[this.state.currentFileIndex];
    if (mode === 'pages') {
      files[currentFileIndex] = Object.assign({name: currentNovel.name}, convertNovel2Pages(currentNovel.context));
      this.setState({
        files,
        isShowLeftPanel: true,
        isShowRightPanel: true,
      });
    }
    else if (mode === 'paragraphs') {
      if (checkParaGraph(currentNovel.context)) {
        files[currentFileIndex] = Object.assign({name: currentNovel.name}, convertNovel2Paragraph(currentNovel.context));
        this.setState({
          files,
          isShowLeftPanel: true,
          isShowRightPanel: true,
        });
      } else {
        toaster.warning('当前小说没有找到章节，不支持章节模式');
      }
    }
    else if (mode === 'fullscreen') {
      this.setState({
        isShowLeftPanel: false,
        isShowRightPanel: false,
      });
      // 这里看一下是否改动 files 对象
    }
  }

  // {
  //   name,
  //   size,
  //   author,
  //   context,
  //   abstract,
  //   tag,
  // }
  // 当前直接存文本，不需要处理段落或者标题等
  // 未来可以把 context 转换成特定的段落处理
  addFile = (file) => {
    let files = this.state.files.slice(0);
    files.push(file);
    this.setState({
      files,
      currentFileIndex: files.length - 1,
    });
    // TODO save into database
  }

  changeFileIndex = (currentFileIndex) => {
    this.setState({
      currentFileIndex,
      currentPageIndex: 0,
    });
  }

  deleteFile = (index) => {
    let files = this.state.files.slice(0);
    files.splice(index, 1);
    this.setState({
      files,
      currentFileIndex: files.length - 1,
      currentPageIndex: 0,
    });
  }

  changeStyle = (newStyle) => {
    let style = Object.assign({}, this.state.style, newStyle);
    if (!isSameObject(style, this.state.style)) {
      this.setState({ style });
      setLocalValue("novel-reader-style", JSON.stringify(style));
    }
  }

  toggleRightPanel = () => {
    this.setState({
      isShowRightPanel: !this.state.isShowRightPanel,
    });
  }

  toggleLoginDialog = () => {
    this.setState({
      isShowLogin: !this.state.isShowLogin,
    });
  }

  render() {
    const { files, currentFileIndex, style } = this.state;
    const currentFile = files[currentFileIndex];
    return (
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
        {this.state.isShowLogin &&
          <LoginDialog toggle={this.toggleLoginDialog} initFromServer={this.initFromServer} />
        }
      </div>
    );
  }
}
