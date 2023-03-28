const mysql = require('mysql');
const CONFIG = require('../config/config.json');
const logger = require('../logger');

const mysql_config = {
  host: CONFIG.host,
  user: CONFIG.user,
  password: CONFIG.password,
  database: CONFIG.database,
  port: CONFIG.port,
  charset: "UTF8MB4",
  connectionLimit: CONFIG.connectionLimit || 10,
  timezone: '+00:00'
};

const pool = mysql.createPool(mysql_config);

function DBHelper (sql, callback, add = null) {
  try {
    if (add !== null) {
      pool.query(sql, add, callback);
    } else {
      pool.query(sql, callback);
    }
  } catch (error) {
    logger.error(error);
  }
}

module.exports = DBHelper;
