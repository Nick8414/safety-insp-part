const HazardRating = require('../models/hazardRating');

exports.hazardRatings_get_all = (req, res, next) => {
  HazardRating.find({})
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

exports.hazardRatings_create = (req, res, next) => {
  const hazardRating = new HazardRating({
      ratingName: req.body.ratingName
  });
  hazardRating.save()
            .then(result => {
              res.status(201).json({
                  message: 'rating was created',
                  createdRating : result,
                //  newToken : req.userToken 
              });
            })
            .catch(err => {
                next(err)

            })  
}

exports.hazardRatings_update = (req, res, next) => {
  const id = req.body.id;
  const ratingName = req.body.ratingName;
  HazardRating.findByIdAndUpdate({_id: id}, { $set: {ratingName:ratingName} }, {new: true})
      .exec()
      .then(result => {
        //  result.newToken = req.userToken;
          res.status(200).json({
              result
          })
      })
      .catch(err => {
          next(err)
      })
}

exports.hazardRatings_delete = (req, res, next) => {
  const id = req.params.id;
  HazardRating.remove({_id: id})
      .exec()
      .then( result => {
        //  result.newToken = req.userToken;
          res.status(200).json(result);
      })
      .catch( err => {
          next(err);
      })
}