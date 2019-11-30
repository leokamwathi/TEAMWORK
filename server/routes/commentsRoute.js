const express = require('express');
const { CommentController, Op } = require('../controller/commentController');
const utilityCore = require('../middleware/utilityCore');
const auth = require('../middleware/auth');

const commentsRouter = express.Router({mergeParams: true});

commentsRouter.get('/', auth, (req, res, next) => {
    const {postId} = req.params;
    CommentController.findAll({postId}).then((comments) => {
        const datas = []
        comments.forEach(comment => {
            const data = {}
            data.commentId = comment.id
            data.comment = comment.comment
            data.createdOn = comment.createdAt
            data.authourId = comment.authourId
            data.postId = comment.postId
            data.flag = comment.flaged
        datas.push(data)
        });
        res.status(200).json(utilityCore.createResponse(datas, 200,'Successfully retrieved the comments.'));
        next();
    }).catch((error) => {
        res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
    });
});


commentsRouter.get('/:commentId', auth, (req, res, next) => {
    CommentController.findOne({ id: req.params.commentId }).then((comment) => {
        if (!comment) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to find the comment.'));
        } else {
            const data = {}
            data.commentId = comment.id
            data.comment = comment.comment
            data.createdOn = comment.createdAt
            data.authourId = comment.authourId
            data.postId = comment.postId
            data.flag = comment.flaged
            res.status(200).json(utilityCore.createResponse(data, 200,'Successfully retrieved comment.'));
            next();
        }
    }).catch((error) => {
        res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
    });
    // console.log('Successfuly retrieved article', data[0].posts[req.params.postId]);
});

// Fix #24 As an Employee, I want to be able to comment on other employees articles, So that other employees can view my comment on the website
// Fix #31 As an Employee, I want to be able to comment on other employees gifs, So that other employees can view my comment on the website
commentsRouter.post('/', auth, (req, res, next) => {
    // Create new comment
    const newComment = req.body;
    // comment['postId'] = req.params.postId;
    // console.log("COMMENT",comment);
    CommentController.create(newComment).then((comment) => {
        if (comment) {
            const data = {}
            data.commentId = comment.id
            data.comment = comment.comment
            data.createdOn = comment.createdAt
            data.authourId = comment.authourId
            data.postId = comment.postId
            data.flag = comment.flaged
            res.status(201).json(utilityCore.createResponse(comment,201,'Successfully posted comment'));
            
        } else {
            return res.status(403).json(utilityCore.createResponse({},403,'Failed to post the Comment.'));
        }
        next();
    }
    ).catch((error) => {
       // console.log('ERROR!!!!!!!!!!!',error);
        res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
    });
});

// Edit comment
commentsRouter.patch('/:commentId', auth, (req, res, next) => {
    // Edit article with a given ID
    CommentController.update(req.body).then((comment) => {
        if (!comment) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to find the comment.'));
        } else {
            const data = {}
            data.commentId = comment.id
            data.comment = comment.comment
            data.createdOn = comment.createdAt
            data.authourId = comment.authourId
            data.postId = comment.postId
            data.flag = comment.flaged
            res.status(201).json(utilityCore.createResponse({},201,'Successfully edited comment.'));
        }
        next();
    })
        .catch((error) => {
           // console.log("ERROR>><<<",error);
            res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request.'));
        });
});


commentsRouter.delete('/:commentId', auth, (req, res, next) => {
    // Delete comments with a given ID
    CommentController.update({ id: req.params.commentId }).then((isDeleted) => {
        if (!isDeleted) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to delete comment.'));
        } else {
            const data = {}
            data.message = 'Comment successfully deleted'
            res.status(203).json(utilityCore.createResponse(data,203,'Successfully deleted comment.'));
            next();
        }
    })
        .catch((error) => {
            res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
        });

});

// Fix #25 As an Employee, I want to be able to flag inappropriate comments, So that the admin can delete them from the website
commentsRouter.patch('/:commentId/flag', auth, (req, res, next) => {
    // Flag a comment with a given ID
    CommentController.update({ id: req.params.commentId, flaged: req.params.flag }).then((comment) => {
        if (!comment) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to flag comment'));
        } else {
            const data = {}
            data.commentId = comment.id
            data.comment = comment.comment
            data.createdOn = comment.createdAt
            data.authourId = comment.authourId
            data.postId = comment.postId
            data.flag = comment.flaged
            res.status(201).json(utilityCore.createResponse({},201,'Successfully flaged comment.'));
            next();
        }
        
    })
        .catch((error) => {
            res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
        });
    
});

module.exports = commentsRouter;