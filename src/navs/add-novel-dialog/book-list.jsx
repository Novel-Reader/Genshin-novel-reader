import React from 'react';
import Book from './book';
import './book-list.css';

export default function BookList(props) {
  if (!Array.isArray(props.novelList) || props.novelList.length == 0) {
    return (
      <div className="book-list">没有找到对应的小说，请换个关键词试试</div>
    );
  }
  return (
    <div className="book-list">
      {props.novelList.map((item, index) => <Book key={index} novel={item} onClick={props.onClickNovel}/>)}
    </div>
  );
}
