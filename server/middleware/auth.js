const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const {userId} = decodedToken;
        if (req.body.userId && req.body.userId !== userId) {
            console.log("INVALID USER ID");
            const error = 'Invalid User ID';
            throw error
        } else {
            next();
        }
    } catch (error) {
        console.log("INVALID REQUEST", error);
        res.status(401).json({ error: new Error('Invalid Request') });
    }
};