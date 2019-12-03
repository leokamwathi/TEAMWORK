// Handels Articles and gifs.


const Sequelize = require('sequelize');
const sequelize = require('../db/connection');
const Post = require('./postModel');
const User = require('./userModel');

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
    postId: {
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
    isTest: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    sequelize,
    timestamps: true,
    modelName: 'comment'
    // options
});
Comment.belongsTo(Post, { foreignKey: 'postId' });
Comment.belongsTo(User, { foreignKey: 'authorId' });
module.exports = Comment;
