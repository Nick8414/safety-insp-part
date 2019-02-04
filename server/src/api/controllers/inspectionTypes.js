const InspectionType = require('../models/inspectionType');

exports.inspectionTypes_get_all = (req, res, next) => {
  InspectionType.find({})
    .exec()
    .then(results => {
      //  console.log('From database', results);
        if (results.length >= 0) {
         //   results.newToken = req.userToken;
            res.status(200).json(results);
        } else {
            res.status(404).json({
                message: 'No entries found'
            }); 
        }   
    })
    .catch(err => {
        next(err)
    });  
}

exports.inspectionTypes_create = (req, res, next) => {
  const inspectionType = new InspectionType({
      inspectionTypeName: req.body.inspectionTypeName
  });
  inspectionType.save()
            .then(result => {
            //    result.newToken = req.userToken;
              res.status(201).json({
                  message: 'inspection Type was created',
                  createdInspectionType : result 
              });
            })
            .catch(err => {
                next(err)

            })  
}

exports.inspectionTypes_update = (req, res, next) => {
  const id = req.body.id;
  const inspectionTypeName = req.body.inspectionTypeName;
  InspectionType.findByIdAndUpdate({_id: id}, { $set: {inspectionTypeName:inspectionTypeName} }, {new: true})
      .exec()
      .then(result => {
        //  result.newToken = req.userToken;
          res.status(200).json({
              result
          })
      })
      .catch(err => {
          next(err);
      })
}

exports.inspectionTypes_delete = (req, res, next) => {
  const id = req.params.id;
  InspectionType.remove({_id: id})
      .exec()
      .then( result => {
        //  result.newToken = req.userToken;
          res.status(200).json(result);
      })
      .catch( err => {
          next(err);
      })
}
