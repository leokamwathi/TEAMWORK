const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserController,Op} = require('../controller/userController');
const uFunc = require('../middleware/utilityFunc');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const authRouter = express.Router();

   
/**
 *  Authentications
 */


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

authRouter.post('/create', adminAuth,(req, res, next) => {
    const user = req.body;
        bcrypt.hash(user.password, 10).then(
        (hash) => {
                user.password = hash;
        }
    );
    UserController.create(user).then((isPosted) => {
        if (isPosted) {
            res.status(201).json(uFunc.prepareResult(uFunc.jsonMessage('User account successfully created'), 201));
        } else {
            res.status(401).json(uFunc.prepareResult(uFunc.jsonMessage('User account not created.'), 401));
        }
    }
    ).catch((error) => {
        res.status(401).json(uFunc.prepareResult(error, 401));
    });
    next();
});


authRouter.patch('/edit/:userId', adminAuth, (req, res, next) => {
    UserController.update(req.body).then((editedUser) => {
        if (!editedUser) {
            res.status(401).json(uFunc.prepareResult(uFunc.jsonMessage('The user was not found.'), 401));
        } else {
            res.status(201).json(uFunc.prepareResult(editedUser, 201));
        }
    })
        .catch((error) => {
            res.status(401).json(uFunc.prepareResult(error, 401));
        });
    next();
});

authRouter.post('/signin', (req, res, next) => {
    // Login user and generate auth-token
   
    UserController.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            // console.log("User Not Found");
            return res.status(401).json(uFunc.prepareResult({
                error: new Error('User not found!')
            }, 401));
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
                { userId: user.id },
                'RANDOM_TEAMWORK_SECRET',
                { expiresIn: '24h' });
            const tokenData = {};
            tokenData.userId = user.id;
            tokenData.token = token;
            res.status(201).json(uFunc.prepareResult(tokenData, 201));
        } else {
            res.status(401).json(uFunc.prepareResult({
                error: new Error('Incorrect password!')
            }, 401));
        }
        next();
    }).catch((error) => {
        res.status(401).json(uFunc.prepareResult(error, 401));
    });
  next();

});



module.exports = authRouter;