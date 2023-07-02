import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './comment-list.css';

function CommentList(props) {
  const { comments } = props;
  return (
    <div className="comment-list">
      {comments.length === 0 && <span>还没有评论哦，请点击下方添加评论</span>}
      {comments.length > 0 &&
        comments.map(comment => {
          return (
            <div className="comment-item" key={comment.id}>
              <p>{comment.author} 在 {moment(comment.created_at).format("YYYY-MM-DD HH:mm:ss")} 说:</p>
              <p>{comment.detail}</p>
            </div>
          );
        })
      }
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentList;
