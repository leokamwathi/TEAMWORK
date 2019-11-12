const express = require('express');
const data = require('../model/posts');
const commentsRoute = require('./commentsRoute');

const postRouter = express.Router();
 
postRouter.get('/', (req, res, next) => {
    // Retrive all the latest articles and gifs
    res.status(200).json(data[0].posts);
    console.log('Successfuly retrived all articles feed');
    next();
});

postRouter.post('/', (req, res, next) => {
    // Create new article
    res.status(200).json(data[0].posts[req.params.id]);
    console.log('Successfuly retrived article');
    next();
});

postRouter.get('/:postId', (req, res, next) => {
    // Retrive article with a given ID
    res.status(200).json(data[0].posts[req.params.postId]);
    console.log('Successfuly retrived article');
    next();
});

postRouter.patch('/:postId', (req, res, next) => {
    // Edit article with a given ID
    res.status(200).json(data[0].posts[req.params.postId]);
    console.log('Successfuly retrived article');
    next();
});

postRouter.patch('/:postId/flag', (req, res, next) => {
    // Upvote or Downvote an article with a given ID
    res.status(200).json(data[0].posts[req.params.postId]);
    console.log('Successfuly retrived article');
    next();
});

postRouter.delete('/:postId', (req, res, next) => {
    // Delete article with a given ID
    res.status(200).json(data[0].data[req.params.postId]);
    console.log('Successfuly retrived article');
    next();
});

postRouter.use('/:postId/comments', commentsRoute);


module.exports = postRouter;