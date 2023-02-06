import LocalAPI from '../../api/local-api';

let api = new LocalAPI();

api.init({
  server: 'http://127.0.0.1:8081',
  username: '1@1.com',
  password: '1',
});

// 下面的测试案例在开发时测试通过，执行 npm run test 单元测试，
// Jest 不支持 es6 的语法，可能需要对 test 增加 config，这部分暂时不处理
// https://jestjs.io/docs/ecmascript-modules

test("get user list", () => {
  return api.getUsers().then(response => {
    expect(response.data).not.toBe(null);
  })
});

// 测试全部用户 通过
api.getUsers().then(res => {
  // TODO test query user and check is Pro version
  // const userList = res.data;
}).catch(err => {
  console.error(err);
});

// 测试存在的用户 email 通过
api.getUserInfo('mike@163.com').then(res => {
  // TODO test query user and check is Pro version
  console.log(res.data);
}).catch(err => {
  console.error(err);
});

// 测试不存在的用户 email 通过
api.getUserInfo('Amy@163.com').then(res => {
  // TODO test query user and check is Pro version
  console.log(res.data);
}).catch(err => {
  console.error(err);
});

// 测试新增用户 通过
api.addUser('julia@qq.com', 'Julia', '').then(res => {
  console.log(res.data);
}).catch(err => {
  // 这里测试没有密码
  // console.log(err);
  console.log(err.response.data.error_massage);
});

// 测试正常的用户 通过
api.addUser('julia@qq.com', 'Julia', '12345678').then(res => {
  console.log(res.data === 'success');
}).catch(err => {
  console.error(err);
});

// 测试删除用户
api.deleteUser('julia@qq.com').then(res => {
  console.log(res.data);
}).catch(err => {
  console.error(err);
});

// 测试更新用户信息时，需要有这个用户
api.addUser('julia@qq.com', 'Julia', '12345678').then(res => {
  console.log(res.data === 'success');
}).catch(err => {
  console.error(err);
});

// 更改用户密码
api.updateUserPassword('666888', 'julia@qq.com').then(res => {
  console.log(res.data === 'success');
}).catch(err => {
  console.error(err);
});

// 更改用户头像
api.updateUserAvatar('www.baidu.com', 'julia@qq.com').then(res => {
  console.log(res.data === 'success');
}).catch(err => {
  console.error(err);
});
