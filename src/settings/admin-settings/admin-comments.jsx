import React from "react";
import PropTypes from "prop-types";
import dayjs from 'dayjs';
import { Table } from "antd";

function AdminComments({ comments }) {
  const columns = [
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
      render: (text) => {
        return text.slice(0, 20);
      },
    },
    {
      title: "Time",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => {
        return dayjs(text).format("YYYY-MM-DD HH:mm:ss");
      },
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
      dataSource={comments}
      className="admin-comments"
      rowKey="id"
      title={() => '评论列表'}
      footer={() => '备注'}
    />
  );
}

AdminComments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default AdminComments;
