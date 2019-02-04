const Form    = require('../models/safetyForm');

exports.forms_get_all = (req, res, next) => {
  
  let filter = req.query;
  let selectedDateFrom;
  let selectedDateTo;

  if (filter.selectedDateFrom) {
      selectedDateFrom = new Date(filter.selectedDateFrom); 
  } else {
      selectedDateFrom = new Date(3600 * 24 * 1000);
  }

  if (filter.selectedDateTo) {
     selectedDateTo = new Date(filter.selectedDateTo); 
  } else {
     selectedDateTo = new Date(); 
  }

  const filterObject = Object.keys(filter).reduce((acc, key) => {
    const _acc = acc;
    if ((filter[key] !== '') && (key !== 'selectedDateFrom') && (key !== 'selectedDateTo') && (key !== 'pageNumber') ) {
      _acc[key] = filter[key]; 
    }
    return _acc;
    }, {})

  

  Form.find({$and: [{date: {$gte: selectedDateFrom}}, {date: {$lte: selectedDateTo}}, filterObject]})
      .sort({date: -1})
      .skip((filter.pageNumber -1) * 10)
      .limit(10)
      .exec()
      .then(results => {
        let o = {results:results}
        return o;
      })
      .then((o)=>{
          Form.count({$and: [{date: {$gte: selectedDateFrom}}, {date: {$lte: selectedDateTo}}, filterObject]})
          .exec()
          .then(quantity=>{
            o.quantity = quantity
              if (o.results.length >= 0) {
                o.newToken = req.userToken;
                res.status(200).json(o);
              } else {
                res.status(404).json({
                  message: 'No entries found'
                }); 
              } 
          });
      })
      .catch(err => {
          next(err)
      });  
}

exports.forms_create = (req, res, next) => {
  const safetyForm = req.body.SafetyForm;
  const form = new Form({
      creator               : safetyForm.Creator,
      date                  : safetyForm.Date,
      prepared              : safetyForm.Prepared,
      revisionDate          : safetyForm.RevisionDate,
      psd_Description       : safetyForm.PSD_Description,
      purpose               : safetyForm.Purpose,
      hazard                : safetyForm.Hazard,
      hazardRaiting         : safetyForm.HazardRaiting,
      protectiveAction      : safetyForm.ProtectiveAction,
      PSD_TAG               : safetyForm.PSD_TAG,
      fieldTAG              : safetyForm.FieldTAG,
      department            : safetyForm.Department,
      nameplate             : safetyForm.Nameplate,
      flowSheet             : safetyForm.FlowSheet,
      installationPlace     : safetyForm.InstallationPlace,
      settingSizePSData     : safetyForm.SettingSizePSData,
      comments              : safetyForm.Comments, 
      skillLevel            : safetyForm.SkillLevel,
      frequencyOfInspection : safetyForm.FrequencyOfInspection,
      inOperationShutdown   : safetyForm.InOperationShutdown,
      duration              : safetyForm.Duration,
      typeInspection        : safetyForm.TypeInspection,
      numberPeople          : safetyForm.NumberPeople,
      toolsMaterials        : safetyForm.ToolsMaterials,
      precautions           : safetyForm.Precautions,
      questions             : safetyForm.Questions,
      protocolNumber        : safetyForm.ProtocolNumber,
      protocolDate          : safetyForm.ProtocolDate,
      importantText         : safetyForm.ImportantText,
      notes                 : safetyForm.notes,
      inspector             : safetyForm.Inspector,
      result                : safetyForm.Result,
      methodInspection      : safetyForm.MethodInspection
  });
  form.save()
            .then(result => {
              res.status(201).json({
                  message: 'safety form was created',
                  createdForm : result,
                  newToken : req.userToken  
              });
            })
            .catch(err => {
                next(err)
            })  
}
exports.forms_delete = (req, res, next) => {
  const id = req.params.id;
  Form.remove({_id: id})
      .exec()
      .then( result => {
          result.newToken = req.userToken 
          res.status(200).json(result);
      })
      .catch( err => {
          // console.log(err);
          // res.status(500).json({
          //     error: err
          // })
          next(err);
      })
}