const jwt = require('jsonwebtoken');
const utilityCore = require('./utilityCore');

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, 'RANDOM_TEAMWORK_SECRET');
            const {userId} = decodedToken;
           // console.log("USER ID", userId, req.headers.authorization.split(' ')[2]);
            if (userId != req.headers.authorization.split(' ')[2]) {
                    // console.log("INVALID USER ID");
                return res.status(401).json(utilityCore.createResponse({},401,'Failed to authenticate user.'));
                }
            return next();
        }
    } catch (error) {
        return res.status(401).json(utilityCore.createResponse(error,401,'Invalid Request'));
    }
};