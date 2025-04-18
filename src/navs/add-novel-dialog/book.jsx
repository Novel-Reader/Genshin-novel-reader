import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsDownload } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import BookDetailDialog from "../book-detail-dialog";

function Book(props) {
  const [showDetail, setShowDetail] = useState(false);
  const { novel } = props;
  const { id, author, brief, cover_photo, name, size, download_count } = novel;
  return (
    <div className="book">
      <div className="book-left">
        <img src={cover_photo} alt="cover" />
      </div>
      <div className="book-right">
        <div className="book-right-name">
          {name.lastIndexOf(".") > 0 ? name.slice(0, name.lastIndexOf(".")) : name}
        </div>
        <div className="book-right-author">{author}</div>
        <p className="book-right-detail">
          {brief.replace(/\s+/gi, "").slice(0, 80)}
        </p>
        <div className="book-right-price">
          <span>字数{size}</span>
          <span>下载{download_count}</span>
          <span className="icon" onClick={() => setShowDetail(true)}>
            <FaRegCommentDots />
          </span>
          <span className="icon" onClick={() => { props.downLoadNovel(id); }}>
            <BsDownload />
          </span>
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
