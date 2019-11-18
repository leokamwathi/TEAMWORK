const User = require('../model/userModel');

const DbControlClass = require('./dbControlClass');

const UserController = new DbControlClass(User); 


module.exports = UserController;
