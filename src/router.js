import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MediaQuery from "react-responsive";
import App from "./App";
import AppMobile from "./App-mobile";
import Admin from "./pages/admin";
import Login from "./pages/login";
import setting from "./setting.json";
// import ErrorPage from "./pages/error-page";

import { Provider } from 'react-redux';
import store from './store';

let router = {};

// TODO Login Admin 等页面，迁移到后端项目实现，这个项目只实现阅读器代码，不涉及用户登录，后台管理等业务逻辑
if (setting.mode === "online") {
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
            <App />
          </MediaQuery>
          <MediaQuery query="(max-device-width: 767.8px)">
            <AppMobile />
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
    // errorElement: <ErrorBoundary />
  ]);
}

if (setting.mode === "offline") {
  router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <MediaQuery query="(min-device-width: 767.8px)">
            <Provider store={store}>
              <App />
            </Provider>
          </MediaQuery>
          <MediaQuery query="(max-device-width: 767.8px)">
            <AppMobile />
          </MediaQuery>
        </>
      ),
      errorElement: <App />,
    },
  ]);
}

const Router = (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

export default Router;
