// Handels Articles and gifs.


const Sequelize = require('sequelize');
const sequelize = require('../db/connection');
const Post = require('./postModel'); 

const {Model} = Sequelize;

class Comment extends Model {}
Comment.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false
    },
    authorId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    flaged: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    banned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
}, {
    sequelize,
    timestamps: true,
    modelName: 'comment'
    // options
});

Comment.belongsTo(Post, { foreignKey: 'PostId' });
module.exports = Comment;

/*


const comments = [
{
    'comments': [
        {
            'id': 1,
            'postID': 1,
            'createdOn': '07-05-2019',
            'comment': 'This is a comment post 1.',
            'isGif': 'false',
            'authorId': 2,
            'flaged': 'false',
        },
        {
            'id': 2,
            'postID': 1,
            'createdOn': '07-05-2019',
            'comment': 'This is a second comment post 1.',
            'isGif': 'false',
            'authorId': 2,
            'flaged': 'false',
        },
        {
            'id': 2,
            'postID': 2,
            'createdOn': '07-05-2019',
            'comment': 'This is a second comment post 2.',
            'isGif': 'false',
            'authorId': 1,
            ''flaged': 'false',
        },
        {
            'id': 2,
            'postID': 2,
            'createdOn': '07-05-2019',
            'comment': 'This is a second comment post 2.',
            'isGif': 'false',
            'authorId': 3,
            'flaged': 'false',
        },
        {
            'id': 2,
            'postID': 3,
            'createdOn': '07-05-2019',
            'comment': 'This is a second comment post 3.',
            'isGif': 'false',
            'authorId': 3,
           'flaged': 'false',
        },
        {
            'id': 2,
            'postID': 3,
            'createdOn': '07-05-2019',
            'comment': 'This is a second comment post 3.',
            'isGif': 'false',
            'authorId': 1,
            'flaged': 'false',
        }
    ]
}];

module.exports = comments;*

*/