import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MediaQuery from 'react-responsive';
import App from "./App";
import AppMobile from './App-mobile';
// import ErrorPage from "./pages/error-page";
import Admin from "./pages/admin";
import Login from "./pages/login";
import setting from "./setting.json";

let router = {};

if (setting.mode === 'online') {
  router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/reader",
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
      errorElement: <App />,
    },
    {
      path: "admin/",
      element: <Admin />,
    },
    // {
    //   path: "register/",
    //   element: <Register />,
    // },
    // and renders this element in case something went wrong
    // errorElement: <ErrorBoundary />,
  ]);
}

if (setting.mode === 'offline') {
  router = createBrowserRouter([
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
      errorElement: <App />,
    }
  ]);
}

const Router = <RouterProvider router={router} />;

export default Router;
