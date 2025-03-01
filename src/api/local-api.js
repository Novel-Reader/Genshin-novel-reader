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
  init({ server, token }) {
    this.server = server;
    this.token = token;
    if (this.server) {
      this.req = axios.create({
        baseURL: this.server,
        headers: { Authorization: "Bearer " + this.token },
      });
    }
    this.info = {};
    return this;
  }

  setUserInfo(info) {
    this.info = Object.assign({}, this.info, info);
  }

  /**
   * check internet is connect
   * @returns pong
   */
  checkNet() {
    const url = `${this.server}/api/ping/`;
    return this.req.get(url);
  }

  /**
   * user login
   * @param {string} email
   * @param {string} password
   * @returns {object} response
   */
  login(email, password) {
    const url = `${this.server}/api/login`;
    const options = {
      email,
      password,
    };
    return this.req.post(url, options);
  }

  /**
   * get user info by email
   * @param {string} email
   * @returns user object
   */
  getUserInfo(email) {
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
  addUser(email, name, password) {
    const url = `${this.server}/api/user`;
    const options = {
      email,
      name,
      password,
    };
    return this.req.post(url, options);
  }

  /**
   * delete user by email
   * @param {string} email
   * @returns boolean
   */
  deleteUser(email) {
    const url = `${this.server}/api/user?email=${email}`;
    return this.req.delete(url);
  }

  /**
   * change user password
   * @param {string} password
   * @param {string} user email
   * @returns user object
   */
  updateUserPassword(password, email) {
    const url = `${this.server}/api/user-password`;
    const options = {
      email,
      password,
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
    const url = `${this.server}/api/user-avatar`;
    const options = {
      email,
      avatar,
    };
    return this.req.post(url, options);
  }

  /**
   * add novel to database
   * @param {string} name
   * @param {string} cover_photo
   * @param {string} author
   * @param {string} detail
   * @param {number} price
   * @param {string} brief
   * @param {number} size
   * @param {string} tag
   * @returns success
   */
  addNovel(name, cover_photo, author, detail, price, brief, size, tag) {
    const url = `${this.server}/api/novel`;
    const options = { name, cover_photo, author, detail, price, brief, size, tag };
    return this.req.post(url, options);
  }

  /**
   * delete novel by id
   * @param {string} id
   * @returns boolean
   */
  deleteNovel(id) {
    const url = `${this.server}/api/novel?id=${id}`;
    return this.req.delete(url);
  }

  /**
   * get novels list
   * @returns novels
   */
  getNovelList() {
    const url = `${this.server}/api/novel_list`;
    return this.req.get(url);
  }

  /**
   * add a comment
   * @param {string} book_id
   * @param {string} detail
   * @param {string} author
   * @returns response
   */
  addComment(book_id, detail, author) {
    const url = `${this.server}/api/comment`;
    const options = { book_id, detail, author };
    return this.req.post(url, options);
  }

  /**
   * get comment list of a book
   * @param {string} book_id
   * @param {number} start
   * @param {number} limit
   * @returns response
   */
  getCommentList(book_id, start, limit) {
    const url = `${this.server}/api/comment?book_id=${book_id}&start=${start}&limit=${limit}`;
    return this.req.get(url);
  }

  /**
   * The author of comment can edit this comment
   * @param {string} comment_id
   * @param {string} detail new comment content
   * @returns response
   */
  editComment(comment_id, detail) {
    const url = `${this.server}/api/comment`;
    const options = { comment_id, detail };
    return this.req.put(url, options);
  }

  /**
   * delete a comment by id
   * @param {string} comment_id
   * @returns response
   */
  deleteComment(comment_id) {
    const url = `${this.server}/api/comment?id=${comment_id}`;
    return this.req.delete(url);
  }

  /**
   * get novel detail by id
   * @param {string} id
   * @returns novel
   */
  getNovelDetail(book_id) {
    const url = `${this.server}/api/novel-detail?book_id=${book_id}&user_id=${this.info.user_id}`;
    return this.req.get(url);
  }

  searchNovel(keyword) {
    const url = `${this.server}/api/search-novel`;
    return this.req.post(url, { keyword });
  }

  adminGetUsers() {
    const url = `${this.server}/api/admin/users`;
    return this.req.get(url);
  }

  adminGetBooks() {
    const url = `${this.server}/api/admin/books`;
    return this.req.get(url);
  }

  adminGetComments() {
    const url = `${this.server}/api/admin/comments`;
    return this.req.get(url);
  }

  getUserBookList(user_id) {
    const url = `${this.server}/api/user-book?user_id=${user_id}`;
    return this.req.get(url);
  }

  updateUserBook(user_id, book_id) {
    const url = `${this.server}/api/user-book`;
    const options = { user_id, book_id };
    return this.req.post(url, options);
  }

  deleteUserBook(user_id, book_id) {
    const url = `${this.server}/api/user-book?user_id=${user_id}&book_id=${book_id}`;
    return this.req.delete(url);
  }

}

export default LocalAPI;
