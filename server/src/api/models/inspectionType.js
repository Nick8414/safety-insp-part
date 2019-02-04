const mongoose = require('mongoose');

const inspectionTypeSchema = mongoose.Schema({
    inspectionTypeName : { type: String, required: true }
});

module.exports = mongoose.model('InspectionType', inspectionTypeSchema);