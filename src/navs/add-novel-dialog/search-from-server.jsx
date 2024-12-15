import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import toaster from "../../common/toast";
import intl from "react-intl-universal";
import { Button, Input } from "antd";
import BookList from "./book-list";

const SearchFromServer = ({ downLoadNovel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [novelList, setNovelList] = useState([]);
  const searchInputRef = useRef();

  const searchNovels = () => {
    const keyword = searchInputRef.current.value.trim();
    if (!keyword) {
      toaster.danger(intl.get('Missing some required fields'));
      return;
    }
    setIsLoading(true);
    window.app.api.searchNovel(keyword).then((res) => {
      setIsLoading(false);
      setNovelList(res.data);
    }).catch((err) => {
      toaster.danger(err);
      setIsLoading(false);
    });
  };

  return (
    <div className="novel-list">
      <div>
        <Input ref={searchInputRef} autoFocus placeholder={intl.get('Search by book name or author')} />
        <Button type="primary" onClick={searchNovels}>{intl.get('Search')}</Button>
      </div>
      {isLoading ?
        <div>{intl.get('Searching...')}</div>
        :
        <BookList
          novelList={novelList}
          downLoadNovel={downLoadNovel}
        />
      }
    </div>
  );
};

SearchFromServer.propTypes = {
  downLoadNovel: PropTypes.func.isRequired,
};

export default SearchFromServer;
