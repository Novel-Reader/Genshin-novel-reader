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
  init ({ server, token }) {
    this.server = server;
    this.token = token;
    if (this.server) {
      this.req = axios.create({
        baseURL: this.server,
        headers: { Authorization: 'Bearer ' + this.token }
      });
    }
    return this;
  }

  /**
   * check internet is connect
   * @returns pong
   */
  checkNet () {
    const url = `${this.server}/api/ping/`;
    return this.req.get(url);
  }

  /**
   * user login
   * @param {string} email
   * @param {string} password
   * @returns {object} response
   */
  login (email, password) {
    const url = `${this.server}/api/login`;
    const options = {
      email,
      password
    };
    return this.req.post(url, options);
  }

  /**
   * get all users in dabatase
   * @returns {array} user list
   */
  getUsers () {
    const url = `${this.server}/api/users/`;
    return this.req.get(url);
  }

  /**
   * get user info by email
   * @param {string} email
   * @returns user object
   */
  getUserInfo (email) {
    const url = `${this.server}/api/user?email=${email}`;
    return this.req.get(url);
  }

  /**
   * add new user
   * @param {string} email
   * @param {string} name
   * @param {string} password
   * @returns boolean
   */
  addUser (email, name, password) {
    const url = `${this.server}/api/user`;
    const options = {
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
  deleteUser (email) {
    const url = `${this.server}/api/user?email=${email}`;
    return this.req.delete(url);
  }

  /**
   * change user password
   * @param {string} password
   * @param {string} user email
   * @returns user object
   */
  updateUserPassword (password, email) {
    const url = `${this.server}/api/user-password`;
    const options = {
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
  updateUserAvatar (avatar, email) {
    const url = `${this.server}/api/user-avatar`;
    const options = {
      email,
      avatar
    };
    return this.req.post(url, options);
  }

  /**
   * add novel to dabatase
   * @param {string} name
   * @param {string} cover_photo
   * @param {string} author
   * @param {string} detail
   * @param {number} price
   * @param {string} brief
   * @returns success
   */
  addNovel (name, cover_photo, author, detail, price, brief) {
    const url = `${this.server}/api/novel`;
    const options = { name, cover_photo, author, detail, price, brief };
    return this.req.post(url, options);
  }

  /**
   * delete novel by id
   * @param {string} id
   * @returns boolean
   */
  deleteNovel (id) {
    const url = `${this.server}/api/novel?id=${id}`;
    return this.req.delete(url);
  }

  /**
   * get novels list
   * @returns novels
   */
  getNovelList () {
    const url = `${this.server}/api/novel_list`;
    return this.req.get(url);
  }

  // TODO 注释
  addComment (book_id, detail, author) {
    const url = `${this.server}/api/comment`;
    const options = { book_id, detail, author };
    return this.req.post(url, options);
  }

  // TODO start, limit
  getCommentList (book_id) {
    const url = `${this.server}/api/comment?book_id=${book_id}`;
    return this.req.get(url);
  }

  // TODO 注释
  editComment (comment_id, detail) {
    const url = `${this.server}/api/comment`;
    const options = { comment_id, detail };
    return this.req.put(url, options);
  }

  // TODO 注释
  deleteComment (comment_id) {
    const url = `${this.server}/api/comment?id=${comment_id}`;
    return this.req.delete(url);
  }

  /**
   * get novel detail by id
   * @param {string} id
   * @returns novel
   */
  getNovelDetail (id) {
    const url = `${this.server}/api/search-novel?id=${id}`;
    return this.req.get(url);
  }

  /**
   * search novel by novel name
   * @param {string} novel name
   * @returns {object} novel
   */
  searchNovelByName (name) {
    const url = `${this.server}/api/search-novel`;
    const options = { name };
    return this.req.post(url, options);
  }

  /**
   * search novel by author name
   * @param {string} author name
   * @returns {object} novel
   */
  searchNovelByAuthor (author) {
    const url = `${this.server}/api/search-novel`;
    const options = { author };
    return this.req.post(url, options);
  }

  /**
   * search novel by price
   * @param {number} price of searched novel
   * @returns {object} novel
   */
  searchNovelByPrice (price) {
    const url = `${this.server}/api/search-novel`;
    const options = { price };
    return this.req.post(url, options);
  }

  /**
   * search novel
   * @param {string} novel name
   * @param {stribg} author name
   * @param {number} novel price
   * @returns {object} novel
   */
  searchNovel (name, author, price) {
    const url = `${this.server}/api/search-novel`;
    const options = { name, author, price };
    return this.req.post(url, options);
  }
}

export default LocalAPI;
