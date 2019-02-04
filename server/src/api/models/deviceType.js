const mongoose = require('mongoose')

const deviceTypeSchema = mongoose.Schema({
    _id                   : mongoose.Schema.Types.ObjectId,
    title                 : { type: String, required: true, unique: true },
    frequencyOfInspection : { type: Number, default:0 },
    purpose               : { type: String },
    toolsMaterials        : { type: Array },
    precautions           : { type: Array },
    questions             : [{ questionName: { type: String },
                               status      : { type: Boolean },
                               items       : [{
                                               subItemName: { type: String },   
                                               additionalSubItem:[{ 
                                                                   additionalSubItemName: { type: String },
                                                                   type: { type: String },
                                                                   value: { type: String } 
                                                                 }]
                                             }],
                            }],
    procedure             : { type: Array },
    prepared              : { type: String },
    revisionDate          : { type: String },
    importantText         : { type: String }
})

module.exports = mongoose.model('DeviceType', deviceTypeSchema);


