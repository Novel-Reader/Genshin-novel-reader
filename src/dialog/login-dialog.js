import React, { useState } from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Modal, Form, Input, Typography } from 'antd';
import toaster from '../common/toast';

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
      .post(`${props.server}/api/login`, options)
      .then((res) => {
        if (res.data.token) {
          toaster.success(`用户 ${email} 登录成功`);
          const token = res.data.token;
          Cookies.set("novelToken", token, { path: "/" });
          Cookies.set("username", email);
          setTimeout(() => {
            props.toggle();
          }, 100);
        } else {
          toaster.danger("登录失败，请检查你的用户名和密码");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          toaster.danger("登录失败，请检查你的用户名和密码");
        } else {
          toaster.danger(String(err));
        }
      });
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
