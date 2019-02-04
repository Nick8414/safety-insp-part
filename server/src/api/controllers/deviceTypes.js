const DeviceType = require('../models/deviceType');
const mongoose = require('mongoose');

exports.deviceTypes_get_all = (req, res, next) => {
  DeviceType.find()
  .exec()
  .then(docs => {
     // docs.newToken = req.userToken;
    res.status(200).json(docs);
  })
  .catch(err => {
    next(err);
  });
}

exports.deviceTypes_create = (req, res, next) => {
  console.log(req.body);
  const Type = DeviceType({
    _id                  : mongoose.Types.ObjectId(),
    title                : req.body.typeTitle,
    frequencyOfInspection: req.body.frequency,
    purpose              : req.body.purpose,
    toolsMaterials       : req.body.toolsMaterials,
    precautions          : req.body.precautions,
    questions            : req.body.questions,
    prepared             : req.body.prepared,
    revisionDate         : req.body.revisionDate,
    importantText        : req.body.importantText 
  });
  Type
    .save()
    .then(result => {
        res.status(201).json({
          message:'Type was created',
          type:Type,
          //  newToken : req.userToken
        })
    })
    .catch(err => {
      next(err);
    });
}

exports.deviceTypes_update = (req, res, next) => {
  let o = req.body;
  let objForUpdate = {};
  for (let key in req.body) {
    if(req.body.hasOwnProperty(key) && key != 'id' ) {
      objForUpdate[key] = req.body[key];
    }
  }
  DeviceType.findByIdAndUpdate(req.body._id, { $set: objForUpdate }, { new: true })
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      next(err)
    })
}

exports.deviceTypes_delete = (req, res, next) => {
  const id = req.params.safetyDeviceId;
  DeviceType.findByIdAndRemove(id)
      .exec()
      .then( result => {
        res.status(200).json(result);
      })
      .catch( err => {
        next(err);
      })
}