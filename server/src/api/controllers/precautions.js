const Precaution = require('../models/specialPrecaution');

exports.precautions_get_all = (req, res, next) => {
  Precaution.find({})
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
exports.precautions_create = (req, res, next) => {
  const precaution = new Precaution({
      precautionName: req.body.precautionName
  });
  precaution.save()
            .then(result => {
              res.status(201).json({
                  message: 'precaution was created',
                  createdPrecaution : result,
               //   newToken : req.userToken
              });
            })
            .catch(err => {
                next(err)

            })  
}
exports.precautions_update = (req, res, next) => {
  const id = req.body.id;
  const precautionName = req.body.precautionName;
  Precaution.findByIdAndUpdate({_id: id}, { $set: {precautionName:precautionName} }, {new: true})
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
exports.precautions_delete = (req, res, next) => {
  const id = req.params.id;
  Precaution.remove({_id: id})
      .exec()
      .then( result => {
        //  result.newToken = req.userToken;
          res.status(200).json(result);
      })
      .catch( err => {
          next(err)
      })
}