const express = require('express');
const data = require('../model/posts');
const commentsRoute = require('./commentsRoute');
const uFunc = require('../middleware/utilityFunc');
const auth = require('../middleware/auth');

const postRouter = express.Router();


postRouter.get('/' ,auth,(req, res, next) => {
    // Retrive all the latest articles and gifs
    const results = data[0].posts;
    res.status(200).json(uFunc.prepareResult(results,200));
    // console.log('Successfuly retrived all articles feed', uFunc.prepareResult(data[0].posts));
    next();
});

postRouter.post('/',auth, (req, res, next) => {
    // Create new article
    data[0].posts.push(req.body)
    res.status(201).json(uFunc.prepareResult(uFunc.jsonMessage('Posted successfully created'),201));
    // console.log(result.message, data[0].posts);
    next();
});

postRouter.get('/:postId', auth, (req, res, next) => {
    // Retrive article with a given ID
    const results = data[0].posts[req.params.postId];
    if (!results){
        res.status(404).json(uFunc.prepareResult(uFunc.jsonMessage('The post with given ID does not exist'),404));
    }else{
        res.status(200).json(uFunc.prepareResult(results,200));
    }
    // console.log('Successfuly retrived article', data[0].posts[req.params.postId]);
    next();
});

postRouter.patch('/:postId', auth, (req, res, next) => {
    // Edit article with a given ID
    const editedPost = data[0].posts[req.params.postId]
    Object.keys(req.body).forEach((key) =>{
        editedPost[key] = req.body[key]
    })
    res.status(201).json(uFunc.prepareResult(editedPost,201));
    // console.log('Successfuly edited article', editedData);
    next();
});

postRouter.patch('/:postId/flag', auth, (req, res, next) => {
    // Flag article with a given ID
    const post = data[0].posts[req.params.postId]
    
    if (req.body.flag === 'true'){
        if (post.flags.includes(req.body.userId)===false){
            post.flags.push(req.body.userId);
        }
    }else{
        post.flags = post.flags.filter((uid) => uid !== req.body.userId);
    }
    
    res.status(201).json(uFunc.prepareResult(post,201));
    // console.log('Successfuly flaged article', req.body.flag, req.body.userId, post);
    next();
});

postRouter.delete('/:postId', auth, (req, res, next) => {
    // Delete article with a given ID
    data[0].posts = data[0].posts.filter((post) => post.id !== req.body.postId);
 
    res.status(203).json(uFunc.prepareResult(uFunc.jsonMessage('Successfully Deleted article.'),203));
    next();
});

postRouter.use('/:postId/comments', commentsRoute);


module.exports = postRouter;