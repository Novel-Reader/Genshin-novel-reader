import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import cookie from 'react-cookies';
import { Modal, ModalHeader, ModalBody, Button, Input, Label, Form, FormGroup } from 'reactstrap';
import setting from "../../setting.json";
import toaster from '../toast';

class LoginDialog extends Component {
  constructor (props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  onLogin = () => {
    const email = this.emailRef.current.value.trim();
    const password = this.passwordRef.current.value;
    const options = { email, password };
    // TODO loading
    axios.post(`${setting.server}/login`, options).then(res => {
      if (res.data.token) {
        toaster.success(`用户 ${email} 登录成功`);
        // TODO: set user permission and env
        this.saveToken(res.data.token);
        this.props.toggle();
      } else {
        toaster.danger('登录失败，请检查你的用户名和密码是否正确');
      }
    }).catch((err) => {
      if (err.response && err.response.status === 400) {
        toaster.danger('登录失败，请检查你的用户名和密码是否正确');
      } else {
        toaster.danger(err);
      }
    });
  };

  saveToken = (token) => {
    cookie.save('novelToken', token, { path: '/' });
    setTimeout(() => {
      window.location.href = window.location.href + 'reader'; // redirect to novel main page
    }, 1000);
  };

  render () {
    return (
      <Modal isOpen={true} toggle={this.props.toggle} className="login-dialog">
        <ModalHeader toggle={this.props.toggle}>登录</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>邮箱</Label>
              <Input type="text" innerRef={this.emailRef} autoFocus />
            </FormGroup>
            <FormGroup>
              <Label>密码</Label>
              <Input type="password" innerRef={this.passwordRef}/>
            </FormGroup>
          </Form>
          <Button color="success" onClick={this.onLogin}>登录</Button>
        </ModalBody>
      </Modal>
    );
  }
}

LoginDialog.propTypes = {
  toggle: PropTypes.func.isRequired
};

export default LoginDialog;
