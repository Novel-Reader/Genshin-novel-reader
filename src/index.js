import React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MediaQuery from 'react-responsive';
import App from "./App";
import AppMobile from './App-mobile';
import ErrorPage from "./error-page";
import Admin from "./admin";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/font.css";
import "./css/common.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <MediaQuery query="(min-device-width: 767.8px)">
          <App/>
        </MediaQuery>
        <MediaQuery query="(max-device-width: 767.8px)">
          <AppMobile/>
        </MediaQuery>
      </>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "admin/",
    element: <Admin />,
  },
]);

// ReactDOM.render is no longer supported in React 18. 
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
const container = document.getElementById('root');

const root = createRoot(container);

root.render(<RouterProvider router={router} />);
