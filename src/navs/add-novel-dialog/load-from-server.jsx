import React, { Component } from "react";
import VipButton from "../../common/vip-button";
import setting from "../../setting.json";
import toaster from '../../common/toast';
import { Table } from "reactstrap";
import Book from './book';
export default class LoadFromServer extends Component {

  constructor(props) {
    super(props);
    this.isOnline = setting.mode === 'online';
    this.state = {
      isLoading: true,
      novelList: [],
    };
  }

  componentDidMount() {
    this.loadNovelsFromServer();
  }

  loadNovelsFromServer = () => {
    window.app.api.getNovelList().then((res) => {
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

  // 需要放到本地文档中，需要测试
  onClickNovel = (id) => {
    window.app.api.getNovelDetail(id).then(() => {
      // console.log(res);
    }).catch(err => {
      toaster.danger(err);
    });
  }

  render() {
    if (!this.isOnline) {
      return (
        <div>
          这是 VIP 用户联网专属功能
          <VipButton />
        </div>
      );
    }
    return (
      <div className="novel-list">
        <Table>
          <thead>
            <tr>
              <th>
                名称
              </th>
              <th>
                作者
              </th>
              <th>
                价格
              </th>
              <th>
                简介
              </th>
              <th>
                操作
              </th>
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
