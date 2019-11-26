const jwt = require('jsonwebtoken');
const utilityCore = require('./utilityCore');
const { UserController, Op } = require('../controller/userController');


module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization) {
            // console.log('AUTH', req.headers.authorization.split(' ')[1])
            // console.log("CHECK ADMIN USER ", userId, req.headers.authorization.split(' ')[2]);
           // console.log("USER ID", req.headers.authorization.split(' ')[2]);
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, 'RANDOM_TEAMWORK_SECRET');
            const { userId } = decodedToken;
            // console.log("TOKEN USER ID", userId);
            if (userId != req.headers.authorization.split(' ')[2]) {
                // console.log("INVALID USER ID");
                return res.status(401).json(utilityCore.createResponse({}, 401, 'Only an admin can create users.'));
            }
            // console.log("Find One");
            return UserController.findOne(
                { 
                    id: req.headers.authorization.split(' ')[2], 
                    isAdmin: true }
                    ).then((user) => {
                    if (user && user.id == userId){
                        return next();
                    }
                        return res.status(401).json(utilityCore.createResponse({}, 401, 'Failed to authenticate user.'));              
            }).catch((error) => {
                // console.log('AuthERROR', error);
                return res.status(401).json(utilityCore.createResponse(error, 401, 'Invalid Request'));
            })
        }
        // res.status(401).json({ error: new Error('Invalid Request') });
        // return;
    } catch (error) {
        // console.log("INVALID ADMIN AUTH REQUEST", error);
        return res.status(401).json(utilityCore.createResponse(error, 401, 'Invalid Request!!'));
    }
};