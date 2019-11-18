// Handels Articles and gifs.


const Sequelize = require('sequelize');
const sequelize = require('../db/connection');
const User = require('./userModel');

const { Model } = Sequelize;
 
class Post extends Model { }

Post.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    post: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isGif: {
        type: Sequelize.BOOLEAN
    },
    authorId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    flaged: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    banned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize,
    timestamps: true,
    modelName: 'post'
    // options
});
Post.belongsTo(User, { foreignKey: 'authorId' });

module.exports = Post;

/*
const posts = [
    {'posts':[
        {
            'id' : 1,
            'createdOn' : '07-05-2019',
            'title' : 'Happy Sunday',
            'post' : 'Today will be a fantastic day.',
            'isGif': 'false',
            'authorId' : 2,
            'flaged': 'false',
        }, {
            'id' : 2,
            'createdOn': '07-05-2019',
            'title' : 'Cats',
            'post': 'https://picsum.photos/300',
            'isGif':'true',
            'authorId' : 3,
            'flaged': 'false',
        }, {
            'id' : 3,
            'createdOn': '07-05-2019',
            'title' : 'Always Keep tring.',
            'post' : 'I am alive today because I never gaveup yestarday.',
            'isGif': 'false',
            'authorId' : 3,
            'flaged': 'false',
        },
    ]}
];

module.exports = posts;

*/
/*

// Handels Articles and gifs.

const posts = [
    {
'data': [
    {
        'id' : 1,
        'createdOn' : '07-05-2019',
        'title' : 'Happy Sunday',
        'post' : 'Today will be a fantastic day.',
        'isGif': 'false',
        'authorId' : 2,
        'comments':[
            {
                'id': 1,
                'postID':1,
                'createdOn': '07-05-2019',
                'comment': 'This is a comment.',
                'isGif': 'false',
                'authorId': 2,
            },
            {
                'id': 2,
                'postID': 1,
                'createdOn': '07-05-2019',
                'comment': 'This is a second comment.',
                'isGif': 'false',
                'authorId': 2,
            }]
}, {
        'id' : 2,
        'createdOn': '07-05-2019',
        'title' : 'Cats',
        'post': 'https://picsum.photos/300',
        'isGif':'true',
        'authorId' : 3,
        'comments': [
            {
                'id': 1,
                'postID': 2,
                'createdOn': '07-05-2019',
                'comment': 'This is a comment for post 2.',
                'isGif': 'false',
                'authorId': 1,
            },
            {
                'id': 2,
                'postID': 3,
                'createdOn': '07-05-2019',
                'comment': 'This is a second comment for post 2.',
                'isGif': 'false',
                'authorId': 2,
            }]
}, {
        'id' : 3,
        'createdOn': '07-05-2019',
        'title' : 'Always Keep tring.',
        'post' : 'I am alive today because I never gaveup yestarday.',
        'isGif': 'false',
    'authorId' : 3,
},
]
}];

module.exports = posts;

*/