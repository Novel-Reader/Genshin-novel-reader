import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

function Book (props) {
  const { novel } = props;
  const { id, author, brief, cover_photo: coverPhoto, name, price } = novel;
  return (
    <div className="book">
      <div className="book-left">
        <img src={coverPhoto} alt="cover"/>
      </div>
      <div className="book-right">
        <div className="book-right-name">{name.slice(0, name.indexOf('.'))}</div>
        <div className="book-right-author">{author}</div>
        <p className="book-right-detail">{brief.replace(/\s+/ig, '').slice(0, 50)}</p>
        <div className="book-right-price">
          <span>{price}$</span>
          <Button color="primary" onClick={() => { props.onClick(id); }} size="sm">下载</Button>
        </div>
      </div>
    </div>
  );
}

Book.propTypes = {
  novel: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Book;
