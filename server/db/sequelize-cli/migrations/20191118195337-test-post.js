// 'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts', {
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
        references: {
            model: "Users",
            key: "id"
          }
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
    return queryInterface.dropTable('posts');
  }
};


/*
 authorId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
*/


// 'CustomerId',
//       {
//         type: Sequelize.UUID,
//         references: {
//           model: 'Customers', // name of Target model
//           key: 'id', // key in Target model that we're referencing
//         },