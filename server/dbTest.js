
const userController = require('./controller/userController');
const postController = require('./controller/postController');
const commentController = require('./controller/commentController');

/*
postController.update({
    'id': 1,
    'flaged': 'false',
    'banned': 'false',
}).then(()=>{

}).catch(()=>{

})
*/
/*
userController.create({
    'firstName': 'Gwen',
    'lastName': 'Stacey',
    'email': 'gwen.stacey@teamwork.com',
    'password': '$2b$10$ge2YuV6OQ7WUvc.NlmtGx.EOlszrB6uCFWNLtwUKydt5gLcQmc40O',
    'gender': 'female',
    'jobRole': 'Web Developer',
    'department': 'IT',
    'address': 'P.O.Box 12345, Nairobi,Kenya',
    'isAdmin': 'true',
}).then((user)=>{
    // console.log(JSON.stringify(user, null, 4));
    
}).catch((error)=>{
    console.log(error);
}
)
*/
/*
postController.create({
    'title': 'Cats Love Fish',
    'post': 'It true ask any cat',
    'isGif': 'false',
    'authorId': 1,
}).then((post) => {
    if (post) {
        // console.log(JSON.stringify(post, null, 4));
    } else {
        console.log('nothing returned');
    }
}).catch((error) => {
    console.log(error);
})
*/

/*
commentController.create({
    'comment': 'It true ask any cat',
    'authorId': 1,
    'PostId':2
}).then((post) => {
    if (post) {
        // console.log(JSON.stringify(post, null, 4));
    } else {
        console.log('nothing returned');
    }
}).catch((error) => {
    console.log(error);
})
*/

/*
userController.update({
    'id': 2,
    'email': 'mary.jane@teamwork.com',
    'jobRole':'CFO',
})

userController.update({
    'id': 3,
    'email': 'Peter.parker@teamwork.com',
})
*/

/*
commentController.update({
    'id': 1,
    'comment': 'The sun will always shine no matter how dark the night gets.',
    'authorId':3,
    'postId':1
})
*/

postController.findAll().then((posts) => {
    console.log(JSON.stringify(posts, null, 4));
}).catch((error)=>{
    console.log(error);
});


userController.findAll().then((users) => {
    console.log(JSON.stringify(users, null, 4));
}).catch((error) => {
    console.log(error);
});

commentController.findAll().then((comments) => {
    console.log(JSON.stringify(comments, null, 4));
}).catch((error) => {
    console.log(error);
});



// JSON.stringify(users, null, 4)

/*
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
*/


