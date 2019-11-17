const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const users = require('../model/userModel');
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
    users[0].users.push(user);
    res.status(201).json(uFunc.prepareResult(uFunc.jsonMessage('User account successfully created.'),201));
    // console.log(users[0].users);
    next();
});


authRouter.patch('/edit/:userId', auth, (req, res, next) => {
    const editedUser = users[0].users[req.params.userId]
    Object.keys(req.body).forEach((key) => {
        editedUser[key] = req.body[key]
    })
    res.status(201).json(uFunc.prepareResult(uFunc.jsonMessage('User detail successfully edited'),201));
    // console.log('Successfuly edited user');
    next();
});

authRouter.post('/signin', (req, res, next) => {
    // Login user
    // console.log("I WAS CALLLED AGAIN AND AGAIN", req.body.email);
    const [user] = users[0].users.filter((u)=>u.email==req.body.email);

    if (!user) {
        // console.log("User Not Found");
        return res.status(401).json(uFunc.prepareResult({
            error: new Error('User not found!')
        },401));
    }
    // console.log(req.body.postBody, user);
    if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
            { userId: user.id },
            'RANDOM_TEAMWORK_SECRET',
            { expiresIn: '24h' });
        const tokenData = {};
        tokenData.userId = user.id;
        tokenData.token = token;
        res.status(201).json(uFunc.prepareResult(tokenData,201));
        // console.log(uFunc.prepareResult(tokenData));
        // console.log('Token Generated');
    }else{ 
       // console.log('Incorrect password!');
        res.status(401).json(uFunc.prepareResult({
            error: new Error('Incorrect password!')
        },401));
    }
    next();
    return true;
    
});



module.exports = authRouter;