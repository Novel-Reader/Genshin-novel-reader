var express = require('express');
var logger = require('./logger');
var DBHelper = require('./db-helper');

function httpServer() {

  var app = express();

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

  app.get('/ping/', (req, res) => {
    res.send("pong");
  });

  app.get('/', function(req, res) {
    res.send('Hello GET');
  });

  app.post('/', function(req, res) {
    res.send('Hello POST');
  });

  // not support yet
  app.get('/users', function(req, res) {
    res.send('user list page');
  })

  app.get('/user', function(req, res) {
    res.send(new Promise((resolve, reject) => {
      try {
        var username = 'Tom';
        var sql = `SELECT * FROM user WHERE name='${username}'`;
        DBHelper(sql, (err, results) => {
          if (err) {
            logger.error(err); 
            reject(err);
            return;
          }
          logger.info(results);
          var operation = results.length > 0 ? results[0] : null;
          // TODO
          res.status(200).send('');
          resolve(operation);
        });
      } catch (error) {
        logger.error(error);
        res.status(500).send('Interal server error');
        return;
      }
    }));
  })

  app.post('/user', function(req, res) {
    res.send('return created user info');
  })

  app.delete('/user', function(req, res) {
    res.send('return success or error');
  })

  // const PORT = process.env.PORT || 8081;
  var server = app.listen(8081, function () {   
    var host = server.address().address  
    var port = server.address().port;
    logger.info('Starting server process: ', process.pid);
    logger.info("Server is running on port: ", host, port)
  });
}

module.exports = httpServer;
