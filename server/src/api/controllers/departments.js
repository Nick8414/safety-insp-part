const Department = require('../models/department');

exports.department_get_all = (req, res, next) => {
  Department.find({})
    .exec()
    .then(results => {
      //  console.log('From database', results);
        if (results.length >= 0) {
           // results.newToken = req.userToken;
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

exports.department_create = (req, res, next) => {
  const department = new Department({
        departmentName       : req.body.departmentName,
        eSystemDepartmentName: req.body.eSystemDepartmentName,
        productionAreas      : req.body.productionAreas
  });
  department.save()
    .then(result => {
      res.status(201).json({
          message: 'department was created',
          createdDepartment : result,
          newToken : req.userToken 
      });
    })
    .catch(err => {
      next(err)
    })  
}

exports.department_update = (req, res, next) => {
  const department = req.body;
  let objForUpdate = {};
  for (let key in department) {
     if(department.hasOwnProperty(key) && ( key != '_id' ) ){
      objForUpdate[key] = department[key];
    }
  }
  Department.findByIdAndUpdate({_id: department._id}, { $set: objForUpdate }, {new: true})
    .exec()
    .then(result => {
      res.status(200).json({
        result
      })
    })
    .catch(err => {
      next(err);
    })
}

exports.department_delete = (req, res, next) => {
  const id = req.params.id;
  Department.remove({_id: id})
    .exec()
    .then( result => {
      res.status(200).json(result);
    })
    .catch( err => {
      next(err);
    })
}