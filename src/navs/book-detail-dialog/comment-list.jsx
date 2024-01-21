import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import cookie from "react-cookies";
import moment from "moment";
import intl from "react-intl-universal";
import toaster from "../../common/toast";

import "./comment-list.css";

function CommentItem(props) {
  const { comment } = props;
  const author = cookie.load("username");
  const [edit, setEdit] = useState(false);
  const commentElement = useRef();

  function onFinish() {
    const detail = commentElement.current.value;
    if (detail.length < 8) {
      toaster.warning(intl.get('Comment should have at least 8 characters in length'));
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
        // 应该执行一个回调函数，然后显示当前的评论
        // 这个直接更改父组件中的某个评论记录即可
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
        // 应该执行一个回调函数，然后显示当前的评论
        // 这个直接更改父组件中的某个评论记录即可
      })
      .catch((err) => {
        toaster.danger(intl.get('Error, please try again'));
        toaster.danger(String(err));
      });
  }

  return (
    <div className="comment-item" key={comment.id}>
      <p>
        <b>{comment.author}</b> {intl.get('Say')}:
      </p>
      {edit ? (
        <textarea ref={commentElement} defaultValue={comment.detail}></textarea>
      ) : (
        <p>{comment.detail}</p>
      )}
      <div className="comment-btns">
        <span className="comment-btns-time">
          {moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss")}
        </span>
        {author === comment.author && (
          <>
            {edit ? (
              <span onClick={() => { onFinish(); }}>
                {intl.get('Save')}
              </span>
            ) : (
              <span onClick={() => { setEdit(true); }}>
                {intl.get('Edit')}
              </span>
            )}
          </>
        )}
        {author === comment.author && (
          <span
            onClick={() => {
              onDelete();
            }}
          >
            {intl.get('Delete')}
          </span>
        )}
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  novel: PropTypes.object.isRequired,
};

function CommentList(props) {
  const { comments } = props;
  return (
    <div className="comment-list" ref={(node) => props.onRef(node)}>
      {comments.length === 0 && <span>还没有评论哦，请点击下方添加评论</span>}
      {comments.length > 0 &&
        comments.map((comment) => {
          return (
            <CommentItem
              comment={comment}
              novel={props.novel}
              key={comment.id}
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
};

export default CommentList;
