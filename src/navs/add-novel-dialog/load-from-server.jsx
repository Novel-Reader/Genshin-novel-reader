import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Button } from "antd";
import VipButton from "../../common/vip-button";
import toaster from "../../common/toast";
import BookList from "./book-list";
import SearchFromServer from "./search-from-server";
import File from '../../model/file';

const LoadFromServer = (props) => {
  const { addFile, checkFileExist, mode } = props;
  const isOnline = mode === "online";
  
  const [isLoading, setIsLoading] = useState(true);
  const [novelList, setNovelList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (isOnline) {
      loadNovelsFromServer();
    }
  }, [isOnline]);

  const loadNovelsFromServer = () => {
    window.app.api
      .getNovelList()
      .then((res) => {
        setIsLoading(false);
        setNovelList(res.data);
      })
      .catch((err) => {
        toaster.danger(err);
        setIsLoading(false);
      });
  };

  const downLoadNovel = (book_id) => {
    if (checkFileExist(book_id)) {
      toaster.danger('已经下载到本地，不需要再次下载');
      return;
    }
    window.app.api.getNovelDetail(book_id).then((res) => {
      addFile(new File(res.data[0]));
      const userId = window.app.state.user.id;
      window.app.api.updateUserBook(userId, book_id).then((res) => {
      });
    }).catch((err) => {
      toaster.danger(err);
    });
  };

  const changeSearch = () => {
    setIsSearch(true);
  };

  if (!isOnline) {
    return (
      <div>
        {intl.get('This is an exclusive feature for networking')}
        <VipButton />
      </div>
    );
  }
  if (isSearch) {
    return <SearchFromServer downLoadNovel={downLoadNovel} />;
  }
  return (
    <div className="novel-list">
      <div>
        <h3>{intl.get('Hot')}</h3>
        <Button type="primary" onClick={changeSearch}>{intl.get('Online search')}</Button>
      </div>
      <BookList
        novelList={novelList}
        downLoadNovel={downLoadNovel}
      />
    </div>
  );
};

LoadFromServer.propTypes = {
  addFile: PropTypes.func.isRequired,
  checkFileExist: PropTypes.func.isRequired,
  mode: PropTypes.string,
};

export default LoadFromServer;
