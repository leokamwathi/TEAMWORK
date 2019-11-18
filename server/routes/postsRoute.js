const express = require('express');
const { PostController, Op } = require('../controller/postController');
const commentsRoute = require('./commentsRoute');
const uFunc = require('../middleware/utilityFunc');
const auth = require('../middleware/auth');

const postRouter = express.Router();


postRouter.get('/',(req, res, next) => {
    // Retrive all the latest articles and gifs
    PostController.findAll().then((posts)=>{
        res.status(200).json(uFunc.prepareResult(posts, 200));
    }).catch((error)=>{
        res.status(401).json(uFunc.prepareResult(error, 401));
    });
    // console.log('Successfuly retrived all articles feed', uFunc.prepareResult(data[0].posts));
    next();
});

postRouter.post('/',auth, (req, res, next) => {
    // Create new article
    PostController.create(req.body).then((isPosted)=>{
        if (isPosted){
            res.status(201).json(uFunc.prepareResult(uFunc.jsonMessage('Posted successfully created'), 201));
        }else{
            res.status(401).json(uFunc.prepareResult(uFunc.jsonMessage('Unable to post data.'), 401));
        }
    }
    ).catch((error) => {
        res.status(401).json(uFunc.prepareResult(error, 401));
    });
    next();
});

postRouter.get('/:postId', auth, (req, res, next) => {
    // Retrive article with a given ID
    PostController.findOne({ id: req.params.postId }).then((results)=>{
        if (!results) {
            res.status(404).json(uFunc.prepareResult(uFunc.jsonMessage('The post not found.'), 404));
        } else {
            res.status(200).json(uFunc.prepareResult(results, 200));
        }
    }).catch((error) => {
        res.status(401).json(uFunc.prepareResult(error, 401));
    });
   
    // console.log('Successfuly retrived article', data[0].posts[req.params.postId]);
    next();
});

postRouter.patch('/:postId', auth, (req, res, next) => {
    // Edit article with a given ID
    PostController.update(req.body).then((editedPost)=>{
        if (!editedPost) {
            res.status(401).json(uFunc.prepareResult(uFunc.jsonMessage('The post was not found.'), 401));
        }else{
            res.status(201).json(uFunc.prepareResult(editedPost, 201));
        }
    })
    .catch((error) => {
        res.status(401).json(uFunc.prepareResult(error, 401));
    });
next();
    
});

postRouter.patch('/:postId/flag', auth, (req, res, next) => {
    // Flag article with a given ID
    PostController.update({id:req.params.postId,flaged:true}).then((editedPost) => {
        if (!editedPost) {
            res.status(401).json(uFunc.prepareResult(uFunc.jsonMessage('The post was not found.'), 401));
        } else {
            res.status(201).json(uFunc.prepareResult(editedPost, 201));
        }
    })
        .catch((error) => {
            res.status(401).json(uFunc.prepareResult(error, 401));
        });
    next();
});

postRouter.delete('/:postId', auth, (req, res, next) => {
    // Delete article with a given ID
    PostController.update({id:req.params.postId}).then((isDeleted) => {
        if (!isDeleted) {
            res.status(401).json(uFunc.prepareResult(uFunc.jsonMessage('The post was not found.'), 401));
        } else {
            res.status(203).json(uFunc.prepareResult(uFunc.jsonMessage('Successfully Deleted article.'), 203));
        }
    })
        .catch((error) => {
            res.status(401).json(uFunc.prepareResult(error, 401));
        });
    next();
});

postRouter.use('/:postId/comments', commentsRoute);


module.exports = postRouter;