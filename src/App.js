import React, { Component } from "react";
import Main from "./main";
import Navs from "./navs";
import Settings from "./settings";
import LocalAPI from "./api/local-api";
import { isSameObject, getLocalValue, setLocalValue, loadExample } from "./utils";
import { convertNovel2Pages } from './utils/parse';
import { DEFAULT_STYLE } from "./settings/constants";
import LoginDialog from "./common/login-dialog";

import "./css/App.css";

export default class App extends Component {

  constructor(props) {
    super(props);
    // 暂时全部按照无段落处理
    // 未来可以改变设置，改变设置后，重新计算全部的段落。计算后可以放在缓存中，避免多次计算
    const files = loadExample().map(file => {
      return Object.assign({}, file, {
        context: convertNovel2Pages(file.context, false).context,
        type: 'pages',
      });
    });
    this.state = {
      files,
      // currentIndex 改成 currentFileIndex 因为未来可能很多 index，或者每一个 state 加个注释
      currentIndex: 0,
      style: JSON.parse(getLocalValue("novel-reader-style")) || DEFAULT_STYLE,
      isShowRightPanel: true,
      currentPageIndex: 0,
      isShowLogin: false,
    };
    this.api = new LocalAPI();
    this.api.init({
      server: "http://127.0.0.1:8081",
      username: "1@1.com",
      password: "1",
    });
    this.isConnect = false;
  }

  componentDidMount() {
    this.initFromServer();
  }

  changePageIndex = (currentPageIndex) => {
    this.setState({ currentPageIndex });
  }

  initFromServer = () => {
    this.api.checkNet().then(res => {
      if (res && res.data === "pong") {
        console.log("已经成功连接服务器，可以使用网络");
        this.isConnect = true;
        this.toggleLoginDialog();
      }
    }).catch(err => {
      console.error("连接服务器失败，开启离线模式");
      this.isConnect = false;
    });
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
      currentIndex: files.length - 1,
    });
    // TODO save into database
  }

  changeFileIndex = (currentIndex) => {
    this.setState({
      currentIndex,
      currentPageIndex: 0,
    });
  }

  deleteFile = (index) => {
    let files = this.state.files.slice(0);
    files.splice(index, 1);
    this.setState({
      files,
      currentIndex: files.length - 1,
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
    const { files, currentIndex, style } = this.state;
    const currentFile = files[currentIndex];
    return (
      <div id="app">
        <Navs
          addFile={this.addFile}
          files={files}
          changeFileIndex={this.changeFileIndex}
          deleteFile={this.deleteFile}
          currentIndex={currentIndex}
          currentFile={currentFile}
          currentPageIndex={this.state.currentPageIndex}
          changePageIndex={this.changePageIndex}
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
        />
        {this.state.isShowLogin &&
          <LoginDialog toggle={this.toggleLoginDialog} api={this.api} />
        }
      </div>
    );
  }
}
