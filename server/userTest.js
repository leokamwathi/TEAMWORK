
const userController = require('./controller/userController');

/*
userController.createSycn({
    'firstName': 'Gwen',
    'lastName': 'Stacey',
    'email': 'gwen.stacey@teamwork.com',
    'password': '$2b$10$ge2YuV6OQ7WUvc.NlmtGx.EOlszrB6uCFWNLtwUKydt5gLcQmc40O',
    'gender': 'female',
    'jobRole': 'Web Developer',
    'department': 'IT',
    'address': 'P.O.Box 12345, Nairobi,Kenya',
    'isAdmin': 'true',
})
*/
// JSON.stringify(users, null, 4)


userController.update(
    {
        'id': 1,
        'jobRole': 'Lead Web Developer',
        'department': 'Management',
    }
).then((done)=>{
console.log(done);

    userController.findAll().then((users) => {
        console.log(JSON.stringify(users, null, 4));
    });

})


