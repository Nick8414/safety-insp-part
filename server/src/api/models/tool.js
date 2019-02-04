const mongoose = require('mongoose');

toolSchema = mongoose.Schema({
    toolName : { type: String, required: true }
});

module.exports = mongoose.model('Tool', toolSchema);