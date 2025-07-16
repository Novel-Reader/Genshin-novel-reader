import React, { Component } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Button } from "antd";
import VipButton from "../../common/vip-button";
import toaster from "../../common/toast";
import BookList from "./book-list";
import SearchFromServer from "./search-from-server";
import File from '../../model/file';

class LoadFromServer extends Component {
  constructor(props) {
    super(props);
    this.isOnline = this.props.mode === "online";
    this.state = {
      isLoading: true,
      novelList: [],
      isSearch: false,
    };
  }

  componentDidMount() {
    if (this.isOnline) {
      this.loadNovelsFromServer();
    }
  }

  loadNovelsFromServer = () => {
    window.app.api
      .getNovelList()
      .then((res) => {
        this.setState({
          isLoading: false,
          novelList: res.data,
        });
      })
      .catch((err) => {
        toaster.danger(err);
        this.setState({
          isLoading: false,
        });
      });
  };

  downLoadNovel = (book_id) => {
    if (this.props.checkFileExist(book_id)) {
      toaster.danger('已经下载到本地，不需要再次下载');
      return;
    }
    window.app.api.getNovelDetail(book_id).then((res) => {
      this.props.addFile(new File(res.data[0]));
      const userId = window.app.state.user.id;
      window.app.api.updateUserBook(userId, book_id).then((res) => {
      });
    }).catch((err) => {
      toaster.danger(err);
    });
  };

  changeSearch = () => {
    this.setState({ isSearch: true });
  };

  render() {
    if (!this.isOnline) {
      return (
        <div>
          {intl.get('This is an exclusive feature for networking')}
          <VipButton />
        </div>
      );
    }
    if (this.state.isSearch) {
      return <SearchFromServer downLoadNovel={this.downLoadNovel} />;
    }
    return (
      <div className="novel-list">
        <div>
          <h3>{intl.get('Hot')}</h3>
          <Button type="primary" onClick={this.changeSearch}>{intl.get('Online search')}</Button>
        </div>
        <BookList
          novelList={this.state.novelList}
          downLoadNovel={this.downLoadNovel}
        />
      </div>
    );
  }
}

LoadFromServer.propTypes = {
  addFile: PropTypes.func.isRequired,
  checkFileExist: PropTypes.func.isRequired,
};

export default LoadFromServer;
