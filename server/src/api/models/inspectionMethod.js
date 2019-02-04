const mongoose = require('mongoose');

const inspectionMethodSchema = mongoose.Schema({
    inspectionMethodName : { type: String, required: true }
});

module.exports = mongoose.model('InspectionMethod', inspectionMethodSchema);