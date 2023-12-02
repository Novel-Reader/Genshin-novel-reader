import React from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import Book from "./book";

import "./book-list.css";

function BookList(props) {
  if (!Array.isArray(props.novelList) || props.novelList.length === 0) {
    return (
      <div className="book-list">{intl.get('No corresponding novel found, please try using a different keyword')}</div>
    );
  }
  return (
    <div className="book-list">
      {props.novelList.map((item, index) => (
        <Book key={index} novel={item} downLoadNovel={props.downLoadNovel} />
      ))}
    </div>
  );
}

BookList.propTypes = {
  novelList: PropTypes.array.isRequired,
  downLoadNovel: PropTypes.func.isRequired,
};

export default BookList;
