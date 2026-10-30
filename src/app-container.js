import React from "react";
import Cookies from 'js-cookie';
import { ConfigProvider } from "antd";
import enUS from 'antd/locale/en_US';
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
      <App
        mode={mode}
        server={server}
      />
    </ConfigProvider>
  );
}

export default AppContainer;
