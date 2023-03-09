import React, { Component } from 'react';
import toaster from '../../common/toast';
import { Table } from "reactstrap";
import { Button, Input, Label, Form, FormGroup } from 'reactstrap';
import Book from './book';

export default class SearchFromServer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      novelList: [],
    };
    this.nameRef = React.createRef();
    this.authorRef = React.createRef();
    this.priceRef = React.createRef();
  }

  searchNovels = () => {
    const name = this.nameRef.current.value.trim();
    const price = this.priceRef.current.value;
    const author = this.authorRef.current.value.trim();
    if (price < 0) {
      toaster.danger('书籍价格应该大于0');
      return;
    }
    if (!name && !price && !author && price !== 0) {
      toaster.danger('必须填写任意一项');
      return;
    }
    window.app.api.searchNovel(name, author, price).then((res) => {
      this.setState({
        isLoading: false,
        novelList: res.data,
      });
    }).catch(err => {
      toaster.danger(err);
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    return (
      <div className="novel-list">
        <div>
          <Form>
            <FormGroup>
              <Label>名称(可选)</Label>
              <Input type="text" innerRef={this.nameRef} autoFocus />
            </FormGroup>
            <FormGroup>
              <Label>作者(可选)</Label>
              <Input type="text" innerRef={this.authorRef}/>
            </FormGroup>
            <FormGroup>
              <Label>价格(可选)</Label>
              <Input type="number" innerRef={this.priceRef}/>
            </FormGroup>
          </Form>
          <Button color="success" onClick={this.searchNovels}>搜索</Button>
        </div>
        <Table>
          {/* TODO：LoadingIcon */}
          <thead>
            <tr>
              <th>名称</th>
              <th>作者</th>
              <th>价格</th>
              <th>简介</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {this.state.novelList.map(item => <Book novel={item} onClick={this.onClickNovel}/>)}
          </tbody>
        </Table>
      </div>
    );
  }
}
