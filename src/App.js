import React, { Component } from 'react'
import Main from './main';
import Navs from './navs';
import Settings from './settings';
import LocalAPI from './api/local-api';
import { isSameObject } from './utils';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/common.css'
import './css/App.css'

export default class App extends Component {

  constructor(props) {
    super(props);
    const defaultStyle = {
      fontSize: '16px',
      color: '#212529',
      backgroundColor: 'rgb(251, 246, 236)',
    };
    this.state = {
      files: [],
      currentIndex: -1,
      style: defaultStyle,
    };
    this.api = new LocalAPI();
    this.api.init({
      server: 'http://127.0.0.1:8081',
      username: '1@1.com',
      password: '1',
    });
    this.canUseNet = false;
  }

  componentDidMount() {
    this.api.checkNet().then(res => {
      if (res && res.data === 'pong') {
        console.log('已经成功链接服务器，可以使用网络');
        this.canUseNet = true;
        this.initFromServer();
      }
    }).catch(err => {
      console.error('连接网络失败，无法从数据库获取资源');
      this.canUseNet = false;
    });
  }

  initFromServer = () => {
    // 从服务端获取当前存储的样式和配置等，或者把这部分存储在 localStorage 中，这个是本地配置，不需要存放在服务端
  }

  // { name, size, context }
  // 当前直接存文本，不需要处理段落或者标题等
  // 未来可以把 context 转换成特定的段落处理
  addFile = (file) => {
    let files = this.state.files.slice(0);
    files.push(file);
    this.setState({
      files,
      currentIndex: files.length - 1,
    });
  }

  changeIndex = (currentIndex) => {
    this.setState({ currentIndex });
  }

  deleteFile = (index) => {
    console.log(index);
  }

  changeStyle = (newStyle) => {
    let style = Object.assign({}, this.state.style, newStyle);
    if (!isSameObject(style, this.state.style)) {
      this.setState({ style });
    }
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
        />
        <Settings
          style={style}
          changeStyle={this.changeStyle}
        />
      </div>
    )
  }
}
