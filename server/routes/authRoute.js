const Express = require('express');
const users = require('../model/users');

const authRouter = Express.Router();

/**
 *  Authentications
 */
authRouter.post('/create', (req, res, next) => {
    // Create new user
    res.status(200).json(users);
    console.log('Successfuly retrived gif');
    next();
});

authRouter.post('/signin', (req, res, next) => {
    // Login user
    res.status(200).json(users);
    console.log('Successfuly retrived gif');
    next();
});

module.exports = authRouter;