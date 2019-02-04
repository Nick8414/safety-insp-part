const InspectionMethod = require('../models/inspectionMethod');

exports.inspectionMethods_get_all = (req, res, next) => {
  InspectionMethod.find({})
      .exec()
      .then(results => {
        //  console.log('From database', results);
          if (results.length >= 0) {
            //  results.newToken = req.userToken;
              res.status(200).json(results);
          } else {
              res.status(404).json({
                  message: 'No entries found'
              }); 
          }   
      })
      .catch(err => {
        //  console.log(err);
          next(err)
      });  
}

exports.inspectionMethods_create = (req, res, next) => {
  const inspectionMethod = new InspectionMethod({
      inspectionMethodName: req.body.inspectionMethodName
  });
  inspectionMethod.save()
            .then(result => {
            //    result.newToken = req.userToken;
              res.status(201).json({
                  message: 'inspection Method was created',
                  createdInspectionMethod : result 
              });
            })
            .catch(err => {
                next(err)

            })  
}

exports.inspectionMethods_update = (req, res, next) => {
  const id = req.body.id;
  const inspectionMethodName = req.body.inspectionMethodName;
  InspectionMethod.findByIdAndUpdate({_id: id}, { $set: {inspectionMethodName:inspectionMethodName} }, {new: true})
      .exec()
      .then(result => {
        //  result.newToken = req.userToken;
          res.status(200).json({
              result
          })
      })
      .catch(err => {
         
          next(err)
      })
}

exports.inspectionMethods_delete = (req, res, next) => {
  const id = req.params.id;
  InspectionMethod.remove({_id: id})
      .exec()
      .then( result => {
        //  result.newToken = req.userToken;
          res.status(200).json(result);
      })
      .catch( err => {
          
          next(err);
      })
}