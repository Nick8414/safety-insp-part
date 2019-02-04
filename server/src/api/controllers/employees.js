const Employee = require('../models/employee');

exports.employees_get_all = (req, res, next) => {
  Employee.find({})
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
        next(err)
    });  
}

exports.employees_create = (req, res, next) => {
  const employee = new Employee({
      login   : req.body.login,
      fullName: req.body.fullName,
      email   : req.body.email
  });
  employee.save()
    .then(result => {
      res.status(201).json({
          message: 'employee was created',
          createdEmployee : result,
          newToken : req.userToken 
      });
    })
    .catch(err => {
        next(err)
    })  
}

exports.employees_update =  (req, res, next) => {
  const employee = req.body;
  let objForUpdate = {};
  for (let key in employee) {
     if(employee.hasOwnProperty(key) && ( key != '_id' ) ){
      objForUpdate[key] = employee[key];
    }
  }

  Employee.findByIdAndUpdate({_id: employee._id}, { $set: objForUpdate }, {new: true})
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

exports.employees_delete = (req, res, next) => {
  const id = req.params.id;
  Employee.remove({_id: id})
      .exec()
      .then( result => {
         // result.newToken = req.userToken;
          res.status(200).json(result);
      })
      .catch( err => {
          
          next(err);
      })
}