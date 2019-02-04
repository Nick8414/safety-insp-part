const Skill = require('../models/skill');

exports.skills_get_all = (req, res, next) => {
    Skill.find({})
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

exports.skills_create = (req, res, next) => {
    const skill = new Skill({
        skillName: req.body.skillName
    });
    skill.save()
        .then(result => {
            res.status(201).json({
                message: 'skill was created',
                createdSkill: result,
                //  newToken : req.userToken
            });
        })
        .catch(err => {
            next(err)
        })
}

exports.skills_update = (req, res, next) => {
    const id = req.body.id;
    const skillName = req.body.skillName;
    Skill.findByIdAndUpdate({ _id: id }, { $set: { skillName: skillName } }, { new: true })
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

exports.skills_delete = (req, res, next) => {
  const id = req.params.id;
  Skill.remove({_id: id})
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
}