const express = require('express');
const { CommentController, Op } = require('../controller/commentController');
const uFunc = require('../middleware/utilityFunc');
const auth = require('../middleware/auth');

const commentsRouter = express.Router({mergeParams: true});

commentsRouter.get('/', auth, (req, res, next) => {
    CommentController.findAll().then((comments) => {
        res.status(200).json(uFunc.prepareResult(comments, 200));
    }).catch((error) => {
        res.status(401).json(uFunc.prepareResult(error, 401));
    });
    next();
});


commentsRouter.get('/:commentId', auth, (req, res, next) => {
    CommentController.findOne({ id: req.params.commentId }).then((results) => {
        if (!results) {
            res.status(404).json(uFunc.prepareResult(uFunc.jsonMessage('The comment was not found.'), 404));
        } else {
            res.status(200).json(uFunc.prepareResult(results, 200));
        }
    }).catch((error) => {
        res.status(401).json(uFunc.prepareResult(error, 401));
    });

    // console.log('Successfuly retrived article', data[0].posts[req.params.postId]);
    next();

});


commentsRouter.post('/', auth, (req, res, next) => {
    // Create new comment
    const comment = req.body;
    comment.postID = req.params.postId;

    CommentController.create(comment).then((isPosted) => {
        if (isPosted) {
            res.status(201).json(uFunc.prepareResult(uFunc.jsonMessage('Comment successfully posted'), 201));
        } else {
            res.status(401).json(uFunc.prepareResult(uFunc.jsonMessage('Unable to create comment.'), 401));
        }
    }
    ).catch((error) => {
        res.status(401).json(uFunc.prepareResult(error, 401));
    });
    next();
});

// Edit comment
commentsRouter.patch('/:commentId', auth, (req, res, next) => {
    // Edit article with a given ID
 
    CommentController.update(req.body).then((editedPost) => {
        if (!editedPost) {
            res.status(401).json(uFunc.prepareResult(uFunc.jsonMessage('The comment was not found.'), 401));
        } else {
            res.status(201).json(uFunc.prepareResult(editedPost, 201));
        }
    })
        .catch((error) => {
            res.status(401).json(uFunc.prepareResult(error, 401));
        });
    next();

});


commentsRouter.delete('/:commentId', auth, (req, res, next) => {
    // Delete comments with a given ID

    CommentController.update({ id: req.params.commentId }).then((isDeleted) => {
        if (!isDeleted) {
            res.status(401).json(uFunc.prepareResult(uFunc.jsonMessage('The comment was not found.'), 401));
        } else {
            res.status(203).json(uFunc.prepareResult(uFunc.jsonMessage('Successfully deleted comment.'), 203));
        }
    })
        .catch((error) => {
            res.status(401).json(uFunc.prepareResult(error, 401));
        });
    next();

});

commentsRouter.patch('/:commentId/flag', auth, (req, res, next) => {
    // Flag a comment with a given ID
    CommentController.update({ id: req.params.commentId, flaged: true }).then((editedPost) => {
        if (!editedPost) {
            res.status(401).json(uFunc.prepareResult(uFunc.jsonMessage('The comment was not found.'), 401));
        } else {
            res.status(201).json(uFunc.prepareResult(editedPost, 201));
        }
    })
        .catch((error) => {
            res.status(401).json(uFunc.prepareResult(error, 401));
        });
    next();
});

module.exports = commentsRouter;