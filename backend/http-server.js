var express = require('express');
var { expressjwt } = require("express-jwt");
var logger = require('./logger');
var DBHelper = require('./utils/db-helper');
var { setToken, verifyToken } = require('./utils/token');
var { SIGNKEY } = require('./utils/constants');

function httpServer() {

  var app = express();

  // handle POST request
  app.use(express.urlencoded());
  app.use(express.json());

  // verify token
  app.use(function(req, res, next) {
    var token = req.headers['authorization'];    
    if (token == undefined) {
      return next();
    } else {
      verifyToken(token).then((data)=> {
        req.data = data;
        return next();
      }).catch((error)=>{
        logger.error(error);
        return next();
      })
    }
  });

  // verify token expires
  app.use(expressjwt({
    secret: SIGNKEY,
    algorithms: ["HS256"],
  }).unless({
    // Specify which routes need not be verified. In addition to login, other URLs need to be verified
    path: ['/login']
  }));

  // When token fails, return 401 error
  app.use(function(err, req, res, next) {
    if (err) {
      logger.error(err);
      if (err.status == 401) {
        return res.status(401).send('token is ivalid');
      }
    }
  });

  // handle browser cross origin
  app.all("*", function (req, res, next) {
    // cross origin
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Headers", "content-type,Authorization");
    if (req.method == 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  app.get('/ping/', (req, res) => {
    res.send("pong");
  });

  app.get('/', function(req, res) {
    res.send('Hello GET');
  });

  app.post('/', function(req, res) {
    res.send('Hello POST');
  });

  app.post('/login', function(req, res) {
    const { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE email=? and password=?`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err); 
        res.status(400).send({'error_massage': err});
        return;
      }
      if (results.length === 0) {
        res.status(400).send({'error_massage': 'Email or password is not correct'});
        return;
      }
      setToken(email).then((data) => {
        res.status(200).json({ token: data });
        return;
      });
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

  app.delete('/user', function(req, res) {
    let email = req.query.email;
    let sql = `DELETE FROM user WHERE email=?`;
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

  app.post('/user-password', function(req, res) {
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

  app.post('/user-avatar', function(req, res) {
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

  // 现在关键问题是，服务器中如何存储小说字段？整篇小说一起存储成一个字段，还是小说分页存储到不同的数据库表中

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

  // 根据字段搜索文件
  // select * from account where name ilike '%mike%';

  var server = app.listen(8081, function () {   
    var port = server.address().port;
    logger.info("Server is running on port:", port);
  });
}

module.exports = httpServer;
