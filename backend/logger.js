const { configure, getLogger } = require('log4js');

configure({
  appenders: {
    logger: {
      type: 'dateFile',
      filename: './novel-server.log',
      pattern: "yyyy-MM-dd",
      keepFileExt: true,
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %f{1}[%l] - %m'
      }
    }
  },
  categories: {
    default: {
      appenders: ['logger'],
      level: 'info',
      enableCallStack: true
    }
  }
});

const logger = getLogger('novel-server');

module.exports = logger;
