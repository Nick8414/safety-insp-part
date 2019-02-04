const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


router.get('/', (req, res, next) => {
    // console.log('get procedure');
    // console.log(req.query.link);
  //  res.sendFile(__dirname + '/qualityPassport.pdf')
  res.sendFile(req.query.link);  
  
 //   res.sendFile('L:/PROCESS_SAFETY/Common Information/SD303.16 - LEVEL SWITCH HIGH HIGH_FOR INFORMATION NIKOLAY.pdf')
    
  //  res.status(200).json({procedure:"procedure"});
   
});


module.exports = router;