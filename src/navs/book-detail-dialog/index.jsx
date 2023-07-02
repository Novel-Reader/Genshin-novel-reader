import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import toaster from '../../common/toast';
import { LoadingIcon } from '../../common/icons';
import CommentList from './comment-list';
import AddComment from './add-comment';

function BookDetailDialog(props) {

  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    window.app.api.getCommentList(props.novel.id).then((res) => {
      const comments = res.data;
      setComments(comments);
      setLoading(false);
    }).catch(err => {
      toaster.danger('获取评论失败，请关闭对话框重试');
      toaster.danger(String(err));
    });
  }, []);

  return (
    <Modal isOpen={true} toggle={props.toggleDialog} className="book-datial-dialog" size="lg">
      <ModalHeader toggle={props.toggleDialog}>小说评论</ModalHeader>
      <ModalBody>
        {/* 小说详情界面 */}
        {/* 小说评论列表 */}
        {loading && <LoadingIcon/>}
        {!loading && <CommentList comments={comments}/>}
        {/* 增加评论列表 */}
        {!loading &&
          <AddComment novel={props.novel} />
        }
        {/* TODO：动态聊天室 */}
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.toggleDialog}>关闭</Button>
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
