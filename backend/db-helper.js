var mysql = require('mysql');
var CONFIG = require('./config/config.json');

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
