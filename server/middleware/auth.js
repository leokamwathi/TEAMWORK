const jwt = require('jsonwebtoken');
const uFunc = require('../middleware/utilityFunc');

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, 'RANDOM_TEAMWORK_SECRET');
            const {userId} = decodedToken;
           // console.log("USER ID", userId, req.headers.authorization.split(' ')[2]);
            if (userId != req.headers.authorization.split(' ')[2]) {
                    // console.log("INVALID USER ID");
                return res.status(401).json(uFunc.prepareResult({ error: new Error('Only admin can create users.') }, 401));
                }
            next();
        }
        // res.status(401).json({ error: new Error('Invalid Request') });
        // return;
    } catch (error) {
        // console.log("INVALID REQUEST", error);
        res.status(401).json(uFunc.prepareResult({ error: new Error('Invalid Request') }, 401));
    }
};