const express = require('express');
const router = express.Router();
const Tool = require('../models/tool');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
    Tool.find()
    .exec()
    .then(docs => {
         //   docs.newToken = req.userToken;
            res.status(200).json(docs);
    })
    .catch(err => {
        // console.log(err);
        // res.status(500).json({error: err});
        next(err);
    });
   
});

router.post('/', checkAuth, (req, res, next) => {
    const newTool = new Tool({
        _id                : mongoose.Types.ObjectId(),
        toolName            : req.body.toolName, 
    });
    newTool
        .save()
        .then(result => {
          //  result.newToken = req.userToken;
            res.status(201).json({
                tool:result
            })
        })
        .catch(err => {
            // console.log(err)
            // res.status(500).json({
            //     error: err
            // });
            next(err);
        });
});

router.patch('/', checkAuth, (req, res, next) => {
    const id = req.body.id;
    const toolName = req.body.toolName;
    Tool.findByIdAndUpdate({_id: id}, { $set: {toolName:toolName} }, {new:true})
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
    Tool.remove({_id: id})
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