import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

function AdminBooks({ books }) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
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
      dataSource={books}
      className="admin-books"
      rowKey="id"
      title={() => '书籍列表'}
      footer={() => '备注'}
    />
  );
}

AdminBooks.propTypes = {
  books: PropTypes.array.isRequired,
};

export default AdminBooks;
