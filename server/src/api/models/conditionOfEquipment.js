const mongoose = require('mongoose');

const conditionOfEquipmentSchema = mongoose.Schema({
    conditionOfEquipmentName : { type: String, required: true }
});

module.exports = mongoose.model('ConditionOfEquipment', conditionOfEquipmentSchema);