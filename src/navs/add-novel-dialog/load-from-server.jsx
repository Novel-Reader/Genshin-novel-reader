import React, { Component } from "react";
import PropTypes from 'prop-types';
import VipButton from "../../common/vip-button";
import setting from "../../setting.json";
import toaster from '../../common/toast';
import { Button } from "reactstrap";
import BookList from './book-list';
import SearchFromServer from './search-from-server';

class LoadFromServer extends Component {
  constructor (props) {
    super(props);
    this.isOnline = setting.mode === 'online';
    this.state = {
      isLoading: true,
      novelList: [],
      isSearch: false
    };
  }

  componentDidMount () {
    if (this.isOnline) {
      this.loadNovelsFromServer();
    }
  }

  loadNovelsFromServer = () => {
    window.app.api.getNovelList().then((res) => {
      this.setState({
        isLoading: false,
        novelList: res.data
      });
    }).catch(err => {
      toaster.danger(err);
      this.setState({
        isLoading: false
      });
    });
  };

  downLoadNovel = (id) => {
    window.app.api.getNovelDetail(id).then((res) => {
      const file = res.data[0];
      const { author, brief, cover_photo, detail, name, price } = file;
      const fileObj = {
        name,
        author,
        cover_photo,
        context: detail,
        abstract: brief,
        price
      };
      this.props.addFile(fileObj);
    }).catch(err => {
      toaster.danger(err);
    });
  };

  changeSearch = () => {
    this.setState({ isSearch: true });
  };

  render () {
    if (!this.isOnline) {
      return (
        <div>
          这是联网专属功能
          <VipButton />
        </div>
      );
    }
    if (this.state.isSearch) {
      return (
        <SearchFromServer downLoadNovel={this.downLoadNovel} />
      );
    }
    return (
      <div className="novel-list">
        <div>
          <h3>热点小说</h3>
          <Button onClick={this.changeSearch}>在线搜索</Button>
        </div>
        <BookList novelList={this.state.novelList} downLoadNovel={this.downLoadNovel} />
      </div>
    );
  }
}

LoadFromServer.propTypes = {
  addFile: PropTypes.func.isRequired
};

export default LoadFromServer;
