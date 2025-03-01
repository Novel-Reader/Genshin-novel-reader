import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

function AdminUsers({ users }) {
  const columns = [
    {
      title: "Username",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "UserId",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "",
      key: "operation",
      render: () => {
        return;
      },
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={users}
      className="admin-users"
      rowKey="id"
      title={() => '用户列表'}
      footer={() => '备注'}
    />
  );
}

AdminUsers.propTypes = {
  users: PropTypes.array.isRequired,
};

export default AdminUsers;
