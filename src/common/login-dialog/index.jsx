import React, { Component } from 'react';
import axios from "axios";
import { Modal, ModalHeader, ModalBody, Button, Input, Label, Form, FormGroup } from 'reactstrap';
import setting from "../../setting.json";

export default class LoginDialog extends Component {

  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  onLogin = () => {
    let email = this.emailRef.current.value.trim();
    let password = this.passwordRef.current.value;
    let options = { email, password };
    axios.post(`${setting.server}/login`, options).then(res => {
      if (res.data.token) {
        // alert(`用户 ${email} 登录成功`);
        // TODO: 设置环境，用户是什么角色，是否是管理员
        // this.props.setEnv();
        this.props.initFromServer(res.data.token);
        this.props.toggle();
      } else {
        alert('登录失败，请检查你的同户名和密码是否正确');
      }
    }).catch((err) => {
      if (err.response.status === 400) {
        // alert('登录失败，请检查你的同户名和密码是否正确');
        alert(err.response.data.error_massage);
      }
    });
  }

  render() {
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
