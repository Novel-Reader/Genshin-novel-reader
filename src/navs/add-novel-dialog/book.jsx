import React, { useState } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { Button } from "reactstrap";
import BookDetailDialog from "../book-detail-dialog";

function Book(props) {
  const [showDetail, setShowDetail] = useState(false);
  const { novel } = props;
  const { id, author, brief, cover_photo: coverPhoto, name, price } = novel;
  return (
    <div className="book">
      <div className="book-left">
        <img src={coverPhoto} alt="cover" />
      </div>
      <div className="book-right">
        <div className="book-right-name">
          {name.slice(0, name.indexOf("."))}
        </div>
        <div className="book-right-author">{author}</div>
        <p className="book-right-detail">
          {brief.replace(/\s+/gi, "").slice(0, 40)}
        </p>
        <div className="book-right-price">
          <span>{price}$</span>
          <Button color="primary" onClick={() => setShowDetail(true)} size="sm">
            {intl('Comment')}
          </Button>
          <Button
            color="primary"
            onClick={() => {
              props.downLoadNovel(id);
            }}
            size="sm"
          >
            {intl('Download')}
          </Button>
        </div>
      </div>
      {showDetail &&
        <BookDetailDialog
          downLoadNovel={props.downLoadNovel}
          novel={novel}
          toggleDialog={() => setShowDetail(false)}
        />
      }
    </div>
  );
}

Book.propTypes = {
  novel: PropTypes.object.isRequired,
  downLoadNovel: PropTypes.func.isRequired,
};

export default Book;
