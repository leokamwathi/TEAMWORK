const Sequelize = require('sequelize');
const sequelize = require('../db/connection');

const {Model} = Sequelize;

class User extends Model { }
User.init({
    // attributes
    id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        allowNull: false,
        autoIncrement:true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    jobRole: {
        type: Sequelize.STRING
    },
    department: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
}, {
    sequelize,
    timestamps: true,
    modelName: 'user'
    // options
});



/*

const users = [
    {
        'users': [
            {
                'firstName': 'Gwen',
                'lastName': 'Stacey',
                'email': 'gwen.stacey@teamwork.com',
                'password': '$2b$10$ge2YuV6OQ7WUvc.NlmtGx.EOlszrB6uCFWNLtwUKydt5gLcQmc40O',
                'gender': 'female',
                'jobRole': 'Web Developer',
                'department': 'IT',
                'address': 'P.O.Box 12345, Nairobi,Kenya',
                'isAdmin':'true',
            }, {
                'firstName': 'Mary',
                'lastName': 'Jane',
                'email': 'mary.jane@teamwork.com',
                'password': '$2b$10$3MWQw1gZ5Z/WeqyqpJLmGu.e9hipUHvvmrmtMPlxZSzfrwbBLDnfS',
                'gender': 'female',
                'jobRole': 'Graphics Designer',
                'department': 'IT',
                'address': 'P.O.Box 987654, Nairobi,Kenya',
                'isAdmin': 'false',
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
            },
        ]
    }
];
*/
module.exports = User;

