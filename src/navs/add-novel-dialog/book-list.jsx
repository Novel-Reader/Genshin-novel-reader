import React from "react";
import PropTypes from "prop-types";
import Book from "./book";

import "./book-list.css";

function BookList(props) {
  if (!Array.isArray(props.novelList) || props.novelList.length === 0) {
    return (
      <div className="book-list">没有找到对应的小说，请换个关键词试试</div>
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
