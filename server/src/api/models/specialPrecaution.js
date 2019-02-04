const mongoose = require('mongoose');

precautionSchema = mongoose.Schema({
    precautionName : { type: String, required: true }
});

module.exports = mongoose.model('Precaution', precautionSchema);