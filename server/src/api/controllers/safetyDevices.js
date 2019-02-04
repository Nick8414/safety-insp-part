const SafetyDevice = require('../models/safetyDevice');
const DeviceType = require('../models/deviceType');
const mongoose = require('mongoose');

exports.safetyDevices_get_all = (req, res, next) => {

  let filter = req.query;

  let department = filter.department;
  let dateOfLastInspection = filter.dateOfLastInspection || null;
  let dateOfNextInspection = filter.dateOfNextInspection || null;

  let query = {};

  if ((typeof(department) != "undefined") && (department != 'All | ВСЕ')) {
      query.department = department
  }
  if (dateOfLastInspection) {
      dateOfLastInspectionFrom = {lastInspectionDate: {$gte: new Date(dateOfLastInspection[0])}}; 
  } else {
      dateOfLastInspectionFrom = {}
  }

  if (dateOfLastInspection) {
      dateOfLastInspectionTo = {lastInspectionDate: {$lte: new Date(filter.dateOfLastInspection[1])}}; 
  } else {
      dateOfLastInspectionTo = {}  
  }

  if (dateOfNextInspection) {
      dateOfNextInspectionFrom = {nextInspectionDate: {$gte: new Date(dateOfNextInspection[0])}}; 
  } else {
      dateOfNextInspectionFrom = {}
  }

  if (dateOfNextInspection) {
      dateOfNextInspectionTo = {nextInspectionDate: {$lte: new Date(filter.dateOfNextInspection[1])}}; 
  } else {
      dateOfNextInspectionTo = {}  
  }

  SafetyDevice.find({$and: [ dateOfLastInspectionFrom, dateOfLastInspectionTo, dateOfNextInspectionFrom, dateOfNextInspectionTo, query]})
  .populate('PSD_Description')
  .sort({date: -1})
  //.skip((filter.pageNumber -1) * 10)
 // .limit(10)
  .exec()
  .then(docs => {
      if (docs.length >= 0) {
          let o = {devices:docs, newToken:req.userToken}
        //  docs.newToken = req.userToken;
          res.status(200).json(o);
      } else {
          res.status(404).json({
              message: 'No entries found'
          }); 
      } 
  })
  
  .catch(err => {
      next(err);
  });
 
}

exports.safetyDevices_get_admin_all = (req, res, next) => {
  //   console.log('req.query for admin saf dev');
  //   console.log(req.query);
     let lastDateFrom;
     let lastDateTo;
     let nextDateFrom;
     let nextDateTo;
 
     let filter = req.query;
    // console.log(filter.lastInspectionDate);
 
     if (filter.lastInspectionDate) {
         lastDateFrom = {lastInspectionDate: { $gte: new Date(filter.lastInspectionDate[0])}}; 
     } else {
         lastDateFrom = {};
     }
 
     if (filter.lastInspectionDate) {
        lastDateTo = {lastInspectionDate: { $lte: new Date(filter.lastInspectionDate[1])}}; 
     } else {
        lastDateTo = {}; 
     }
 
     if (filter.nextInspectionDate) {
         nextDateFrom = {nextInspectionDate: { $gte: new Date(filter.nextInspectionDate[0])}}; 
     } else {
         nextDateFrom = {};
     }
 
     if (filter.nextInspectionDate) {
        nextDateTo = {nextInspectionDate: { $lte: new Date(filter.nextInspectionDate[1])}}; 
     } else {
        nextDateTo = {}; 
     }
 
    // console.log(lastDateFrom, lastDateTo)
 
     const filterObject = Object.keys(filter).reduce((acc, key) => {
         const _acc = acc;
         if ((filter[key] !== '') && (key !== 'lastInspectionDate') && (key !== 'nextInspectionDate') && (key !== 'pageNumber') ) {
           _acc[key] = filter[key]; 
         }
         return _acc;
         }, {})
 
       //  console.log('filterObject')
     //console.log(filterObject)    
 
    // SafetyDevice.find({department:req.query.userDepartment})
   //  SafetyDevice.find( {$and: [{lastInspectionDate: { $gte: selectedDateFrom}}, {lastInspectionDate: {$lte: selectedDateTo}},  filterObject]})
     SafetyDevice.find( {$and: [lastDateFrom, lastDateTo, nextDateFrom, nextDateTo, filterObject]})
     .populate('PSD_Description')
     .sort({date: -1})
     .skip((filter.pageNumber -1) * 10)
     .limit(10)
     .exec()
     .then(docs => {
         
         let o = {results : docs}
         return o;
     })
     .then( (o) => {
         SafetyDevice.count(filterObject)
         .exec()
         .then( quantity => {
             o.quantity = quantity
             if (o.results.length >= 0) {
                 o.newToken = req.userToken;
                 res.status(200).json(o);
               } else {
                 res.status(404).json({
                   message: 'No entries found'
                 }); 
               } 
         })
     } )
     .catch(err => {
         next(err);
     });
}

exports.safetyDevices_get_number = (req, res, next) => {

  let filter = req.query;

  const filterObject = Object.keys(filter).reduce((acc, key) => {
      const _acc = acc;
      if ((filter[key] !== '') && (key !== 'lastInspectionDate') && (key !== 'nextInspectionDate') && (key !== 'pageNumber') ) {
        _acc[key] = filter[key]; 
      }
      return _acc;
      }, {})

  SafetyDevice.find(filterObject)
  .exec()
  .then(docs => {
      let numbers = docs.map((doc)=>{
          return doc.psd_TAG
      })
          res.status(200).json(numbers);
  })
  .catch(err => {
      next(err);
  });
 
}

exports.safetyDevices_description = (req, res, next) => {
  let filter = req.query;
  const filterObject = Object.keys(filter).reduce((acc, key) => {
      const _acc = acc;
      if ((filter[key] !== '') && (key !== 'lastInspectionDate') && (key !== 'nextInspectionDate') && (key !== 'pageNumber') ) {
        _acc[key] = filter[key]; 
      }
      return _acc;
      }, {})
     

/**
* SafetyDevice.find( {$and: [lastDateFrom, lastDateTo, nextDateFrom, nextDateTo, filterObject]})
  .populate('PSD_Description')
  .sort({date: -1})
  .skip((filter.pageNumber -1) * 10)
  .limit(10)
  .exec()
* 
*/

SafetyDevice.find(filterObject)
  .populate('PSD_Description')    
  .exec()
  .then(docs => {
      let psdDescriptions = docs.map((doc)=>{
          if (doc.PSD_Description) {
              return {id:doc.PSD_Description._id, title:doc.PSD_Description.title};
          } else {
              return 'not parring to type'
          }    
      })
    //  console.log(numbers);
          res.status(200).json(psdDescriptions);
  })
  .catch(err => {
      next(err);
  });
}

exports.safetyDevices_tag = (req, res, next) => {

  let filter = req.query;
  const filterObject = Object.keys(filter).reduce((acc, key) => {
      const _acc = acc;
      if ((filter[key] !== '') && (key !== 'lastInspectionDate') && (key !== 'nextInspectionDate') && (key !== 'pageNumber') ) {
        _acc[key] = filter[key]; 
      }
      return _acc;
      }, {})
     
  SafetyDevice.find(filterObject)
  .exec()
  .then(docs => {
      //fieldTAG
   //   console.log(docs);
      let fieldTAG = docs.map((doc)=>{
          return doc.fieldTAG
      })
    //  console.log(numbers);
          res.status(200).json(fieldTAG);
  })
  .catch(err => {
      next(err);
  });
}

exports.safetyDevices_flow_sheet = (req, res, next) => {
  let filter = req.query;

  const filterObject = Object.keys(filter).reduce((acc, key) => {
      const _acc = acc;
      if ((filter[key] !== '') && (key !== 'lastInspectionDate') && (key !== 'nextInspectionDate') && (key !== 'pageNumber') ) {
        _acc[key] = filter[key]; 
      }
      return _acc;
      }, {})
  SafetyDevice.find(filterObject)
  .exec()
  .then(docs => {
      //fieldTAG
  //    console.log(docs);
      let flowSheet = docs.map((doc)=>{
          return doc.flowSheet
      })
    //  console.log(numbers);
          res.status(200).json(flowSheet);
  })
  .catch(err => {
      next(err);
  });
}

exports.safetyDevices_installation_place = (req, res, next) => {
  let filter = req.query;


  const filterObject = Object.keys(filter).reduce((acc, key) => {
      const _acc = acc;
      if ((filter[key] !== '') && (key !== 'lastInspectionDate') && (key !== 'nextInspectionDate') && (key !== 'pageNumber') ) {
        _acc[key] = filter[key]; 
      }
      return _acc;
      }, {})
  SafetyDevice.find(filterObject)
  .exec()
  .then(docs => {
      //fieldTAG
     // console.log(docs);
      let installationPlaces = docs.map((doc)=>{
          return doc.installationPlace
      })
          res.status(200).json(installationPlaces);
  })
  .catch(err => {
      next(err);
  });
}

exports.safetyDevices_responsible = (req, res, next) => {
  let filter = req.query;

  const filterObject = Object.keys(filter).reduce((acc, key) => {
      const _acc = acc;
      if ((filter[key] !== '') && (key !== 'lastInspectionDate') && (key !== 'nextInspectionDate') && (key !== 'pageNumber') ) {
        _acc[key] = filter[key]; 
      }
      return _acc;
      }, {})
  SafetyDevice.find(filterObject)
  .exec()
  .then(docs => {
      //fieldTAG
  
      let responsiblePerson = docs.map((doc)=>{
          return doc.responsiblePerson
      })
 
          res.status(200).json(responsiblePerson);
  })
  .catch(err => {
      next(err);
  });
}

exports.safetyDevices_statuses = (req, res, next) => {
  let filter = req.query;


  const filterObject = Object.keys(filter).reduce((acc, key) => {
      const _acc = acc;
      if ((filter[key] !== '') && (key !== 'lastInspectionDate') && (key !== 'nextInspectionDate') && (key !== 'pageNumber') ) {
        _acc[key] = filter[key]; 
      }
      return _acc;
      }, {})
  SafetyDevice.find(filterObject)
  .exec()
  .then(docs => {
      //fieldTAG
   
      let statuses = docs.map((doc)=>{
          return doc.PSI_Status
      })
     
          res.status(200).json(statuses);
  })
  .catch(err => {
      next(err);
  });
}

exports.safetyDevices_filter_departments = (req, res, next) => {
  let filter = req.query;

  const filterObject = Object.keys(filter).reduce((acc, key) => {
      const _acc = acc;
      if ((filter[key] !== '') && (key !== 'lastInspectionDate') && (key !== 'nextInspectionDate') && (key !== 'pageNumber') ) {
        _acc[key] = filter[key]; 
      }
      return _acc;
      }, {})
  SafetyDevice.find(filterObject)
  .exec()
  .then(docs => {
      //fieldTAG
   
      let statuses = docs.map((doc)=>{
          return doc.department
      })
     
        res.status(200).json(statuses);
  })
  .catch(err => {
      next(err);
  });
}

exports.safetyDevices_get_one = (req, res, next) => {
  const id = req.params.safetyDeviceId;
  SafetyDevice.findById(id)
      .exec()
      .then(doc=>{
       //  console.log(doc); 
         if (doc) {
          res.status(200).json(doc);
         } else {
            res.status(404) .json({message: 'No valid entry found for provided ID'})
         }
      })
      .catch(err=>{
          next(err);
      });
    
}

exports.safetyDevices_create = (req, res, next) => {
  // console.log(req.body);
   const safetyDevice = new SafetyDevice({
       _id                   : mongoose.Types.ObjectId(),
       psd_TAG               : req.body.psd_TAG,
       fieldTAG              : req.body.fieldTAG,
       flowSheet             : req.body.flowSheet,
       flowSheetLink         : req.body.flowSheetLink,
       PSD_Description       : req.body.PSD_Description,
       installationPlace     : req.body.installationPlace,
       responsiblePerson     : req.body.responsiblePerson,
       lastInspectionDate    : req.body.lastInspectionDate,
       nextInspectionDate    : req.body.nextInspectionDate,
       hazard                : req.body.hazard,
       hazardRaiting         : req.body.hazardRaiting,
       otherPropertiesAndData: req.body.otherPropertiesAndData,
       safetyIntegretyLevel  : req.body.safetyIntegretyLevel,
       procedureLink         : req.body.procedureLink,
       material              : req.body. material,
       protectiveAction      : req.body.protectiveAction,
       department            : req.body.department,
       comments              : req.body.comments,
       settingSizePSData     : req.body.settingSizePSData,
       inOperationShutdown   : req.body.inOperationShutdown,
       typeInspection        : req.body.typeInspection,
       methodInspection      : req.body.methodInspection,
       PSI_Status            : req.body.PSI_Status,
       skillLevel            : req.body.skillLevel ,
       duration              : req.body.duration,
       numberPeople          : req.body.numberPeople,
       notes                 : req.body.notes,
       isProtocolUse         : req.body.isProtocolUse,
       nameplate             : req.body.nameplate   
   });
   safetyDevice
       .save()
       .then(result => {
           return  SafetyDevice.findById(result._id).populate('PSD_Description').exec()
       })
       .then(result => {
           res.status(201).json({
               message:'safety device was created',
               createdDevice:result,
               newToken : req.userToken
           })
       })
       .catch(err => {
           next(err);
       });
}

exports.safetyDevices_update = (req, res, next) => {
  let editedDevice = req.body.item;
  let objForUpdate = {};
  let Device = {};
//  console.log(editedDevice);
  for (let key in editedDevice) {
     if(editedDevice.hasOwnProperty(key) && ( key != '_id' )){
      objForUpdate[key] = editedDevice[key];
    }
  }
  SafetyDevice.findByIdAndUpdate(editedDevice._id, { $set: objForUpdate}, { new: true })
      .exec()
      .then(result => {
         return result;
      })
      .then( device => {
          Device = device;
       return   DeviceType.findById(device.PSD_Description).exec()
      })
      .then( type => {
              Device.PSD_Description = type;
              let o = {device : Device, newToken: req.userToken};
              res.status(200).json(o)
      })
      .catch(err => {
        //  console.log(err);
         next (err);
      })
}

exports.safetyDevices_delete = (req, res, next) => {
  const id = req.params.safetyDeviceId;
  SafetyDevice.remove({_id: id})
      .exec()
      .then( result => {
        //  result.newToken = req.userToken;
          let o = {result, newToken: req.userToken}
          res.status(200).json(o);
      })
      .catch( err => {
          // console.log(err);
          // res.status(500).json({
          //     error: err
          // })
          next(err);
      })
  // res.status(200).json({
  //     messgae:'device was removed'
  // })
}