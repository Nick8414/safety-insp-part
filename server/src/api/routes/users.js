const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const logger = require('../log/logger');

const passport = require('passport');
//const LdapStrategy = require('passport-ldapauth');

const User = require('../models/user');
const checkAuth = require('../middleware/check-auth');

router.get('/', (req, res, next) => {
    User.find({})
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
});

router.post('/', checkAuth, (req, res, next) => {
  const user = new User({
    userName   : req.body.userName,
    isInspector: req.body.isInspector,
    isAdmin    : req.body.isAdmin,
    isUser     : req.body.isUser,
    department : req.body.department,
    ddsID      : req.body.ddsID,
    headersTable: [
      {
        label: 'mainTableHeader.psd_TAG',
        value: 'psd_TAG',
        status: true
      },
      { 
        label: 'mainTableHeader.fieldTAG',
        value: 'fieldTAG', 
        status: true
      },
      { 
        label: 'mainTableHeader.flowSheet',
        value: 'flowSheet', 
        status: false
      },
      { 
        label: 'mainTableHeader.psdType',
        value: 'PSD_Description.title', 
        status: true
      },
      { 
        label: 'mainTableHeader.department',
        value: 'department', 
        status: true
      },
      { 
        label: 'mainTableHeader.installationPlace',
        value: 'installationPlace', 
        status: true
      },
      { 
        label: 'mainTableHeader.responsiblePerson',
        value: 'responsiblePerson', 
        status: true
      },
      { 
        label: 'mainTableHeader.lastInspectionDate',
        value: 'lastInspectionDate', 
        status: true 
      },
      { 
        label: 'mainTableHeader.nextInspectionDate',
        value: 'nextInspectionDate', 
        status: true 
      },
      { 
        label: 'mainTableHeader.hazard',
        value: 'hazard', 
        status: false 
      },
      { 
        label: 'mainTableHeader.hazardRaiting',
        value: 'hazardRaiting', 
        status: false 
      },
      { 
        label: 'mainTableHeader.protectiveAction',
        value: 'protectiveAction', 
        status: false 
      },
      { 
        label: 'mainTableHeader.comments',
        value: 'comments', 
        status: false 
      },
      { 
        label: 'mainTableHeader.otherPropertiesAndData',
        value: 'otherPropertiesAndData', 
        status: false
      },
      { 
        label: 'mainTableHeader.safetyIntegretyLevel',
        value: 'safetyIntegretyLevel', 
        status: false 
      },
      { 
        label: 'mainTableHeader.srttingSizePSData',
        value: 'settingSizePSData', 
        status: false 
      },
      { 
        label: 'mainTableHeader.inspectionFrequency',
        value: 'PSD_Description.frequencyOfInspection', 
        status: false
      },
      { 
        label: 'mainTableHeader.equipmentState',
        value: 'inOperationShutdown', 
        status: false
      },
      { 
        label: 'mainTableHeader.typeInspection',
        value: 'typeInspection', 
        status: false
      },
      { 
        label: 'mainTableHeader.methodInspection',
        value: 'methodInspection', 
        status: false
      },
      { 
        label: 'mainTableHeader.status',
        value: 'PSI_Status', 
        status: true
      },
      { 
        label: 'mainTableHeader.notes',
        value: 'notes', 
        status: true
      }
    ]
  });
  user.save()
    .then(result => {
      logger.info(result.userName + ' user was created');
    //  result.newToken = req.userToken;
      res.status(201).json({
        message: 'user was created',
        createdUser : result 
      });
    })
    .catch(err => {
      next(err)
    })  
});

router.post('/signin', (req, res, next) => {
  let selectedDepartment = req.body.department;
    passport.authenticate('ldapauth', {session: false}, (err, user, info) => {
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send({success: 'Welcome to the JWT Auth'});
      });
    })(req, res, next);
});

// router.post('/signin', (req, res, next) => {
//   let selectedDepartment = req.body.department;
//     passport.authenticate('ldapauth', {session: false}, (err, user, info) => {
//       if (err || !user) {
//         logger.error(err);
//         if ( err ) {
//           next (err)
//         } else {
//           res.status(401).send({message:'Не правильная комбинация логина и пароля'});
//           logger.warn('Not correct combination of login and password for user "' + req.body.username + '"');    
//         }
//       } else {
//         User.findOne({userName:user.ExtShortName})
//         .exec()
//         .then(result => {
//           if(result) {
//             if (selectedDepartment != 'All | ВСЕ') {
//               const JWTToken = jwt.sign({
//                 userName          : result.userName,
//                 department        : selectedDepartment,
//                 assignedDepartment: result.department,
//                 ddsID             : result.ddsID,       
//                 _id               : result._id,
//                 isAdmin           : result.isAdmin,
//                 isInspector       : result.isInspector,
//                 isUser            : result.isUser,
//                 headersTable      : result.headersTable,
//                 imageLink         : user.ExtPhotoURL != undefined ? user.ExtPhotoURL : user.extphotourl
//               },
//               'secret',
//               {
//                 expiresIn: '60m'
//               });
//               logger.info({message: result.userName + " enter to system", level: 'info', meta:{isView:false}});
//               console.log('JWTToken===>>>');
//               console.log(JWTToken);
//               return res.status(200).json({
//                 success: 'Welcome to the JWT Auth',
//                 token: JWTToken
//               }); 
//             } else if (selectedDepartment == 'All | ВСЕ' && result.isAdmin  == true ) {
//                 const JWTToken = jwt.sign({
//                   userName          : result.userName,
//                   department        : selectedDepartment,
//                   assignedDepartment: result.department,
//                   ddsID             : result.ddsID,       
//                   _id               : result._id,
//                   isAdmin           : result.isAdmin,
//                   isInspector       : result.isInspector,
//                   isUser            : result.isUser,
//                   headersTable      : result.headersTable,
//                   imageLink         : user.ExtPhotoURL != undefined ? user.ExtPhotoURL : user.extphotourl
//                 },
//                 'secret',
//                 {
//                   expiresIn: '60m'
//                 });
//                 logger.info({message: result.userName + " enter to system", level: 'info', meta:{isView:false}});
//                 console.log('JWTToken===>>>');
//               console.log(JWTToken);
//                 return res.status(200).json({
//                   success: 'Welcome to the JWT Auth',
//                   token: JWTToken
//                 });
//             } else {
//                  throw new Error('Only admin can select all departments');
//             }
//           } else {
//               logger.warn(result.userName + " not have permission");
//               throw new Error('You not have permission');
//           }
//         })  
//         .catch( err=>{
//           //   console.log(err.message);

//           //   return res.status(401).json({
//           //    message: err.message
//           // });
//           next(err)
//         } )
//       }
//     })(req, res, next);
// });

router.patch('/', checkAuth, (req, res, next) => {
 //   console.log(req.body);
    const user = req.body.user;
  //  console.log(user);

    let objForUpdate = {};
    for (let key in user) {
       if(user.hasOwnProperty(key) && ( key != '_id' ) ){
        objForUpdate[key] = user[key];
      }
    }

    User.findByIdAndUpdate({_id: user._id}, { $set: objForUpdate }, {new: true})
        .exec()
        .then(result => {
         // result.newToken = req.userToken;
         //   console.log(result);
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
});

router.delete('/:id', checkAuth, (req, res, next) => {
  const id = req.params.id;
  User.remove({_id: id})
    .exec()
    .then( result => {
     // result.newToken = req.userToken;
      logger.info('user was delete');
      res.status(200).json(result);
    })
    .catch( err => {
      //console.log(err);
      // res.status(500).json({
      //      error: err
      //       })
      next(err);
    })
});

module.exports = router;