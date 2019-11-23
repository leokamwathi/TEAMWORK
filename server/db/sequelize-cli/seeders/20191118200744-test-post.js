
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('posts', [
      
      /*
      {
        'title': 'Happy Day',
        'post': 'Today will be a fantastic day.',
        'isGif': 'false',
        'authorId': 2,
        'flaged': 'false',
        'isTest': 'false',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        'title': 'Cats',
        'post': 'https://res.cloudinary.com/leokamwathi/image/upload/t_media_lib_thumb/v1574284721/sb9cokyrwtksxafgd1tj.jpg',
        'isGif': 'true',
        'authorId': 1,
        'flaged': 'false',
        'isTest': 'false',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        'title': 'Always Keep tring.',
        'post': 'I am alive today because I never gaveup yestarday.',
        'isGif': 'false',
        'authorId': 3,
        'flaged': 'false',
        'isTest': 'false',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        'title': 'Sunshine',
        'post': 'No matter how dark its gets. The sun will always shine.',
        'isGif': 'false',
        'authorId': 3,
        'flaged': 'false',
        'isTest': 'false',
        createdAt: new Date(),
        updatedAt: new Date()
        
      }, 
      */
      {
        'title': 'Happy Day test',
        'post': 'Today will be a fantastic day.',
        'isGif': 'false',
        'authorId': 2,
        'flaged': 'false',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        'title': 'Cats test',
        'post': 'https://res.cloudinary.com/leokamwathi/image/upload/t_media_lib_thumb/v1574284721/sb9cokyrwtksxafgd1tj.jpg',
        'isGif': 'true',
        'authorId': 1,
        'flaged': 'false',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        'title': 'Always Keep tring test.',
        'post': 'I am alive today because I never gaveup yestarday.',
        'isGif': 'false',
        'authorId': 3,
        'flaged': 'false',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        'title': 'Sunshine test',
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