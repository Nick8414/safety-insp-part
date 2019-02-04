const Log = require('../models/log');

exports.logs_get_all = (req, res, next) => {
    console.log(req.query);
    const sizePage = req.query.sizePage;
    const currentPage = req.query.currentPage; 
    const level = req.query.level !== '' ? {level: req.query.level} : {};

    if (req.query.dateFrom) {
        selectedDateFrom = new Date(req.query.dateFrom); 
    } else {
        selectedDateFrom = new Date(3600 * 24 * 1000);
    }

    if (req.query.dateTo) {
        selectedDateTo = new Date(req.query.dateTo); 
     } else {
        selectedDateTo = new Date(); 
     }

  Log.find({$and: [{timestamp: {$gte: selectedDateFrom}}, {timestamp: {$lte: selectedDateTo}}, level]})
    .sort({timestamp:-1})
    .limit(parseInt(sizePage))
    .skip((currentPage -1) * sizePage)
    .exec()
    .then(results => {
       // const total = Log.count({}).exec()  
        Log.count({})
           .exec()
           .then( total => {
               fullRec = {records: results, total: total}
               if (fullRec.records.length >= 0) {
                    res.status(200).json(fullRec);
               } else {
                    res.status(404).json({
                        message: 'No entries found'
                    }); 
               } 
           }) 
    })
   
    .catch(err => {
        next(err)
    });  
}
// exports.precautions_create = (req, res, next) => {
//   const precaution = new Precaution({
//       precautionName: req.body.precautionName
//   });
//   precaution.save()
//             .then(result => {
//               res.status(201).json({
//                   message: 'precaution was created',
//                   createdPrecaution : result,
//                //   newToken : req.userToken
//               });
//             })
//             .catch(err => {
//                 next(err)

//             })  
// }
exports.log_update = (req, res, next) => {
 
    console.log('update')
    const id = req.body.id;
    console.log(id);
    Log.findByIdAndUpdate(id, { $set: {'meta':{isView:true}} }, {new: true})
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
// exports.precautions_delete = (req, res, next) => {
//   const id = req.params.id;
//   Precaution.remove({_id: id})
//       .exec()
//       .then( result => {
//         //  result.newToken = req.userToken;
//           res.status(200).json(result);
//       })
//       .catch( err => {
//           next(err)
//       })
// }