const Comment = require('../model/commentModel');

const { DbControlClass, Op } = require('./dbControlClass');

const CommentController = new DbControlClass(Comment);


module.exports = {CommentController,Op};