const jwt = require('jsonwebtoken'); //install jsonwebtoken
require('dotenv').config();

 
module.exports = (req, res, next) => { //Export this module for permissions CRUD
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.TOKEN); //verify if this token match with userId token
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};