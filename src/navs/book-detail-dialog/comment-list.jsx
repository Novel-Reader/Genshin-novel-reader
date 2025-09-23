import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import intl from "react-intl-universal";
import toaster from "../../common/toast";

import "./comment-list.less";

function CommentItem(props) {
  const { comment } = props;
  const author = Cookies.get("username");
  const [edit, setEdit] = useState(false);
  const commentElement = useRef();

  function onFinish() {
    const detail = commentElement.current.value;
    if (detail.length < 3) {
      toaster.warning(intl.get('Comment should have at least 3 characters in length'));
      return;
    }
    if (detail.length > 1000) {
      toaster.warning(intl.get('The comment word count cannot exceed 1000 characters'));
      return;
    }
    window.app.api
      .editComment(comment.id, detail)
      .then((res) => {
        toaster.success(intl.get('Successfully saved'));
        setEdit(false);
        props.loadComments();
      })
      .catch((err) => {
        toaster.danger(intl.get('Error, please try again'));
        toaster.danger(String(err));
      });
    return;
  }

  function onDelete() {
    window.app.api
      .deleteComment(comment.id)
      .then((res) => {
        toaster.danger(intl.get('The comment has been deleted'));
        props.loadComments();
      })
      .catch((err) => {
        toaster.danger(intl.get('Error, please try again'));
        toaster.danger(String(err));
      });
  }

  return (
    <div className="comment-item" key={comment.id}>
      <p><b>{comment.author}</b> {intl.get('Say')}:</p>
      {edit ? (
        <textarea ref={commentElement} defaultValue={comment.detail}></textarea>
      ) : (
        <p>{comment.detail}</p>
      )}
      <div className="comment-btns">
        <span className="comment-btns-time">{dayjs(comment.created_at).format("YYYY-MM-DD HH:mm:ss")}</span>
        {author === comment.author && (
          <>
            {edit ? (
              <span onClick={() => { onFinish(); }}>{intl.get('Save')}</span>
            ) : (
              <span onClick={() => { setEdit(true); }}>{intl.get('Edit')}</span>
            )}
          </>
        )}
        {author === comment.author && (
          <span onClick={() => { onDelete(); }}>{intl.get('Delete')}</span>
        )}
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  novel: PropTypes.object.isRequired,
  loadComments: PropTypes.func.isRequired,
};

function CommentList({ comments, loadComments, onRef, novel }) {
  return (
    <div className="comment-list" ref={(node) => onRef(node)}>
      {comments.length === 0 && <span>还没有评论哦，请点击下方添加评论</span>}
      {comments.length > 0 &&
        comments.map((comment) => {
          return (
            <CommentItem
              comment={comment}
              novel={novel}
              key={comment.id}
              loadComments={loadComments}
            />
          );
        })}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  novel: PropTypes.object.isRequired,
  onRef: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired,
};

export default CommentList;
