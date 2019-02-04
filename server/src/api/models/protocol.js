const mongoose = require ('mongoose');
const protocolSchema = mongoose.Schema({
    number    : { type: String },
    date      : { type: String },
    material  : { type: String },
    deviceType: { type: String },
    department: { type: String }
});

module.exports = mongoose.model('Protocol', protocolSchema);