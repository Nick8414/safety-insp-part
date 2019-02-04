const mongoose = require('mongoose');
const logger = require('../api/log/logger');

function connection(dbURI) {
  mongoose.Promise = global.Promise;

  mongoose.connection.on('connected', function(){
    logger.info({message: "Mongoose connected to " + dbURI, level: 'info', meta:{isView:false}} );
    logger.info({message: 'Mongoose default connection disconnected through app termination', level: 'info', meta:{isView:false}});
  });

  // Listen For Mongoose Connection Error
  mongoose.connection.on("error", function (err) { 
    logger.error( {message: 'Failed to Connect MongoDB with error ' + err, level:'error', meta:{isView:false}}); 
    mongoose.disconnect();
  });

  mongoose.connection.once('open', function() {
    logger.info({message: "Mongoose connection open to " + dbURI, level: 'info', meta:{isView:false}});
  });

  mongoose.connection.on('reconnected', function () {
    logger.info({message: "Mongoose reconnected to " + dbURI, level: 'info', meta:{isView:false}});
  });

  // Listen For Mongoose Disconnection
  mongoose.connection.on('disconnected', function() {
    logger.warn({message: 'Mongoose Disconnected ' + dbURI, level: 'info', meta:{isView:false}});
    // mongoose.connect(dbURI, {server:{auto_reconnect:true, socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 }}, replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } }});
    mongoose.connect(dbURI);
  });

  mongoose.connect(dbURI);

}

module.exports = connection