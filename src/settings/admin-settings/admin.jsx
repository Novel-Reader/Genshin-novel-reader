import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
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

  useEffect(() => {
    axios.all([
      api.adminGetUsers(),
      api.adminGetBooks(),
      api.adminGetComments()
    ]).then(axios.spread((usersRes, booksRes, commentsRes) => {
      setUsers(usersRes.data);
      setBooks(booksRes.data);
      setComments(commentsRes.data);
      setLoading(false);
    })).catch((err) => {
      toaster.danger(intl.get('Error, please try again'));
      toaster.danger(String(err));
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {users.length > 0 ? <AdminUsers users={users} /> : <p>No Users</p>}
          {books.length > 0 ? <AdminBooks books={books} /> : <p>No Books</p>}
          {comments.length > 0 ? <AdminCommentsChart comments={comments} /> : <p>No Comments</p>}
          {comments.length > 0 ? <AdminComments comments={comments} /> : null}
        </div>
      )}
    </Modal>
  );
}

AdminStatisticsDialog.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default Admin;
