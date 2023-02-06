import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Form, FormGroup } from 'reactstrap';

export default class LoginDialog extends Component {

  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  onClick = () => {
    let email = this.emailRef.current.value.trim();
    let password = this.passwordRef.current.value;
    this.props.api.login(email, password).then(res => {
      if (res.data === "success") {
        alert(`用户 ${email} 登录成功`);
        // this.props.setEnv();
        this.props.toggle();
      } else {
        alert('登录失败，请检查你的同户名和密码是否正确');
      }
    }).catch(err => {
      console.error(err);
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
          <Button color="success" onClick={this.onClick}>登录</Button>
        </ModalBody>
      </Modal>
    )
  }
}
