const express = require('express');
const { PostController} = require('../controller/postController');
const commentsRoute = require('./commentsRoute');
const utilityCore = require('../middleware/utilityCore');
const auth = require('../middleware/auth');
const cloudinaryCore = require('../middleware/cloudinaryCore');

const postRouter = express.Router();


postRouter.get('/',(req, res, next) => {
    // Retrive all the latest articles and gifs
    return PostController.findAll().then((posts)=>{
        // if(posts && posts.length>0){
            const datas= [];
        posts.forEach((post)=>{
                const data = {};
            if (post.isGif == true) {
                    data.gifId = post.id
                    data.createdOn = post.createdAt
                    data.title = post.title
                    data.imageUrl = post.post
                    data.flag = post.flaged
                } else {
                    data.articleId = post.id
                    data.createdOn = post.createdAt
                    data.title = post.title
                    data.post = post.post
                    data.flag = post.flaged
                }
                datas.push(data)
            })
        // console.log("DATAS", datas, posts);
        res.status(200).json(utilityCore.createResponse(datas, 200,'Successfully retrieved posts.'));
            return next();
        // }else{
        //     return res.status(403).json(utilityCore.createResponse({}, 403, 'No records found.'));
        // }
    }).catch((error)=>{
        return res.status(403).json(utilityCore.createResponse(error, 403,'Invalid request'));
    });
});
// Fix #21 As an Employee, I want to be able to post gifs, So that other employees can view them on the website
postRouter.post('/', auth, cloudinaryCore,(req, res, next) => {
// console.log("....",req.body);
    PostController.create(req.body).then((post) => {
        if (post) {
                const data = {};
                 if(req.body.isGif == 'true'){
                    data.gifId = post.id
                    data.message = 'GIF image was successfully posted';
                    data.createdOn = post.createdAt
                    data.title = post.title
                    data.imageUrl = post.post
                    data.flag = post.flaged
                 }else{
                     data.articleId = post.id
                     data.message = 'Article was successfully posted';
                     data.createdOn = post.createdAt
                     data.title = post.title
                     data.post = post.post
                     data.flag = post.flaged
                 }
            res.status(201).json(utilityCore.createResponse(data, 201, data.message));
            }else if(req.body.isGif == 'true') {
                res.status(403).json(utilityCore.createResponse({}, 403, 'Failed to post gif.'));
            }else{
                res.status(403).json(utilityCore.createResponse({}, 403, 'Failed to post article.'));
            }
            next();
        }
        ).catch((error) => {
            res.status(403).json(utilityCore.createResponse(error, 403, 'Invalid Request'));
        });
});


postRouter.get('/:postId', auth, (req, res, next) => {
    // Retrive article with a given ID
    PostController.findOne({ id: req.params.postId }).then((post)=>{
        if (!post) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to find post.'));
        } else if(post){
                const data = {};
                 if(req.body.isGif == 'true'){
                    data.gifId = post.id
                    data.message = 'GIF image was successfully posted';
                    data.createdOn = post.createdAt
                    data.title = post.title
                    data.imageUrl = post.post
                     data.flag = post.flaged
                 }else{
                     data.articleId = post.id
                     data.message = 'Article was successfully posted';
                     data.createdOn = post.createdAt
                     data.title = post.title
                     data.post = post.post
                     data.flag = post.flaged
                 }
                res.status(200).json(utilityCore.createResponse(data, 200,'Successfully retrieved post.'));
        }else{          
            res.status(404).json(utilityCore.createResponse({},404,'Failed to find post.'));
        }
        next();
    }).catch((error) => {
        res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
    });
   
    // console.log('Successfuly retrieved article', data[0].posts[req.params.postId]);
   
});

postRouter.patch('/:postId', auth, (req, res, next) => {
    // Edit article with a given ID
    PostController.update(req.body).then((post)=>{
        if (!post) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to find post.'));
        } else if(post){
                const data = {};
                 if(req.body.isGif == 'true'){
                    data.gifId = post.id
                    data.message = 'GIF image was successfully posted';
                    data.createdOn = post.createdAt
                    data.title = post.title
                    data.imageUrl = post.post
                     data.flag = post.flaged
                 }else{
                     data.articleId = post.id
                     data.message = 'Article was successfully posted';
                     data.createdOn = post.createdAt
                     data.title = post.title
                     data.post = post.post
                     data.flag = post.flaged
                 }
                res.status(200).json(utilityCore.createResponse(data, 200,'Successfully edited post.'));
        }else{          
            res.status(404).json(utilityCore.createResponse({},404,'Failed to find post.'));
        }
        next();
    })
    .catch((error) => {
        res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
    });
});

postRouter.patch('/:postId/flag', auth, (req, res, next) => {
    // Flag article with a given ID
    PostController.update({ id: req.params.postId, flaged: req.params.flag}).then((post) => {
        if (!post) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to find post.'));
        } else if (post) {
            const data = {};
            if (req.body.isGif == 'true') {
                data.gifId = post.id
                data.message = 'GIF image was successfully posted';
                data.createdOn = post.createdAt
                data.title = post.title
                data.flag = post.flaged
                data.imageUrl = post.post
                data.flag = post.flaged
            } else {
                data.articleId = post.id
                data.message = 'Article was successfully posted';
                data.createdOn = post.createdAt
                data.flag = post.flaged
                data.title = post.title
                data.post = post.post
                data.flag = post.flaged
            }
            res.status(200).json(utilityCore.createResponse(data, 200, 'Successfully flaged post.'));
        } else {
            res.status(404).json(utilityCore.createResponse({}, 404, 'Failed to find post.'));
        }
        next();
    }).catch((error) => {
            res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
        });
});

postRouter.delete('/:postId', auth, (req, res, next) => {
    // Delete article with a given ID
    PostController.update({id:req.params.postId}).then((isDeleted) => {
        if (!isDeleted) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to find post.'));
        } else {
            const data = {}
            data.message = 'Post successfully deleted'
            res.status(203).json(utilityCore.createResponse(data,203,'Successfully Deleted post.'));
        }
        next();
    })
        .catch((error) => {
            res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
        });
    
});

postRouter.use('/:postId/comments', commentsRoute);


module.exports = postRouter;