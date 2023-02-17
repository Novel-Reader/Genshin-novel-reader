import React from 'react';
import { Link } from "react-router-dom";
import './index.css';

// https://reactrouter.com/en/main/start/tutorial

export default function Admin() {
  return (
    <div className="admin d-flex center">
      <h1>Admin Page</h1>
      <Link to="/">Not support yet, click to return novel reader.</Link>
    </div>
  );
}
