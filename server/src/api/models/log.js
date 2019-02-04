const mongoose = require('mongoose');

const logSchema   = mongoose.Schema({
  level  : { type: String },
  message: { type: String },
  meta   : { type: Object }
})

module.exports = mongoose.model( 'Log', logSchema )