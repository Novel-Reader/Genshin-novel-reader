var express = require('express');
var logger = require('./logger');
var DBHelper = require('./db-helper');

function httpServer() {

  var app = express();

  // 处理 POST 请求
  app.use(express.urlencoded());
  app.use(express.json());

  // handle browser cross origin
  app.all("*", function (req, res, next) {
    // cross origin
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method == 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // 通过
  app.get('/ping/', (req, res) => {
    res.send("pong");
  });

  // 通过
  app.get('/', function(req, res) {
    res.send('Hello GET');
  });

  // 通过
  app.post('/', function(req, res) {
    res.send('Hello POST');
  });

  // 通过（TODO 返回一个 token ）
  app.post('/login', function(req, res) {
    // TODO 验证当前管理员权限
    const { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE email=? and password=?`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err); 
        res.status(400).send({'error_massage': err});
        return;
      }
      if (results.length === 0) {
        res.status(400).send({'error_massage': '邮箱或者密码不正确'});
        return;
      }
      res.status(200).send('success');
      return;
    }, [email, password]);
  });

  // 通过 列出全部的用户信息
  app.get('/users', function(req, res) {
    // 需要验证当前管理员权限
    // TODO 这里应该不能返回密码
    var sql = `SELECT * FROM user order by id asc`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err); 
        res.status(400).send({'error_massage': err});
        return;
      }
      res.status(200).send(results);
      return;
    });
  });

  // 通过 获取指定用户信息
  // TODO 这里应该不能返回密码
  app.get('/user', function(req, res) {
    var email = req.query.email;
    var sql = `SELECT * FROM user WHERE email=?`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err); 
        res.status(400).send({'error_massage': err});
        return;
      }
      res.status(200).send(results);
      return;
    }, [email]);
  });

  // 通过 增加用户
  app.post('/user', function(req, res) {
    const { email, name, password } = req.body;
    // 验证用户信息
    if (!email || !name || !password) {
      res.status(400).send({'error_massage': '邮箱或用户名或密码为空'});
      return;
    }
    if (password.length < 6) {
      res.status(400).send({'error_massage': '密码长度太短'});
      return;
    }
    let sql = `SELECT * FROM user WHERE email=?`;
    DBHelper(sql, (err, results) => {
      // 执行出错
      if (err) {
        logger.error(err); 
        res.status(500).send({'error_massage': '服务器内部错误'});
        return;
      }
      // 数据库中已经有这个数据了
      if (results.length > 0) {
        res.status(400).send({'error_massage': '这个邮箱已经被使用过了'});
        return;
      }
      // 数据库中没有这个邮箱，将新数据插入到数据库中
      sql = `insert into user (name, email, password, avatar) values(?, ?, ?, ?)`;
      DBHelper(sql, (err, results) => {
        if (err) {
          logger.error(err); 
          res.status(400).send({'error_massage': err});
          return;
        }
        res.status(200).send('success');
        return;
      }, [name, email, password, 'https://www.baidu.com/img/flexible/logo/pc/result@2.png']);
    }, [email]);
  });

  // 通过 删除用户
  app.delete('/user', function(req, res) {
    // 需要验证当前管理员权限
    let email = req.query.email;
    let sql = `DELETE FROM user WHERE email=?`;
    logger.error(115, email);
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err); 
        res.status(400).send({'error_massage': err});
        return;
      }
      logger.info(results);
      res.status(200).send('success');
      return;
    }, [email]);
  });

  // 通过 更改用户密码
  app.post('/user-password', function(req, res) {
    // 需要验证当前管理员权限
    const { email, password } = req.body;
    let sql = `update user set password = ? where email = ?`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err); 
        res.status(400).send({'error_massage': err});
        return;
      }
      res.status(200).send('success');
      return;
    }, [password, email]);
  });

  // 通过 更改用户头像
  app.post('/user-avatar', function(req, res) {
    // 需要验证当前管理员权限
    const { email, avatar } = req.body;
    let sql = `update user set avatar = ? where email = ?`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err); 
        res.status(400).send({'error_massage': err});
        return;
      }
      res.status(200).send('success');
      return;
    }, [avatar, email]);
  });

  // TODO: 登录
  // app.post('/login',

  // // 文件 API
  // // 获取全部的文件列表
  // app.get('/novel-list', (req, res) => {
  //   res.send('');
  // });

  // // 获取某个文件的详情
  // app.get('/novel', (req, res) => {
  //   res.send('');
  // });

  // // 增加文件
  // app.post('/novel', (req, res) => {
  //   res.send('');
  // });
  
  // // 删除文件
  // app.delete('/novel', (req, res) => {
  //   res.send('');
  // });

  // 根据字段搜索文件爱那
  // select * from account where name ilike '%mike%';

  // const PORT = process.env.PORT || 8081;
  var server = app.listen(8081, function () {   
    var host = server.address().address  
    var port = server.address().port;
    logger.info('Starting server process: ', process.pid);
    logger.info("Server is running on port: ", host, port)
  });
}

module.exports = httpServer;
