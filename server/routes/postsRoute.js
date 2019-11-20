const express = require('express');
const { PostController, Op } = require('../controller/postController');
const commentsRoute = require('./commentsRoute');
const utilityCore = require('../middleware/utilityCore');
const auth = require('../middleware/auth');

const postRouter = express.Router();


postRouter.get('/',(req, res, next) => {
    // Retrive all the latest articles and gifs
    PostController.findAll().then((posts)=>{
        // if(posts && posts.length>0){
            res.status(200).json(utilityCore.createResponse(posts, 200,'Successfully retrieved posts.'));
            next();
        // }else{
        //     return res.status(403).json(utilityCore.createResponse({}, 403, 'No records found.'));
        // }
    }).catch((error)=>{
        return res.status(403).json(utilityCore.createResponse(error, 403,'Invalid request'));
    });
});
  
postRouter.post('/',auth, (req, res, next) => {
    // Create new article
    PostController.create(req.body).then((isPosted)=>{
        if (isPosted){
            res.status(201).json(utilityCore.createResponse({},201,'Successfully posted.'));
        }else{
            res.status(403).json(utilityCore.createResponse({},403,'Failed to post.'));
        }
        next();
    }
    ).catch((error) => {
        res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
    });
   
});

postRouter.get('/:postId', auth, (req, res, next) => {
    // Retrive article with a given ID
    PostController.findOne({ id: req.params.postId }).then((results)=>{
        if (!results) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to find post.'));
        } else {
            res.status(200).json(utilityCore.createResponse(results, 200,'Successfully retrieved post.'));
        }
        next();
    }).catch((error) => {
        res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
    });
   
    // console.log('Successfuly retrieved article', data[0].posts[req.params.postId]);
   
});

postRouter.patch('/:postId', auth, (req, res, next) => {
    // Edit article with a given ID
    PostController.update(req.body).then((editedPost)=>{
        if (!editedPost) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to find post.'));
        }else{
            res.status(201).json(utilityCore.createResponse({},201,'Successfully edited the post.', 201));
        }
        next();
    })
    .catch((error) => {
        res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
    });

    
});

postRouter.patch('/:postId/flag', auth, (req, res, next) => {
    // Flag article with a given ID
    PostController.update({ id: req.params.postId, flaged: req.params.flag}).then((editedPost) => {
        if (!editedPost) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to find post.'));
        } else {
            res.status(201).json(utilityCore.createResponse({},201,'Successfully flaged post.'));
        next();
        }
    })
        .catch((error) => {
            res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
        });
});

postRouter.delete('/:postId', auth, (req, res, next) => {
    // Delete article with a given ID
    PostController.update({id:req.params.postId}).then((isDeleted) => {
        if (!isDeleted) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to find post.'));
        } else {
            res.status(203).json(utilityCore.createResponse({},203,'Successfully Deleted post.'));
        }
        next();
    })
        .catch((error) => {
            res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
        });
    
});

postRouter.use('/:postId/comments', commentsRoute);


module.exports = postRouter;