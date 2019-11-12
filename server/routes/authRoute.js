const Express = require('express');
const users = require('../model/users');

const authRouter = Express.Router();

/**
 *  Authentications
 */
authRouter.post('/created', (req, res, next) => {
    // Create new user
    res.status(200).json(users);
    console.log('Successfuly retrived gif');
    next();
});

/*
{
'status' : 'success' ,
'data' : {
'message' : 'User account successfully created' ,
'token' : String ,
'userId' : Integer ,
...
}
}
*/

authRouter.post('/create',(req, res, next) => {
    const result = { message : 'User account successfully created' , token : 'tokenstring', userId : '1' };
    res.status(200).json(result);
    // console.log(`Created user ${  req.body.email  } pass: ${  req.body.password}`);
    next();
});

authRouter.post('/signin', (req, res, next) => {
    // Login user
    res.status(200).json(users);
    console.log('Successfuly retrived gif');
    next();
});

module.exports = authRouter;