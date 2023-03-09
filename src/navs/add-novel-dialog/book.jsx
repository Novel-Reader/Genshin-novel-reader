import React from 'react';
import { Button } from 'reactstrap';

export default function Book(props) {
  const { novel } = props;
  const { id, author, brief, cover_photo, name, price } = novel;
  return (
    <div className="book">
      <div className="book-left">
        <img src={cover_photo} alt="cover"/>
      </div>
      <div className="book-right">
        <div className="book-right-name">{name.slice(0, name.indexOf('.'))}</div>
        <div className="book-right-author">{author}</div>
        <p className="book-right-detail">{brief.replace(/\s+/ig, '').slice(0, 50)}</p>
        <div className="book-right-price">
          <span>{price}$</span>
          <Button color="primary" onClick={() => {props.onClick(id);}} size="sm">下载</Button>
        </div>
      </div>
    </div>
  );
}
