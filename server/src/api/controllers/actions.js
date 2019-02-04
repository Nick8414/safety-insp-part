const Action = require('../models/action')

exports.actions_get_all = (req, res, next) =>{
  let filter = req.query;
  let selectedDateFrom;
  let selectedDateTo;

  if (filter.createdDate) {
      selectedDateFrom = new Date(filter.createdDate[0]); 
  } else {
      selectedDateFrom = new Date(3600 * 24 * 1000);
  }

  if (filter.createdDate) {
     selectedDateTo = new Date(filter.createdDate[1]); 
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

  Action.find({$and: [{createdDate: {$gte: selectedDateFrom}}, {createdDate: {$lte: selectedDateTo}},filterObject]})
  .sort({createdDate: -1})
  .skip((filter.pageNumber -1) * 10)
  .limit(10)
  .exec()
  .then(results => {
          let o = {results:results}
          return o   
  })
  .then( (o) => {
    Action.count(filterObject)
    .exec()
    .then(quantity => {
      o.quantity = quantity;
      o.newToken = req.userToken;
      if ( o.results.length >= 0 ) {
          res.status(200).json(o);
      } else {
          res.status(404).json({
              message: 'No entries found'
          }); 
      }
    })
  })
  .catch(error => {
      next(error)
  })
}

exports.actions_create = (req, res, next) => {
  console.log(req);
  const action = new Action({
     
    createdDate      : new Date(req.body.createdDate),
    psd_TAG          : req.body.psd_TAG,
    fieldTAG         : req.body.fieldTAG,
    PSD_Type         : req.body.PSD_Type,
    department       : req.body.department,
    productionArea   : req.body.productionArea,
    installationPlace: req.body.installationPlace,
    description      : req.body.description,
    responsiblePerson: req.body.responsiblePerson,
    assignedTo       : req.body.assignedTo,
    priority         : req.body.priority,
    complete         : req.body.complete,
    startDate        : req.body.startDate,
    endDate          : req.body.endDate,
    planingEndDate   : req.body.planingEndDate,
    status           : req.body.status,
    notes            : req.body.notes
  });
  action.save()
    .then(result => {
      res.status(201).json({
          message: 'action was created',
          createdAction : result,
          newToken : req.userToken 
      });
    })
    .catch(err => {
      next(err)
    })  
}

exports.actions_update = (req, res, next) => {
  console.log(req.body);
  const action = req.body;

  let objForUpdate = {};
  for (let key in action) {
     if(action.hasOwnProperty(key) && ( key != '_id' ) ){
      objForUpdate[key] = action[key];
    }
  }

  Action.findByIdAndUpdate({_id: action._id}, { $set: objForUpdate }, {new: true})
      .exec()
      .then(result => {
          console.log(result);
          let o = { action:result, newToken:req.userToken }
          res.status(200).json(o)
      })
      .catch(err => {
        next(err);
      })
}

exports.actions_close = (req, res, next) => {
  const action = req.body;
  let objForUpdate = {};
  for (let key in action) {
    if(action.hasOwnProperty(key) && ( key != '_id' ) ){
      objForUpdate[key] = action[key];
    }
  }
  Action.update({psd_TAG: action.psd_TAG}, { $set: objForUpdate }, {multi: true, new: true})
    .exec()
    .then(result => {
      //  result.newToken = req.userToken 
        res.status(200).json({
            result
        })
    })
    .catch(err => {
        // console.log(err.message);
        // res.status(500).json({
        //     error: err
        // })
        next(err);
    })
}

exports.actions_delete = (req, res, next) => {
  console.log( req.params);
  const id = req.params.id;
  console.log(id);
  Action.remove({_id: id})
    .exec()
    .then( result => {
        result.newToken = req.userToken; 
        res.status(200).json(result);
    })
    .catch( err => {
      next(err);
    })
}