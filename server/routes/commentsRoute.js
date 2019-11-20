const express = require('express');
const { CommentController, Op } = require('../controller/commentController');
const utilityCore = require('../middleware/utilityCore');
const auth = require('../middleware/auth');

const commentsRouter = express.Router({mergeParams: true});

commentsRouter.get('/', auth, (req, res, next) => {
    CommentController.findAll().then((comments) => {
        res.status(200).json(utilityCore.createResponse(comments, 200,'Successfully retrieved the comments.'));
        next();
    }).catch((error) => {
        res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
    });
});


commentsRouter.get('/:commentId', auth, (req, res, next) => {
    CommentController.findOne({ id: req.params.commentId }).then((results) => {
        if (!results) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to find the comment.'));
        } else {
            res.status(200).json(utilityCore.createResponse(results, 200,'Successfully retrieved comment.'));
            next();
        }
    }).catch((error) => {
        res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
    });

    // console.log('Successfuly retrieved article', data[0].posts[req.params.postId]);
   

});


commentsRouter.post('/', auth, (req, res, next) => {
    // Create new comment
    const comment = req.body;
    // comment['postId'] = req.params.postId;
    // console.log("COMMENT",comment);
    CommentController.create(comment).then((isPosted) => {
        if (isPosted) {
            res.status(201).json(utilityCore.createResponse({},201,'Successfully posted comment'));
            
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
    CommentController.update(req.body).then((editedComment) => {
        if (!editedComment) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to find the comment.'));
        } else {
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
            res.status(203).json(utilityCore.createResponse({},203,'Successfully deleted comment.'));
            next();
        }
    })
        .catch((error) => {
            res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
        });

});

commentsRouter.patch('/:commentId/flag', auth, (req, res, next) => {
    // Flag a comment with a given ID
    CommentController.update({ id: req.params.commentId, flaged: req.params.flag }).then((editedComment) => {
        if (!editedComment) {
            res.status(404).json(utilityCore.createResponse({},404,'Failed to flag comment'));
        } else {
            res.status(201).json(utilityCore.createResponse({},201,'Successfully flaged comment.'));
            next();
        }
        
    })
        .catch((error) => {
            res.status(403).json(utilityCore.createResponse(error, 403,'Invalid Request'));
        });
    
});

module.exports = commentsRouter;