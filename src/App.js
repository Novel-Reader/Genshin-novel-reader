import React, { Component } from "react";
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

import "./css/App.css";

class App extends Component {

  constructor(props) {
    super(props);
    window.isMobile = isMobile();
    this.state = {
      files: [],
      currentFileIndex: 0,
      currentFile: null,
      style: DEFAULT_STYLE,
      isShowRightPanel: window.isMobile ? false : true,
      isShowLeftPanel: window.isMobile ? false : true,
      currentPageIndex: 0,
      api: null,
      user: null,
      isShowLoginDialog: false,
    };
    this.api = null;
  }

  componentDidMount() {
    if (this.props.mode === "online") {
      if (!Cookies.get("username")) {
        this.setState({ isShowLoginDialog: true }); 
      } else {
        this.initFromServer();
      }
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
  
  closeLoginDialog = () => {
    this.setState({ isShowLoginDialog: false });
    this.initFromServer();
  };

  initFromServer = () => {
    const username = Cookies.get("username");
    if (!username) {
      toaster.warning(intl.get('Please login first'));
      setTimeout(() => {
        this.setState({ isShowLoginDialog: true });
      }, 100);
      return;
    }
    const api = new LocalAPI();
    api.init({
      server: this.props.server,
      token: Cookies.get("novelToken"),
    });
    this.setState({ api });
    this.api = api;
    this.api.getUserInfo(username).then(res => {
      const user = res.data[0];
      if (!user) {
        toaster.warning(intl.get('Please login first'));
        return;
      }
      this.api.setUserInfo({ user_id: user.id, username: username });
      this.api.getUserBookList(user.id).then(res => {
        let files = res.data;
        if (files.length === 0) {
          const examples = loadExample();
          files = examples.map((file) => {
            return Object.assign(new File(file), parseNovel(file.detail));
          });
        } else {
          files = files.map(file => new File(file));
        }
        this.setState({
          user,
          files,
          currentFileIndex: 0,
          currentFile: files[0],
        });
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
        toaster.warning(intl.get('Please login first'));
        setTimeout(() => {
          this.setState({ isShowLoginDialog: true });
        }, 100);
      });
    });
  };

  onKeydown = (e) => {
    const { files, currentFileIndex, currentPageIndex } = this.state;
    if (isUp(e)) {
      if (document.activeElement.nodeName.toLowerCase() !== 'body') return;
      e.preventDefault();
      if (currentPageIndex === 0) {
        toaster.closeAll();
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
        toaster.closeAll();
        toaster.warning(intl.get('This is already the last page'));
        return;
      }
      this.changePageIndex(currentPageIndex + 1);
    }
  };

  changeMode = (mode) => {
    const { currentFile } = this.state;
    let detail = currentFile.detail;
    if (Array.isArray(detail)) {
      detail = detail.join(' ');
    } else if (typeof detail !== 'string') {
      detail = 'Article data structure is not correct, please reupload or re-download this article.';
    }
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
    this.showNovel();
  };
  
  showNovel = () => {
    if (window.isMobile) {
      this.setState({
        isShowRightPanel: false,
        isShowLeftPanel: false,
      });
    }
  }

  deleteFile = (index) => {
    const files = this.state.files.slice(0);
    const book_id = files[index].id;
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
    this.api && this.api.deleteUserBook(this.state.user.id, book_id);
  };

  changeStyle = (newStyle) => {
    const style = Object.assign({}, this.state.style, newStyle);
    if (!isSameObject(style, this.state.style)) {
      this.setState({ style });
      setLocalValue(NOVEL_READER_STYLE_SAVE_KEY, JSON.stringify(style));
    }
    this.showNovel();
  };

  toggleRightPanel = () => {
    this.setState({
      isShowRightPanel: !this.state.isShowRightPanel,
    });
  };
  
  toggleLeftPanel = () => {
    this.setState({
      isShowLeftPanel: !this.state.isShowLeftPanel,
    });
  };

  render() {
    const { files, currentFileIndex, style } = this.state;
    const { mode = 'offline', server = '' } = this.props;
    const username = Cookies.get("username");
    const isAdmin = username === "admin";
    const currentFile = files[currentFileIndex];
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
            mode={mode}
            server={server}
          />
          <MainPanel
            currentFile={currentFile}
            files={files}
            style={style}
            toggleRightPanel={this.toggleRightPanel}
            isShowRightPanel={this.state.isShowRightPanel}
            currentPageIndex={this.state.currentPageIndex}
            toggleLeftPanel={this.toggleLeftPanel}
          />
          <Settings
            style={style}
            changeStyle={this.changeStyle}
            isShowRightPanel={this.state.isShowRightPanel}
            changeMode={this.changeMode}
          />
        </div>
        {this.state.isShowLoginDialog && (
          <LoginDialog toggle={this.closeLoginDialog} server={this.props.server}/>
        )}
      </AppContext.Provider>
    );
  }
}

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
