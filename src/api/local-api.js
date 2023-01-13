import axios from 'axios';

export default class LocalAPI {
  
  init({server, username, password}) {
    this.server = server;
    this.username = username;
    this.password = password;
    if (this.server) {
      this.req = axios.create({
        baseURL: this.server,
        // By default, all pages do not require login authentication
        // headers: { 'Authorization': 'Token ' + this.token }
      });
    }
    return this;
  }

  checkNet() {
    const url = `${this.server}/ping/`;
    return this.req.get(url);
  }

  getUser() {
    const url = `${this.server}/user/`;
    return this.req.get(url);
  }

  // https://www.jb51.net/article/254229.htm
  // longtext 字段完全可以存放全部的内容。搜索的性能可能比较差，目前只搜索名称字段，不需要搜索详情。
  // 请求后，本地做一个缓存，避免频繁请求数据库

  // insert() {
  //   const url = `${this.server}/api/v2.1/${token}`;
  //   let data = {};
  //   return this.req.post(url, data);
  // }

  // delete() {
  //   const url = `${this.server}/api/v2.1/${token}`;
  //   const data = {};
  //   return this.req.delete(url, data);
  // }
}
