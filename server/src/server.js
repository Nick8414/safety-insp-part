const http   = require('http');
const app    = require('./app');
const config = require('../../config.json');
const logger = require('../src/api/log/logger');
const mongoose = require('mongoose');

const port   = process.env.PORT || config.port;

const server = http.createServer(app);

 // If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  logger.info('Application terminate');
  mongoose.connection.close(function () {
   // logger.info({message: 'Mongoose default connection disconnected through app termination', level: 'info', meta:{isView:false}});
    logger.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

server.listen(port, function(){
  //  logger.info({message: 'server starting on port => ' + port, level:'info', meta:{isView:false}});
    logger.info('server starting on port => ' + port);
});