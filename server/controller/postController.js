const Post = require('../model/postModel');

const DbControlClass = require('./dbControlClass');

const PostController = new DbControlClass(Post);


module.exports = PostController;
