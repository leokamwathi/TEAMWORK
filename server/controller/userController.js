const User = require('../model/userModel');

const { DbControlClass, Op } = require('./dbControlClass');

const UserController = new DbControlClass(User); 

module.exports = {UserController, Op};
