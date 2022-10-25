const jwt = require('jsonwebtoken'); //install jsonwebtoken

 
module.exports = (req, res, next) => { //Export this module for permissions CRUD
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //verify if this token match with userId token
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};