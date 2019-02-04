const mongoose = require('mongoose');

const actionSchema   = mongoose.Schema({
    createdDate      : { type: Date },
    psd_TAG          : { type: String },
    fieldTAG         : { type: String },
    PSD_Type         : { type: String },
    department       : { type: String },
    productionArea   : { type: String },
    installationPlace: { type: String },
    description      : { type: String },
    responsiblePerson: { type: String },
    assignedTo       : { type: String },
    priority         : { type: String },
    complete         : { type: String },
    startDate        : { type: String },
    endDate          : { type: String },
    planingEndDate   : { type: String },
    status           : { type: String },
    notes            : { type: String },
    isDDSsend        : { type: Boolean }   
})

module.exports = mongoose.model( 'Action', actionSchema )