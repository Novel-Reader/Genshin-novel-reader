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
