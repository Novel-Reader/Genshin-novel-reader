import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import { Button } from 'reactstrap';
import toaster from '../../common/toast';

import './add-comment.css';

function AddComment(props) {

  const commentElement = useRef('');

  function submitComment() {
    const detail = commentElement.current.value;
    if (detail.length < 8) {
      toaster.warning('评论字数至少8个字符');
      return;
    }
    if (detail.length > 100) {
      toaster.warning('评论字数不能超过100个字符');
      return;
    }
    // TODO get user nickname(database add a nickName?) Now we use email
    const author = cookie.load('username');
    window.app.api.addComment(props.novel.id, detail, author).then((res) => {
      toaster.success('评论成功');
      // 应该执行一个回调函数，然后显示当前的评论
    }).catch(err => {
      toaster.danger('评论失败，请重试');
      toaster.danger(String(err));
    });
    return;
  }

  return (
    <div className="add-comment">
      <textarea ref={commentElement}></textarea>
      <Button onClick={submitComment}>提交</Button>
    </div>
  );
}

AddComment.propTypes = {
  novel: PropTypes.object.isRequired,
};

export default AddComment;
