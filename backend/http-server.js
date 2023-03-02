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

  app.post('/api/v1/novel', function(req, res) {
    let { name, cover_photo, author, detail, price, brief } = req.body;
    if (!cover_photo) {
      // use default book image
      cover_photo = 'https://www.baidu.com/img/flexible/logo/pc/result@2.png';
    }
    if (!author) {
      author = '佚名';
    }
    if (!price) {
      price = 0;
    }
    if (!brief) {
      brief = detail.slice(0, 300);
    }
    let sql = `insert into book (name, cover_photo, author, detail, price, brief) values(?, ?, ?, ?, ?, ?)`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err); 
        res.status(400).send({'error_massage': err});
        return;
      }
      res.status(200).send('success');
      return;
    }, [name, cover_photo, author, detail, price, brief]);
  });

  // 删除书籍
  app.delete('/api/v1/novel', function(req, res) {
    let id = req.query.id;
    let sql = `DELETE FROM book WHERE id=?`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err); 
        res.status(400).send({'error_massage': err});
        return;
      }
      logger.info(results);
      res.status(200).send('success');
      return;
    }, [id]);
  });

  // 查询全部的小说列表（性能）应该获取前12个
  app.get('/api/v1/novel_list', function(req, res) {
    let sql = `SELECT id, name, cover_photo, author, brief, price FROM book`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err); 
        res.status(400).send({'error_massage': err});
        return;
      }
      res.status(200).send(results);
      return;
    }, []);
  });

  // 根据字段查询某个名称，标签，作者
  // 目前是精确查询，未来支持模糊查询
  // select * from book where name ilike '%mike%';
  app.post('/api/v1/novel', function(req, res) {
    let { name, author, price } = req.body;
    // 至少有一项，否则返回错误
    if (!name && !author && !price) {
      res.status(400).send({'error_massage': 'query parameters is null'});
    }
    let sql = `SELECT name, author, price, brief FROM book WHERE `;
    let params = [];
    let sql_list = [];
    if (name) {
      sql_list.push(' name=? ');
      params.push(name);
    }
    if (author) {
      sql_list.push(' author=? ');
      params.push(author);
    }
    if (price) {
      sql_list.push(' price=? ');
      params.push(price);
    }
    sql += sql_list.join('and');
    logger.info(297, sql, params);

    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err); 
        res.status(400).send({'error_massage': err});
        return;
      }
      logger.info(results);
      res.status(200).send('success');
      return;
    }, params);
  });

  // 获取某个小说的全文详情
  app.get('/api/v1/novel', function(req, res) {
    let id = req.query.id;
    let sql = `SELECT * from book WHERE id=?`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err); 
        res.status(400).send({'error_massage': err});
        return;
      }
      logger.info(results);
      res.status(200).send('success');
      return;
    }, [id]);
  });

  var server = app.listen(8081, function () {   
    var port = server.address().port;
    logger.info("Server is running on port:", port);
  });
}

module.exports = httpServer;
