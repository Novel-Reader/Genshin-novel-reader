import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";

function AdminBooks({ books }) {
  return (
    <Table striped className="admin-books">
      <thead>
        <tr>
          <th>Name</th>
          <th>ID</th>
          <th>Price</th>
          <th>Author</th>
          <th>{/* operation */}</th>
        </tr>
      </thead>
      <tbody>
        {books.map(item => {
          return (
            <tr key={item.id}>
              <th scope="row" title={item.name}>{item.name}</th>
              <td>{item.id}</td>
              <td>{item.price}</td>
              <td>{item.author}</td>
              <td>{/* operation: delete */}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

AdminBooks.propTypes = {
  books: PropTypes.array.isRequired,
};

export default AdminBooks;
