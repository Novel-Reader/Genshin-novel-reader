import React from "react";
import Cookies from 'js-cookie';
import { Provider } from 'react-redux';
import { ConfigProvider } from "antd";
import enUS from 'antd/locale/en_US';
import store from './store';
import App from "./App";
import antdLocales from './locale/antd-locales';

import "./css/common.less";

const lang = Cookies.get("lang") || "en";

const AppContainer = ({ mode = 'offline', server = '' }) => {
  return (
    <ConfigProvider
      locale={antdLocales[lang] || antdLocales.en || enUS}
      prefixCls="novel-reader-ant"
      renderEmpty={() => <div>暂无数据</div>}
      direction="ltr"
      form={{ labelAlign: 'left' }}
    >
      <Provider store={store}>
        <App
          mode={mode}
          server={server}
        />
      </Provider>
    </ConfigProvider>
  );
}

export default AppContainer;
