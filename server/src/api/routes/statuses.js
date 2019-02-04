const express = require('express');
const router = express.Router();

const Status = require('../models/status');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
    Status.find({})
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
    console.log(req.body);
    const status = new Status({
        statusName: req.body.statusName
    });
    status.save()
              .then(result => {
                res.status(201).json({
                    message: 'status was created',
                    createdStatus : result,
                  //  newToken : req.userToken
                });
              })
              .catch(err => {
                  next(err)

              })  
});

router.patch('/', checkAuth, (req, res, next) => {
    console.log(req.body);
    const id = req.body.id;
    const statusName = req.body.statusName;
    Status.findByIdAndUpdate({_id: id}, { $set: {statusName:statusName} }, {new: true})
        .exec()
        .then(result => {
          //  result.newToken = req.userToken;
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
    Status.remove({_id: id})
        .exec()
        .then( result => {
          //  result.newToken = req.userToken;
            res.status(200).json(result);
        })
        .catch( err => {
            // console.log(err);
            // res.status(500).json({
            //     error: err
            // })
            next(err);
        })
});

module.exports = router;