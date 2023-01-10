import React, { Component } from 'react'
import Main from './main';
import Navs from './navs';
import Settings from './settings';

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/common.css'
import './css/App.css'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: [],
      currentIndex: -1,
      style: {},
    };
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
        <Main currentFile={currentFile} style={style} />
        <Settings style={style}/>
      </div>
    )
  }
}
