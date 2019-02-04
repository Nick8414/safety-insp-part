const winston = require('winston');
require('winston-mongodb');

var options = {
  mongoLog: {
    db : 'mongodb://143.22.3.35/SafetySystem',
    collection : 'logs',
    level : 'info',
    capped : true,
    tryReconnect: true,
    humanReadableUnhandledException: true
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: winston.format.simple()
   
  },
};

winston.loggers.add('mongoLog', {
  transports: [
    new (winston.transports.Console)(options.console),
    new (winston.transports.MongoDB)(options.mongoLog)
  ],
  exitOnError: false
});

const logger = winston.loggers.get('mongoLog');
// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
}
  
 
module.exports = logger;