const Post = require('../model/postModel');

const {DbControlClass,Op} = require('./dbControlClass');

const PostController = new DbControlClass(Post);


module.exports = {PostController,Op};
