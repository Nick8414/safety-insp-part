const mongoose = require('mongoose');

safetyFormSchema = mongoose.Schema({
    creator               : { type: String },
    date                  : { type: Date, default: new Date },
    methodInspection      : { type: String },
    psd_Description       : { type: String },
    prepared              : { type: String },
    revisionDate          : { type: String },
    purpose               : { type: String },
    hazard                : { type: Array },
    hazardRaiting         : { type: String },
    protectiveAction      : { type: Array },
    PSD_TAG               : { type: String },
    fieldTAG              : { type: String },
    department            : { type: String },
    nameplate             : { type: String },
    flowSheet             : { type: String },
    installationPlace     : { type: String },
    settingSizePSData     : { type: String },
    comments              : { type: String }, 
    skillLevel            : { type: String },
    frequencyOfInspection : { type: String },
    inOperationShutdown   : { type: String },
    duration              : { type: Number },
    typeInspection        : { type: String },
    numberPeople          : { type: Number },
    toolsMaterials        : { type: Array },
    precautions           : { type: Array },
    questions             : { type: Array },
    protocolNumber        : { type: String },
    protocolDate          : { type: String },  
    importantText         : { type: String },
    notes                 : { type: String },
    inspector             : { type: String },
    result                : { type: Boolean } 
});

module.exports = mongoose.model('SafetyForm', safetyFormSchema);