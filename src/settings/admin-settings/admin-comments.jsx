import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Table } from "reactstrap";

function AdminComments({ comments }) {
  return (
    <Table striped className="admin-comments">
      <thead>
        <tr>
          <th>Author</th>
          <th>ID</th>
          <th>Detail</th>
          <th>time</th>
          <th>{/* operation */}</th>
        </tr>
      </thead>
      <tbody>
        {comments.map(item => {
          return (
            <tr key={item.id}>
              <th scope="row" title={item.author}>{item.author}</th>
              <td>{item.id}</td>
              <td>{item.detail.slice(0, 20)}</td>
              <td>{moment(item.created_at).format("YYYY-MM-DD HH:mm:ss")}</td>
              <td>{/* operation: delete */}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

AdminComments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default AdminComments;
