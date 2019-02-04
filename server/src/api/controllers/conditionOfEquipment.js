const ConditionOfEquipment = require('../models/conditionOfEquipment');

exports.conditionOfEquipment_get_all = (req, res, next) => {
  ConditionOfEquipment.find({})
    .exec()
    .then(results => {
      //  console.log('From database', results);
        if (results.length >= 0) {
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

exports.conditionOfEquipment_create = (req, res, next) => {
  const conditionOfEquipment = new ConditionOfEquipment({
      conditionOfEquipmentName: req.body.conditionOfEquipmentName
  });
  conditionOfEquipment.save()
    .then(result => {
      res.status(201).json({
          message: 'Condition Of Equipment was created',
          createdConditionOfEquipment : result,
         // newToken : req.userToken 
      });
    })
    .catch(err => {
        next(err)
    })  
}

  exports.conditionOfEquipment_update = (req, res, next) => {
    const id = req.body.id;
    const conditionOfEquipmentName = req.body.conditionOfEquipmentName;
    ConditionOfEquipment.findByIdAndUpdate({_id: id}, { $set: {conditionOfEquipmentName:conditionOfEquipmentName} }, {new: true})
        .exec()
        .then(result => {
         //   result.newToken = req.userToken;
            res.status(200).json({
                result
            })
        })
        .catch(err => {
            next(err);
        })
}
    
    exports.conditionOfEquipment_delete = (req, res, next) => {
      const id = req.params.id;
      ConditionOfEquipment.remove({_id: id})
          .exec()
          .then( result => {
           //   result.newToken = req.userToken;
              res.status(200).json(result);
          })
          .catch( err => {
              next(err);
          })
  }