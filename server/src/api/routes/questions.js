const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');

router.get('/', (req, res, next) => {
    Question.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
        // console.log(err);
        // res.status(500).json({error: err});
        next(err);
    });
});

router.post('/', (req, res, next) => {
    const newQuestion = Question({
        _id          : mongoose.Types.ObjectId(),
        QuestionName : req.body.Question.questionName,
        Status       : false,
        Items        : req.body.Question.items,
        
      });
      newQuestion
      .save()
      .then(result => {
          res.status(201).json({
              message:'Question was created',
              question:result
          })
      })
      .catch(err => {
        //   console.log(err.message)
        //   res.status(500).json({
        //       error: err
        //   });
        next(err);
      });
});


 
router.patch('/', (req, res, next) => {
   Question.findByIdAndUpdate({_id: req.body.id}, { $set: {
                                                    QuestionName: req.body.questionName,            
                                                    Items  :  req.body.items                                              
                                                  },
                                          },{new: true} )
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            result
        })
    })
    .catch(err => {
        // console.log(err);
        // res.status(500).json({
        //     error: err
        // })
        next(err);
    })
});

router.delete('/:questionId', (req, res, next) => {
    Question.findByIdAndRemove(req.params.questionId)
    .exec()
    .then( result => {
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