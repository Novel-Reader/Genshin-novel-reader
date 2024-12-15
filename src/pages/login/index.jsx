import React, { useState } from "react";
import LoginDialog from "../../common/login-dialog";
import { Button } from "antd";
import "./index.css";

const Login = () => {
  const [isShowLogin, setIsShowLogin] = useState(false);

  const toggleLoginDialog = () => {
    setIsShowLogin(!isShowLogin);
  };

  return (
    <>
      <div className="login">
        <h1>原神主题小说阅读器</h1>
        <h4>使用 React 和 Express 框架，结合 MySQL 数据库构建的图书阅读+查询系统。</h4>
        <h4>实现本地小说阅读上传、在线小说阅读下载和管理流程，支持用户自定义阅读器的外观和功能。</h4>
        <header>
          <Button type="primary" onClick={toggleLoginDialog}>
            登录
          </Button>
        </header>
      </div>
      {isShowLogin && (
        <LoginDialog toggle={toggleLoginDialog} />
      )}
    </>
  );
};

export default Login;
