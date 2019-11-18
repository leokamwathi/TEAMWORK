const Comment = require('../model/commentModel');

const DbControlClass = require('./dbControlClass');

const CommentController = new DbControlClass(Comment);


module.exports = CommentController;