
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      'firstName': 'Gwen',
      'lastName': 'Stacey',
      'email': 'gwen.stacey@teamwork.com',
      'password': '$2b$10$ge2YuV6OQ7WUvc.NlmtGx.EOlszrB6uCFWNLtwUKydt5gLcQmc40O',
      'gender': 'female',
      'jobRole': 'Web Developer',
      'department': 'IT',
      'address': 'P.O.Box 12345, Nairobi,Kenya',
      'isAdmin': 'true',
      'isTest': 'true',
      createdAt: new Date(),
      updatedAt: new Date()
    },
      {
        'firstName': 'Mary',
        'lastName': 'Jane',
        'email': 'mary.jane@teamwork.com',
        'password': '$2b$10$3MWQw1gZ5Z/WeqyqpJLmGu.e9hipUHvvmrmtMPlxZSzfrwbBLDnfS',
        'gender': 'female',
        'jobRole': 'Graphics Designer',
        'department': 'IT',
        'address': 'P.O.Box 987654, Nairobi,Kenya',
        'isAdmin': 'false',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        'firstName': 'Peter',
        'lastName': 'Parker',
        'email': 'peter.parker@teamwork.com',
        'password': '$2b$10$YpVO7dyQJ.INvVvSYycYgOz.WkgCGN15.8WmvD.PU9C7xLa4wmj0u',
        'gender': 'male',
        'jobRole': 'Web Developer',
        'department': 'IT',
        'address': 'P.O.Box 147258, Nairobi,Kenya',
        'isAdmin': 'false',
        'isTest': 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {isTest:true}, {});
  }
};