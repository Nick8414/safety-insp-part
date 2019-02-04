const mongoose = require('mongoose')

const safetyDeviceSchema = mongoose.Schema({
    _id                   : mongoose.Schema.Types.ObjectId,
    psd_TAG               : { type: String, required : true, unique: true },
    fieldTAG              : { type: String },
    flowSheet             : { type: String },
    flowSheetLink         : { type: String },
    PSD_Description       : {type : mongoose.Schema.Types.ObjectId, ref: 'DeviceType'},
    installationPlace     : { type: String },
    responsiblePerson     : { type: String },
    lastInspectionDate    : { type: Date, default : null },
    nextInspectionDate    : { type: Date, default : null },
    hazard                : { type: String },
    otherPropertiesAndData: { type: String },
    safetyIntegretyLevel  : { type: String },
    hazardRaiting         : { type: String },
    protectiveAction      : { type: String },
    department            : { type: String },
    comments              : { type: String },
    settingSizePSData     : { type: String },
    inOperationShutdown   : { type: String },
    typeInspection        : { type: String },
    methodInspection      : { type: String },
    PSI_Status            : { type: String },
    skillLevel            : { type: String },
    duration              : { type: Number },
    numberPeople          : { type: Number },
    notes                 : { type: String },
    procedureLink         : { type: String },
    material              : { type: String },
    isProtocolUse         : { type: Boolean},
    nameplate             : { type: String }
})

module.exports = mongoose.model('SafetyDevice', safetyDeviceSchema);