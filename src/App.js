import React, { Component } from "react";
import Main from "./main";
import Navs from "./navs";
import Settings from "./settings";
import LocalAPI from "./api/local-api";
import { isSameObject, getLocalValue, setLocalValue, loadExample } from "./utils";
import { DEFAULT_STYLE } from "./settings/constants";

import "./css/App.css";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: loadExample(),
      currentIndex: 0,
      style: JSON.parse(getLocalValue("novel-reader-style")) || DEFAULT_STYLE,
      isShowRightPanel: true,
    };
    this.api = new LocalAPI();
    this.api.init({
      server: "http://127.0.0.1:8081",
      username: "1@1.com",
      password: "1",
    });
    this.isPro = false;
  }

  componentDidMount() {
    this.initFromServer();
  }

  initFromServer = () => {
    this.api.checkNet().then(res => {
      if (res && res.data === "pong") {
        console.log("已经成功连接服务器，可以使用网络");
        this.isPro = true;
        this.api.getUser().then(res => {
          // TODO test query user and check is Pro version
          console.log(res.data);
        }).catch(err => {
          console.error(err);
        });
      }
    }).catch(err => {
      console.error("连接服务器失败，无法从数据库获取资源");
      this.isPro = false;
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

  changeIndex = (currentIndex) => {
    this.setState({ currentIndex });
  }

  deleteFile = (index) => {
    let files = this.state.files.slice(0);
    files.splice(index, 1);
    this.setState({
      files,
      currentIndex: files.length - 1,
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

  render() {
    const { files, currentIndex, style } = this.state;
    const currentFile = files[currentIndex];
    return (
      <div id="app">
        <Navs
          addFile={this.addFile}
          files={files}
          changeIndex={this.changeIndex}
          deleteFile={this.deleteFile}
          currentIndex={currentIndex}
        />
        <Main
          currentFile={currentFile}
          style={style}
          toggleRightPanel={this.toggleRightPanel}
          isShowRightPanel={this.state.isShowRightPanel}
        />
        <Settings
          style={style}
          changeStyle={this.changeStyle}
          isShowRightPanel={this.state.isShowRightPanel}
        />
      </div>
    );
  }
}
