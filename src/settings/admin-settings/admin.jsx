import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import intl from "react-intl-universal";
import { TbCircleDotted } from "react-icons/tb";
import { Button, Modal } from "antd";
import { AppContext } from "../../context";
import toaster from "../../common/toast";
import AdminUsers from "./admin-users";
import AdminBooks from "./admin-books";
import AdminComments from "./admin-comments";
import AdminCommentsChart from "./admin-comments-chart";
import './admin.css';

function Admin() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="basic-settings-item">
      {/* todo: change button to icons in toolbar */}
      <Button onClick={() => setIsOpen(true)} size="sm" color="primary">
        {intl.get('Admin_Settings')}
      </Button>
      {isOpen && (
        <AdminStatisticsDialog toggleModal={() => setIsOpen(false)}/>
      )}
    </div>
  );
}

function AdminStatisticsDialog({ toggleModal }) {

  const { api } = useContext(AppContext);

  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  function onError(err) {
    toaster.danger(intl.get('Error, please try again'));
    toaster.danger(String(err));
  }

  // TODO：首先获取综述 count ，然后点击详情展示，后期优化

  useEffect(() => {
    api.adminGetUsers().then((res) => {
      setUsers(res.data);
    }).catch((err) => {
      onError(err);
    });

    api.adminGetBooks().then((res) => {
      setBooks(res.data);
    }).catch((err) => {
      onError(err);
    });
    
    api.adminGetComments().then((res) => {
      setComments(res.data);
    }).catch((err) => {
      onError(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (comments.length > 0 && users.length > 0 && books.length > 0) {
      setLoading(false);
    }
  }, [comments, users, books]);

  return (      
    <Modal
      width={900}
      className="admin-statistics-dialog"
      title="Admin Statistics"
      open={true}
      onCancel={toggleModal}
      footer={[
        <Button key="close" onClick={toggleModal}>
          Close
        </Button>,
      ]}
    >
      {loading ? (
        <TbCircleDotted />
      ) : (
        <div className="admin-statistics">
          <AdminCommentsChart comments={comments} />
          <AdminUsers users={users} />
          <AdminBooks books={books} />
          <AdminComments comments={comments} />
        </div>
      )}
    </Modal>
  );
}

AdminStatisticsDialog.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default Admin;
