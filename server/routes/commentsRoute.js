const express = require('express');
const comments = require('../model/comments');
const uFunc = require('../middleware/utilityFunc');
const auth = require('../middleware/auth');

const commentsRouter = express.Router({mergeParams: true});

commentsRouter.get('/', auth, (req, res, next) => {
    const results = comments[0].comments.filter(comment => comment.postID == req.params.postId)
    res.status(200).json(uFunc.prepareResult(results,200));
    next();
});


commentsRouter.get('/:commentId', auth, (req, res, next) => {
    // console.log(comments[0].comments[req.params.commentId]);
    const results = comments[0].comments[req.params.commentId]
    res.status(200).json(uFunc.prepareResult(results,200));
    next();
});


commentsRouter.post('/', auth, (req, res, next) => {
    // Create new comment
    const comment = req.body;
    comment.postID = req.params.postId;
    comments[0].comments.push(comment)
    res.status(201).json(uFunc.prepareResult(uFunc.jsonMessage('Article posted successfully created'),201));
    // console.log('Successfuly posted comment to article', comments[0].comments );
    next();
});

// Edit comment
commentsRouter.patch('/:commentId', auth, (req, res, next) => {
    // Edit article with a given ID
    const editedComment = comments[0].comments[req.params.commentId]
    Object.keys(req.body).forEach((key) => {
        editedComment[key] = req.body[key]
    })
    res.status(201).json(uFunc.prepareResult(editedComment,201));
    // console.log('Successfuly edited comment', editedData);
    next();
});


commentsRouter.delete('/:commentId', auth, (req, res, next) => {
    // Delete comments with a given ID
    comments[0].comments = comments[0].comments.filter((comment) => comment.id !== req.body.commentId);
    res.status(203).json(uFunc.prepareResult(uFunc.jsonMessage('Successfully Delted Comment.'),203));
    next();

});

commentsRouter.patch('/:commentId/flag', auth, (req, res, next) => {
    // Flag a comment with a given ID
    const comment = comments[0].comments[req.params.commentId]

    if (req.body.flag === 'true') {
        if (comment.flags.includes(req.body.userId) === false) {
            comment.flags.push(req.body.userId);
        }
    } else {
        comment.flags = comment.flags.filter((uid) => uid !== req.body.userId);
    }

    res.status(201).json(uFunc.prepareResult(comment,201));
    // console.log('Successfuly flaged article', req.body.flag, req.body.userId, post);
    next();
});

module.exports = commentsRouter;