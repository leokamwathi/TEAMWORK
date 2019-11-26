const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserController,Op} = require('../controller/userController');
const utilityCore = require('../middleware/utilityCore');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const authRouter = express.Router();

// Asch calls to heroku are not fun - Many false errors
   
authRouter.post('/create', adminAuth,(req, res, next) => {
    // console.log("CREATE USER!!!",req.body)
    try {
        const user = req.body;
        bcrypt.hash(user.password, 10).then(
        (hash) => {
                user.password = hash;
        }
    );
    return UserController.create(user).then((isPosted) => {
        if (isPosted) {
            res.status(201).json(utilityCore.createResponse({},201,'Successfully created user account'));
            return next();
        }
        return res.status(403).json(utilityCore.createResponse({}, 403, 'Failed to create user'));
    }
    ).catch((error) => {
        return res.status(403).json(utilityCore.createResponse(error,403,'Failed to create user'));
    })
        
    } catch (error) {
        // console.log(">>CREATE ERROR!", error);
        return res.status(401).json(utilityCore.createResponse(error, 401, 'Invalid Request'));
    }
    
});


authRouter.patch('/edit/:userId', adminAuth, (req, res, next) => {
    try {
        // console.log(">>EDITING USER ", req.body, req.param.userId);
        const user = req.body
        // user.id = req.param.userId
        return UserController.update(user).then((editedCount) => {
            // console.log("EDITD",editedCount);
            // console.log(">>EDITED ROWS:", editedCount);
            if (!editedCount) {
                // console.log(">>EDITING FAILED!!!");
               return res.status(404).json(utilityCore.createResponse({},404,'Failed to edit user details.'));
            } 
                // console.log(">>EDITING SUCCESS!!!");
                res.status(201).json(utilityCore.createResponse({},201,'Successfully updated user details.'));
                return next();
        })
            .catch((error) => {
                // console.log(">>EDITING ERROR!", error); // utilityCore.prepareResult(utilityCore.jsonMessage('The user was not found.'), 403));
                return res.status(403).json(utilityCore.createResponse(error,403,'Invalid Request'));
                // return res.status(403).json(utilityCore.prepareResult(error, 403));
            })
    } catch (error) {
       // console.log(">>PATCH ERROR!", error);
       return res.status(403).json(utilityCore.createResponse(error,403,'Invalid Request'));
    }
});
// https://teamwork-leo.herokuapp.com/api/v1/auth/signin
authRouter.post('/signin', (req, res, next) => {
    // Login user and generate auth-token
    // console.log('login',req.body);
    if (!req.body.email || !req.body.password){
        return res.status(401).json(utilityCore.createResponse({}, 401, 'Invalid Login details.'));
    }
return UserController.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
            // console.log("User Not Found");
            return res.status(401).json(utilityCore.createResponse({}, 401,'Invalid Login details.'));
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = jwt.sign(
                { userId: user.id },
                'RANDOM_TEAMWORK_SECRET',
                { expiresIn: '24h' });
            const tokenData = {};
            tokenData.userId = user.id;
            tokenData.token = token;
            res.status(200).json(utilityCore.createResponse(tokenData,200,'Succefully signed in user.'));
            return next();
        }   
    return res.status(401).json(utilityCore.createResponse({}, 401, 'Invalid Login details.'));
    }).catch((error) => {
        // console.log('ERROR',error);
        return res.status(401).json(utilityCore.createResponse(error, 401,'Invalid Request'));
    })
});
module.exports = authRouter;