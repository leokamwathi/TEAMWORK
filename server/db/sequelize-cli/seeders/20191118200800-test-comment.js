
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('comments', [
      {
        'postId': 1,
        'comment': 'This is a comment post 1.',
        'authorId': 3,
        'flaged': 'false',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        'postId': 1,
        'comment': 'This is a second comment post 1.',
        'authorId': 2,
        'flaged': 'false',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        'postId': 2,
        'comment': 'This is a second comment post 2.',
        'authorId': 1,
        'flaged': 'false',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
        },
      {
        'postId': 3,
        'comment': 'This is a second comment post 2.',
        'authorId': 2,
        'flaged': 'false',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        'postId': 4,
        'comment': 'This is a second comment post 3.',
        'authorId': 2,
        'flaged': 'false',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        'postId': 4,
        'comment': 'What the ****.',
        'authorId': 1,
        'flaged': 'true',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments', { isTest: true }, {});
  }
};