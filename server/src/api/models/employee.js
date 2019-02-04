const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    login   : {type: String},
    fullName: {type: String},
    email   : {type: String}
}) 

module.exports = mongoose.model('Employee', employeeSchema);
