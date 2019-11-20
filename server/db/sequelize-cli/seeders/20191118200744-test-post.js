
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('posts', [
      {
        'title': 'Happy Day',
        'post': 'Today will be a fantastic day.',
        'isGif': 'false',
        'authorId': 2,
        'flaged': 'false',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        'title': 'Cats',
        'post': 'https://picsum.photos/300',
        'isGif': 'true',
        'authorId': 1,
        'flaged': 'false',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        'title': 'Always Keep tring.',
        'post': 'I am alive today because I never gaveup yestarday.',
        'isGif': 'false',
        'authorId': 3,
        'flaged': 'false',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        'title': 'Sunshine',
        'post': 'No matter how dark its gets. The sun will always shine.',
        'isGif': 'false',
        'authorId': 3,
        'flaged': 'false',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
        
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('posts', { isTest: true }, {});
  }
};