const express = require('express');
const { expressjwt } = require("express-jwt");
const logger = require('./logger');
const DBHelper = require('./utils/db-helper');
const { setToken, verifyToken } = require('./utils/token');
const { SIGNKEY } = require('./utils/constants');

function httpServer () {
  const app = express();

  // handle POST request
  app.use(express.urlencoded());
  app.use(express.json());

  // verify token
  app.use(function (req, res, next) {
    const token = req.headers.authorization;
    if (token === undefined) {
      return next();
    } else {
      verifyToken(token).then((data) => {
        req.data = data;
        return next();
      }).catch((error) => {
        logger.error(error);
        return next();
      });
    }
  });

  // verify token expires
  app.use(expressjwt({
    secret: SIGNKEY,
    algorithms: ["HS256"]
  }).unless({
    // Specify which routes need not be verified. In addition to login, other URLs need to be verified
    path: ['/login']
  }));

  // When token fails, return 401 error
  app.use(function (err, req, res, next) {
    if (err) {
      logger.info(err);
      if (err.status === 401) {
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
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  app.get('/ping/', (req, res) => {
    res.send("pong");
  });

  app.get('/', function (req, res) {
    res.send('Hello GET');
  });

  app.post('/', function (req, res) {
    res.send('Hello POST');
  });

  app.post('/login', function (req, res) {
    const { email, password } = req.body;
    const sql = `SELECT * FROM user WHERE email=? and password=?`;
    DBHelper(sql, (err, results) => {
      if (err) {
        // database error, maybe not connect db
        if (err.sqlMessage) {
          logger.error(err.sqlMessage);
          res.status(500).send({ error_massage: err.sqlMessage });
          return;
        }
        logger.error(err);
        res.status(500).send({ error_massage: err });
        return;
      }
      if (results.length === 0) {
        res.status(400).send({ error_massage: 'Email or password is not correct' });
        return;
      }
      setToken(email).then((data) => {
        res.status(200).json({ token: data });
      });
    }, [email, password]);
  });

  // 通过 列出全部的用户信息
  app.get('/users', function (req, res) {
    // 需要验证当前管理员权限
    // TODO 这里应该不能返回密码
    const sql = `SELECT * FROM user order by id asc`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        res.status(400).send({ error_massage: err });
        return;
      }
      res.status(200).send(results);
    });
  });

  // 通过 获取指定用户信息
  // TODO 这里应该不能返回密码
  app.get('/user', function (req, res) {
    const email = req.query.email;
    const sql = `SELECT * FROM user WHERE email=?`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        res.status(400).send({ error_massage: err });
        return;
      }
      res.status(200).send(results);
    }, [email]);
  });

  // 通过 增加用户
  app.post('/user', function (req, res) {
    const { email, name, password } = req.body;
    // 验证用户信息
    if (!email || !name || !password) {
      res.status(400).send({ error_massage: '邮箱或用户名或密码为空' });
      return;
    }
    if (password.length < 6) {
      res.status(400).send({ error_massage: '密码长度太短' });
      return;
    }
    let sql = `SELECT * FROM user WHERE email=?`;
    DBHelper(sql, (err, results) => {
      // 执行出错
      if (err) {
        logger.error(err);
        res.status(500).send({ error_massage: '服务器内部错误' });
        return;
      }
      // 数据库中已经有这个数据了
      if (results.length > 0) {
        res.status(400).send({ error_massage: '这个邮箱已经被使用过了' });
        return;
      }
      // 数据库中没有这个邮箱，将新数据插入到数据库中
      sql = `insert into user (name, email, password, avatar) values(?, ?, ?, ?)`;
      DBHelper(sql, (err, results) => {
        if (err) {
          logger.error(err);
          res.status(400).send({ error_massage: err });
          return;
        }
        res.status(200).send('success');
      }, [name, email, password, 'https://www.baidu.com/img/flexible/logo/pc/result@2.png']);
    }, [email]);
  });

  app.delete('/user', function (req, res) {
    const email = req.query.email;
    const sql = `DELETE FROM user WHERE email=?`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        res.status(400).send({ error_massage: err });
        return;
      }
      logger.info(results);
      res.status(200).send('success');
    }, [email]);
  });

  app.post('/user-password', function (req, res) {
    const { email, password } = req.body;
    const sql = `update user set password = ? where email = ?`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        res.status(400).send({ error_massage: err });
        return;
      }
      res.status(200).send('success');
    }, [password, email]);
  });

  app.post('/user-avatar', function (req, res) {
    const { email, avatar } = req.body;
    const sql = `update user set avatar = ? where email = ?`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        res.status(400).send({ error_massage: err });
        return;
      }
      res.status(200).send('success');
    }, [avatar, email]);
  });

  app.post('/api/v1/novel', function (req, res) {
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
    const sql = `insert into book (name, cover_photo, author, detail, price, brief) values(?, ?, ?, ?, ?, ?)`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        res.status(400).send({ error_massage: err });
        return;
      }
      res.status(200).send('success');
    }, [name, cover_photo, author, detail, price, brief]);
  });

  // 删除书籍
  app.delete('/api/v1/novel', function (req, res) {
    const id = req.query.id;
    const sql = `DELETE FROM book WHERE id=?`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        res.status(400).send({ error_massage: err });
        return;
      }
      logger.info(results);
      res.status(200).send('success');
    }, [id]);
  });

  // 首页展示小说列表（前10个）
  app.get('/api/v1/novel_list', function (req, res) {
    const sql = `SELECT id, name, cover_photo, author, brief, price FROM book limit 10`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        res.status(400).send({ error_massage: err });
        return;
      }
      res.status(200).send(results);
    }, []);
  });

  // 搜索小说（返回满足条件的前10个）
  app.post('/api/v1/search-novel', function (req, res) {
    const { name, author, price } = req.body;
    if (!name && !author && !price) {
      res.status(400).send({ error_massage: 'query parameters is null' });
    }
    let sql = `SELECT id, name, author, price, brief, cover_photo FROM book WHERE `;
    const params = [];
    const sql_list = [];
    if (name) {
      sql_list.push(' name LIKE ? ');
      params.push(`%${name}%`);
    }
    if (author) {
      sql_list.push(' author LIKE ? ');
      params.push(`%${author}%`);
    }
    if (price) {
      sql_list.push(' price=? ');
      params.push(price);
    }
    sql += sql_list.join('and');
    sql += ' limit 10';
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        res.status(400).send({ error_massage: err });
        return;
      }
      res.status(200).send(results);
    }, params);
  });

  // 获取小说全文详情
  app.get('/api/v1/search-novel', function (req, res) {
    const id = req.query.id;
    const sql = `SELECT * from book WHERE id=?`;
    // todo: 每次下载一次，数据库记录下载的次数（下载热榜），也便于进行热点监控和预警
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err);
        res.status(400).send({ error_massage: err });
        return;
      }
      res.status(200).send(results);
    }, [id]);
  });

  const server = app.listen(8081, function () {
    const port = server.address().port;
    logger.info("Server is running on port:", port);
  });
}

module.exports = httpServer;
