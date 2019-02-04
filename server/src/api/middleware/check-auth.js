const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
       // console.log(token);
        const decoded = jwt.verify(token, "secret");
      
        req.userData = decoded;
   
        const JWTToken = jwt.sign({
            userName    : decoded.userName,
            department  : decoded.department,
            _id         : decoded._id,
            isAdmin     : decoded.isAdmin,
            isInspector : decoded.isInspector,
            headersTable: decoded.headersTable,
            imageLink   : decoded.imageLink
          },
          'secret',
           {
             expiresIn: '60m'
           });
           req.userToken = JWTToken;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: 'Ошибка авторизации'
        });
    }  
}