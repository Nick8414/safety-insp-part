const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    departmentName       : { type: String, required: true },
    eSystemDepartmentName: { type: String },
    productionAreas      : { type: Array  }
});

module.exports = mongoose.model('Department', departmentSchema);