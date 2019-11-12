const express = require('express');
const comments = require('../model/comments');

const commentsRouter = express.Router({ mergeParams: true });

commentsRouter.get('/', (req, res, next) => {
    // Retrive all the latest articles and gifs
    // comments[0].comments.filter(d => d.authorId === req.params.postId)
    res.status(200).json(comments[0].comments.filter(d => d.authorId == req.params.postId));
    console.log('Successfuly retrived all articles feed');
    next();
});

commentsRouter.post('/', (req, res, next) => {
    // Create new article
    res.status(200).json(comments[0].comments.push(req));
    console.log('Successfuly retrived article');
    next();
});

commentsRouter.get('/:id', (req, res, next) => {
    // Retrive article with a given ID
    res.status(200).json(comments);
    console.log('Successfuly retrived article');
    next();
});

commentsRouter.patch('/:id', (req, res, next) => {
    // Edit article with a given ID
    res.status(200).json(comments);
    console.log('Successfuly retrived article');
    next();
});

commentsRouter.patch('/:id/flag', (req, res, next) => {
    // Upvote or Downvote an article with a given ID
    res.status(200).json(comments);
    console.log('Successfuly retrived article');
    next();
});

commentsRouter.delete('/:id', (req, res, next) => {
    // Delete article with a given ID
    res.status(200).json(comments);
    console.log('Successfuly retrived article');
    next();
});

module.exports = commentsRouter;