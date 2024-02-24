import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import throttle from "lodash.throttle";
import intl from "react-intl-universal";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import toaster from "../../common/toast";
import { LoadingIcon } from "../../common/icons";
import CommentList from "./comment-list";
import AddComment from "./add-comment";

const LIMIT = 5;

function BookDetailDialog(props) {
  const [loading, setLoading] = useState(true);
  const [loadAll, setLoadAll] = useState(false);
  const [comments, setComments] = useState([]);
  const [start, setStart] = useState(1);
  let commentRef = null;

  useEffect(() => {
    window.app.api
      .getCommentList(props.novel.id, start, LIMIT)
      .then((res) => {
        setComments(res.data);
        setStart(start + 1);
        setLoading(false);
        checkLoadAll(res.data);
      })
      .catch((err) => {
        toaster.danger(intl.get('Getting comments failed, please close the dialog box and try again'));
        toaster.danger(String(err));
      });
    // 这个只有在首次加载执行上面的逻辑（获取评论列表），所以只传递空数组即可，不需要在组件更新时（start变化，或者 novel 变化）再次获取评论
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

  const checkLoadAll = (comments) => {
    if (comments.length < LIMIT) {
      setLoadAll(true);
    }
  };

  // https://lodash.com/docs/4.17.15#throttle
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
      isOpen={true}
      toggle={props.toggleDialog}
      className="book-datial-dialog"
      size="lg"
    >
      <ModalHeader toggle={props.toggleDialog}>{intl.get('Comment')}</ModalHeader>
      <ModalBody onScroll={onScroll}>
        {/* 小说详情界面 */}
        {/* 当有评论时，显示评论列表 */}
        {comments.length > 0 && (
          <CommentList
            comments={comments}
            novel={props.novel}
            onRef={onCommentListRef}
          />
        )}
        {/* 当加载评论时，在评论列表后面，显示加载图标 */}
        {loading && <LoadingIcon />}
        {loadAll && <div style={{ margin: '2rem 0' }}>{intl.get('No more comment')}</div>}
        {/* TODO：动态聊天室 */}
      </ModalBody>
      <ModalFooter>
        <AddComment novel={props.novel} loadMoreComment={loadMoreComment}/>
      </ModalFooter>
    </Modal>
  );
}

BookDetailDialog.propTypes = {
  toggleDialog: PropTypes.func.isRequired,
  downLoadNovel: PropTypes.func.isRequired,
  novel: PropTypes.object.isRequired,
};

export default BookDetailDialog;
