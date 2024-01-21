import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";

function AdminUsers({ users }) {
  return (
    <Table striped className="admin-users">
      <thead>
        <tr>
          <th>Username</th>
          <th>UserId</th>
          <th>Email</th>
          <th>{/* operation */}</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => {
          return (
            <tr key={user.id}>
              <th scope="row" title={user.name}>{user.name}</th>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{/* operation */}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

AdminUsers.propTypes = {
  users: PropTypes.array.isRequired,
};

export default AdminUsers;
