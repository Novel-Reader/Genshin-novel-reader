import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import App from "./App";
import Login from "./pages/login";
import setting from "./setting.js";

let router = {};

if (setting.mode === "online") {
  router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/reader",
      element: <App />,
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

const Router = (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

export default Router;
