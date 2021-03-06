
// 'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comments', {
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
        references: {
            model: "Users",
            key: "id"
          }
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
            model: "Posts",
            key: "id"
          }
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('comments');
  }
};


/*
authorId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
*/