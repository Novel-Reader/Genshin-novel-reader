import axios from "axios";

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

  // 用户登录
  login(email, password) {
    const url = `${this.server}/login`;
    let options = {
      email,
      password
    };
    return this.req.post(url, options);
  }

  // 用户相关 API
  getUsers() {
    const url = `${this.server}/users/`;
    return this.req.get(url);
  }

  getUserInfo(email) {
    const url = `${this.server}/user?email=${email}`;
    return this.req.get(url);
  }

  addUser(email, name, password) {
    const url = `${this.server}/user`;
    let options = {
      email,
      name,
      password
    };
    return this.req.post(url, options);
  }

  deleteUser(email) {
    const url = `${this.server}/user?email=${email}`;
    return this.req.delete(url);
  }

  updateUserPassword(password, email) {
    const url = `${this.server}/user-password`;
    let options = {
      email,
      password
    };
    return this.req.post(url, options);
  }

  updateUserAvatar(avatar, email) {
    const url = `${this.server}/user-avatar`;
    let options = {
      email,
      avatar
    };
    return this.req.post(url, options);
  }

  // 文件相关 API
  // https://www.jb51.net/article/254229.htm
  // longtext 字段完全可以存放全部的内容。搜索的性能可能比较差，目前只搜索名称字段，不需要搜索详情。
  // 请求后，本地做一个缓存，避免频繁请求数据库
}
