import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MediaQuery from 'react-responsive';
import App from "./App";
import AppMobile from './App-mobile';
import ErrorPage from "./pages/error-page";
import Admin from "./pages/admin";

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

const Router = <RouterProvider router={router} />;

export default Router;
