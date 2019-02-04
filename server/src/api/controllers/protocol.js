const Protocol = require('../models/protocol');

exports.protocols_get_all = (req, res, next) => {
  let query = {}

  if (Object.keys(req.query).length == 0) {
       query = {}
  } else {
       query = { $and: [ { department:req.query.department }, { deviceType:req.query.deviceType }, { material:req.query.material } ] }
  }
  Protocol.find(query)
      .exec()
      .then(results => {
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

exports.protocols_create = (req, res, next) => {
  const protocol = new Protocol({
      number    : req.body.number,
      date      : req.body.date,
      material  : req.body.material,
      deviceType: req.body.deviceType,
      department: req.body.department
  });
  protocol.save()
    .then(result => {
      res.status(201).json({
          message: 'department was created',
          createdProtocol : result,
          newToken : req.userToken 
      });
    })
    .catch(err => {
        next(err)
    })  
}

exports.protocols_update = (req, res, next) => {
  const protocol = req.body;
  let objForUpdate = {};
  for (let key in protocol) {
     if(protocol.hasOwnProperty(key) && ( key != '_id' ) ){
      objForUpdate[key] = protocol[key];
    }
  }

  Protocol.findByIdAndUpdate({_id: protocol._id}, { $set: objForUpdate }, {new: true})
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

exports.protocols_delete = (req, res, next) => {
  const id = req.params.id;
  Protocol.remove({_id: id})
      .exec()
      .then( result => {
        //  result.newToken = req.userToken;
          res.status(200).json(result);
      })
      .catch( err => {
  
          next(err);
      })
}