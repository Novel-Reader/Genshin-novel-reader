import React, { Component } from "react";
import LoginDialog from "../../common/login-dialog";
import { Button } from "reactstrap";
import "./index.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowLogin: false,
    };
  }

  toggleLoginDialog = () => {
    this.setState({ isShowLogin: !this.state.isShowLogin });
  };

  render() {
    return (
      <>
        <div className="login">
          <h1>原神主题小说阅读器</h1>
          <h3>
            使用 React 和 Express 框架，结合 MySQL
            数据库构建的图书阅读+查询系统。
          </h3>
          <h3>
            实现本地小说阅读上传、在线小说阅读下载和管理流程，支持用户自定义阅读器的外观和功能。
          </h3>
          <header>
            <Button color="warning" onClick={this.toggleLoginDialog}>
              登录
            </Button>
          </header>
        </div>
        {this.state.isShowLogin && (
          <LoginDialog toggle={this.toggleLoginDialog} />
        )}
      </>
    );
  }
}
