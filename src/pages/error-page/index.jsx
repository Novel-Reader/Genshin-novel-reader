import React from "react";
import { useRouteError, Link } from "react-router-dom";
import "./index.css";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div id="error-page" className="d-flex center">
      <h1>Oops!</h1>
      <Link to="/">
        Sorry, an unexpected error has occurred, click to return novel reader.
      </Link>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}
