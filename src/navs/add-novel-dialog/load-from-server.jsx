import React, { useState, useEffect, useContext, useCallback } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Button } from "antd";
import VipButton from "../../common/vip-button";
import toaster from "../../common/toast";
import BookList from "./book-list";
import SearchFromServer from "./search-from-server";
import File from '../../model/file';
import { AppContext } from "../../context";

const LoadFromServer = (props) => {
  const { addFile, checkFileExist, mode } = props;
  const { api, user } = useContext(AppContext);
  const isOnline = mode === "online";
  
  const [novelList, setNovelList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const loadNovelsFromServer = useCallback(() => {
    if (!api) return;
    api.getNovelList()
      .then((res) => {
        setNovelList(res.data);
      })
      .catch((err) => {
        toaster.danger(err);
      });
  }, [api]);

  useEffect(() => {
    if (isOnline) {
      loadNovelsFromServer();
    }
  }, [isOnline, loadNovelsFromServer]);

  const downLoadNovel = (book_id) => {
    if (!api || !user) return;
    if (checkFileExist(book_id)) {
      toaster.danger('已经下载到本地，不需要再次下载');
      return;
    }
    api.getNovelDetail(book_id).then((res) => {
      addFile(new File(res.data[0]));
      api.updateUserBook(user.id, book_id).then(() => {
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
