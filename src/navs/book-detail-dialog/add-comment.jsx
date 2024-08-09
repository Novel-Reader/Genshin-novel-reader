import React, { useRef, useContext } from "react";
import PropTypes from "prop-types";
import cookie from "react-cookies";
import intl from "react-intl-universal";
import { Button } from "reactstrap";
import toaster from "../../common/toast";
import { AppContext } from "../../context";

import "./add-comment.css";

function AddComment(props) {
  const commentElement = useRef("");
  const { api } = useContext(AppContext);

  function submitComment() {
    const detail = commentElement.current.value;
    if (detail.length < 3) {
      toaster.warning(intl.get('Comment should have at least 3 characters in length'));
      return;
    }
    if (detail.length > 1000) {
      toaster.warning(intl.get('The comment word count cannot exceed 1000 characters'));
      return;
    }
    // TODO get user nickname(database add a nickName?) Now we use email
    // TODO username 不是 author
    const author = cookie.load("username");
    api
      .addComment(props.novel.id, detail, author)
      .then((res) => {
        toaster.success(intl.get('Comment successful'));
        commentElement.current.value = '';
        props.loadComments();
      })
      .catch((err) => {
        toaster.danger(intl.get('Error, please try again'));
        toaster.danger(String(err));
      });
    return;
  }

  return (
    <div className="add-comment w-100">
      <textarea ref={commentElement} className="w-100"></textarea>
      <Button onClick={submitComment} color="primary">{intl.get('Submit')}</Button>
    </div>
  );
}

AddComment.propTypes = {
  novel: PropTypes.object.isRequired,
  loadComments: PropTypes.func.isRequired,
};

export default AddComment;
