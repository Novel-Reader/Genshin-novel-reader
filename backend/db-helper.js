var mysql = require('mysql');

// 这个项目主要是前端，所以配置先按照本地，写成固定的配置
var CONFIG = {
  host: '127.0.0.1',
  user: 'root',
  password: 'rootroot',
  database: 'novel',
  port: 3306,
};
// 默认手动新建数据库

var mysql_config = {
  host    : CONFIG.host,
  user    : CONFIG.user,
  password: CONFIG.password,
  database: CONFIG.database,
  port    : CONFIG.port,
  charset : "UTF8MB4",
  connectionLimit: CONFIG.connectionLimit || 10,
  timezone: '+00:00'
};

var pool = mysql.createPool(mysql_config);

function DBHelper(sql, callback, add = null) {
  try {
    if (add !== null) {
      pool.query(sql, add, callback);
    } else {
      pool.query(sql, callback);
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = DBHelper;
