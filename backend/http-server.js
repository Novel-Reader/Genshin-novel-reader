var express = require('express');
var logger = require('./logger');
var DBHelper = require('./db-helper');

function httpServer() {

  var app = express();

  // 处理跨域
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

  // 测试网络
  app.get('/ping/', (req, res) => {
    res.send("pong");
  });

  app.get('/', function(req, res) {
    res.send('Hello GET');
  });

  app.post('/', function(req, res) {
    res.send('Hello POST');
  });

  // 用户API
  // 列出全部的用户
  app.get('/users', function(req, res) {
    // test no permission
    let a = 10;
    if (a === 10) {
      res.status(403).send({'error_massage': '没有权限测试'});
      return;
    }
  });

  // 获取指定用户信息
  app.get('/user', function(req, res) {
    var username = 'Tom';
    var sql = `SELECT * FROM user WHERE name='${username}'`;
    DBHelper(sql, (err, results) => {
      if (err) {
        logger.error(err); 
        reject(err);
        return;
      }
      res.status(200).send(results[0]);
      return;
    });
  });

  // 增加用户
  app.post('/user', function(req, res) {
    res.send('return created user info');
  })

  // 删除用户
  app.delete('/user', function(req, res) {
    res.send('return success or error');
  })

  // 文件 API
  // 获取全部的文件列表
  app.get('/novel-list', (req, res) => {
    res.send('');
  });

  // 获取某个文件的详情
  app.get('/novel', (req, res) => {
    res.send('');
  });

  // 增加文件
  app.post('/novel', (req, res) => {
    res.send('');
  });
  
  // 删除文件
  app.delete('/novel', (req, res) => {
    res.send('');
  });

  // const PORT = process.env.PORT || 8081;
  var server = app.listen(8081, function () {   
    var host = server.address().address  
    var port = server.address().port;
    logger.info('Starting server process: ', process.pid);
    logger.info("Server is running on port: ", host, port)
  });
}

module.exports = httpServer;
