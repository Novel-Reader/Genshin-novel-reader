import React, { useState } from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import axios from 'axios';
import cookie from 'react-cookies';
import { Modal, Form, Input, Typography } from 'antd';
import setting from '../../setting.js';
import toaster from '../toast';

const LoginDialog = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onLogin = () => {
    const options = { email, password };
    axios
      .post(`${setting.server}/api/login`, options)
      .then((res) => {
        if (res.data.token) {
          toaster.success(`用户 ${email} 登录成功, 1S后跳转到阅读器`);
          saveToken(res.data.token);
          props.toggle();
          cookie.save("username", email);
        } else {
          toaster.danger("登录失败，请检查你的用户名和密码是否正确");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          toaster.danger("登录失败，请检查你的用户名和密码是否正确");
        } else {
          toaster.danger(String(err));
        }
      });
  };

  const saveToken = (token) => {
    cookie.save("novelToken", token, { path: "/" });
    setTimeout(() => {
      window.location.href = window.location.href + "reader";
    }, 1000);
  };

  return (
    <Modal
      title={intl.get('Log in')}
      open={true}
      onOk={onLogin}
      onCancel={props.toggle}
    >
      <Form>
        <Form.Item>
          <Typography.Title level={5}>{intl.get('Email')}</Typography.Title>
          <Input
            value={email}
            onChange={handleEmailChange}
            placeholder={intl.get('Email')}
            autoFocus
          />
        </Form.Item>
        <Form.Item>
          <Typography.Title level={5}>{intl.get('Password')}</Typography.Title>
          <Input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder={intl.get('Password')}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

LoginDialog.propTypes = {
  toggle: PropTypes.func.isRequired,
};

export default LoginDialog;
