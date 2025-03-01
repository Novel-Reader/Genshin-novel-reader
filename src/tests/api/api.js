import LocalAPI from "../../api/local-api";

let api = new LocalAPI();

api.init({
  server: "http://127.0.0.1:8081",
  username: "1@1.com",
  password: "1",
});

test("get user list", () => {
  return api.getUsers().then((response) => {
    expect(response.data).not.toBe(null);
  });
});

api
  .getUsers()
  .then((res) => {
    // const userList = res.data;
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo("mike@163.com")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo("Amy@163.com")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .addUser("julia@qq.com", "Julia", "")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err.response.data.error_massage);
  });

api
  .addUser("julia@qq.com", "Julia", "12345678")
  .then((res) => {
    console.log(res.data === "success");
  })
  .catch((err) => {
    console.error(err);
  });

api
  .deleteUser("julia@qq.com")
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .addUser("julia@qq.com", "Julia", "12345678")
  .then((res) => {
    console.log(res.data === "success");
  })
  .catch((err) => {
    console.error(err);
  });

api
  .updateUserPassword("666888", "julia@qq.com")
  .then((res) => {
    console.log(res.data === "success");
  })
  .catch((err) => {
    console.error(err);
  });

api
  .updateUserAvatar("www.baidu.com", "julia@qq.com")
  .then((res) => {
    console.log(res.data === "success");
  })
  .catch((err) => {
    console.error(err);
  });
