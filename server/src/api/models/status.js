const mongoose = require('mongoose');

const statusSchema = mongoose.Schema({
    statusName : { type: String, required: true }
});

module.exports = mongoose.model('Status', statusSchema);