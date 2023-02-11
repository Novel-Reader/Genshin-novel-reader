import axios from "axios";

/**
 * LocalAPI for get data from server
 */
class LocalAPI {
  
  /**
   * init api
   * @param {object} server, username, password, token
   * @returns API object
   */
  init({server, token}) {
    this.server = server;
    this.token = token;
    if (this.server) {
      this.req = axios.create({
        baseURL: this.server,
        headers: { 'Authorization': 'Bearer ' + this.token }
      });
    }
    return this;
  }

  /**
   * check internet is connect
   * @returns pong
   */
  checkNet() {
    const url = `${this.server}/ping/`;
    return this.req.get(url);
  }

  /**
   * user login
   * @param {string} email 
   * @param {string} password 
   * @returns {object} response
   */
  login(email, password) {
    const url = `${this.server}/login`;
    let options = {
      email,
      password
    };
    return this.req.post(url, options);
  }

  /**
   * get all users in dabatase
   * @returns {array} user list
   */
  getUsers() {
    const url = `${this.server}/users/`;
    return this.req.get(url);
  }

  /**
   * get user info by email
   * @param {string} email 
   * @returns user object
   */
  getUserInfo(email) {
    const url = `${this.server}/user?email=${email}`;
    return this.req.get(url);
  }

  /**
   * add new user
   * @param {string} email 
   * @param {string} name 
   * @param {string} password 
   * @returns boolean
   */
  addUser(email, name, password) {
    const url = `${this.server}/user`;
    let options = {
      email,
      name,
      password
    };
    return this.req.post(url, options);
  }

  /**
   * delete user by email
   * @param {string} email 
   * @returns boolean
   */
  deleteUser(email) {
    const url = `${this.server}/user?email=${email}`;
    return this.req.delete(url);
  }

  /**
   * change user password
   * @param {string} password 
   * @param {string} user email 
   * @returns user object
   */
  updateUserPassword(password, email) {
    const url = `${this.server}/user-password`;
    let options = {
      email,
      password
    };
    return this.req.post(url, options);
  }

  /**
   * change user avatar
   * @param {string} avatar image path
   * @param {string} user email 
   * @returns user object
   */
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

export default LocalAPI;
