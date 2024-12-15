import React from "react";
import cookie from "react-cookies";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import App from "./App";
import Login from "./pages/login";
import setting from "./setting.js";

import { ConfigProvider } from "antd";
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

let router = {};

if (setting.mode === "online") {
  router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/reader",
      element: (
        <Provider store={store}>
          <App />
        </Provider>
      ),
      errorElement: <App />,
    },
  ]);
}

if (setting.mode === "offline") {
  router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Provider store={store}>
          <App />
        </Provider>
      ),
      errorElement: <App />,
    },
  ]);
}

const lang = cookie.load("lang") || "en";

const Router = (
  <ConfigProvider
    locale={lang === "zh_CN" ? zhCN : enUS}
    prefixCls="novel-reader-ant"
    renderEmpty={() => <div>暂无数据</div>}
    direction="ltr"
    form={{ labelAlign: 'left' }}
  >
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ConfigProvider>
);

export default Router;
