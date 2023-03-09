import React from 'react';
import Book from './book';
import './book-list.css';

export default function BookList(props) {
  return (
    <div className="book-list">
      {props.novelList.map(item => <Book novel={item} onClick={props.onClickNovel}/>)}
    </div>
  );
}
