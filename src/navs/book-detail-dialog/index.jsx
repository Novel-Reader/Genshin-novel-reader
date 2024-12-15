import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { TbCircleDotted } from "react-icons/tb";
import { Modal } from "antd";
import toaster from "../../common/toast";
import CommentList from "./comment-list";
import AddComment from "./add-comment";
import throttle from "../../utils/throttle";

const LIMIT = 20;

function BookDetailDialog(props) {
  const [loading, setLoading] = useState(true);
  const [loadAll, setLoadAll] = useState(false);
  const [comments, setComments] = useState([]);
  const [start, setStart] = useState(1);
  let commentRef = null;

  const checkLoadAll = useCallback((comments) => {
    if (comments.length < LIMIT) {
      setLoadAll(true);
    } else {
      setStart(start + 1);
    }
  }, [start]);

  const loadComments = useCallback(() => {
    window.app.api
      .getCommentList(props.novel.id, start, LIMIT)
      .then((res) => {
        setComments(res.data);
        setLoading(false);
        checkLoadAll(res.data);
      })
      .catch((err) => {
        toaster.danger(intl.get('Getting comments failed, please close the dialog box and try again'));
        toaster.danger(String(err));
      });
  }, [props.novel.id, start, checkLoadAll]);

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreComment = () => {
    if (loading || loadAll) return;
    window.app.api
      .getCommentList(props.novel.id, start, LIMIT)
      .then((res) => {
        setComments([...comments, ...res.data]);
        setStart(start + 1);
        setLoading(false);
        checkLoadAll(res.data);
      })
      .catch((err) => {
        toaster.danger(intl.get('Getting comments failed, please close the dialog box and try again'));
        toaster.danger(String(err));
      });
  };

  const onScroll = throttle((e) => {
    const clientHeight = commentRef.clientHeight;
    if (e.target.scrollTop + e.target.clientHeight > clientHeight) {
      loadMoreComment();
    }
  }, 200);

  const onCommentListRef = (node) => {
    commentRef = node;
  };

  return (
    <Modal
      open={true}
      onCancel={props.toggleDialog}
      className="book-detail-dialog"
      width={800}
      title={intl.get('Comment')}
      footer={[
        <AddComment novel={props.novel} loadComments={loadComments} key="add-comment" />,
      ]}
    >
      <div onScroll={onScroll}>
        {comments.length > 0 && (
          <CommentList
            comments={comments}
            novel={props.novel}
            onRef={onCommentListRef}
            loadComments={loadComments}
          />
        )}
        {loading && <TbCircleDotted />}
        {loadAll && <div style={{ margin: '2rem 0' }}>{intl.get('No more comment')}</div>}
      </div>
    </Modal>
  );
}

BookDetailDialog.propTypes = {
  toggleDialog: PropTypes.func.isRequired,
  downLoadNovel: PropTypes.func.isRequired,
  novel: PropTypes.object.isRequired,
};

export default BookDetailDialog;
