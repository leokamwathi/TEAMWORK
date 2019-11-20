

const {UserController} = require('./controller/userController');
const {PostController,Op} = require('./controller/postController');
const {CommentController} = require('./controller/commentController');
/*
const viewTestUsers = async () => {
    await UserController.findAll().then((users) => {
        console.log("Current Users",JSON.stringify(users, null, 4));
    }).catch((error) => {
        console.log(error);
    });
}

const recreateTestUsers = async () => {

    [
        {
            'id': '1',
            'firstName': 'Gwen',
            'lastName': 'Stacey',
            'email': 'gwen.stacey@teamwork.com',
            'password': '$2b$10$ge2YuV6OQ7WUvc.NlmtGx.EOlszrB6uCFWNLtwUKydt5gLcQmc40O', // spidergwen
            'gender': 'female',
            'jobRole': 'Reporter',
            'department': 'Television',
            'address': 'P.O.Box 12345, Nairobi,Kenya',
            'isAdmin': 'true',
        },
        {
            'id': '2',
            'firstName': 'Mary',
            'lastName': 'Jane',
            'email': 'mary.jane@teamwork.com',
            'password': '$2b$10$3MWQw1gZ5Z/WeqyqpJLmGu.e9hipUHvvmrmtMPlxZSzfrwbBLDnfS', // spiderwoman
            'gender': 'female',
            'jobRole': 'Model',
            'department': 'Film',
            'address': 'P.O.Box 987654, Nairobi,Kenya',
            'isAdmin': 'false',
        },
        {
            'id': '3',
            'firstName': 'Peter',
            'lastName': 'Parker',
            'email': 'peter.parker@teamwork.com',
            'password': '$2b$10$YpVO7dyQJ.INvVvSYycYgOz.WkgCGN15.8WmvD.PU9C7xLa4wmj0u', // spiderman
            'gender': 'male',
            'jobRole': 'Photographer',
            'department': 'Newspaper',
            'address': 'P.O.Box 147258, Nairobi,Kenya',
            'isAdmin': 'false',
        },
        {
            'id': '4',
            'firstName': 'Miles',
            'lastName': 'Morales',
            'email': 'Miles.Morales@teamwork.com',
            'password': '$2b$10$YpVO7dyQJ.INvVvSYycYgOz.WkgCGN15.8WmvD.PU9C7xLa4wmj0u', // spiderman
            'gender': 'male',
            'jobRole': 'DJ',
            'department': 'Club Mix',
            'address': 'P.O.Box 147258, Nairobi,Kenya',
            'isAdmin': 'false',
        }
    ].forEach(async (user)=>{
        await UserController.updateOrCreate(user)
        .catch((error)=>{
            console.log(error);
        })
    })

    viewTestUsers();
    
   
    // await UserController.updateAll().then(() => {
    //     console.log('Users Created');
    //     viewTestUsers();
    //     return (true)
    // }).catch((error) => {
    //     console.log(error);
    //     return (false)
    // }
    // )
   
}
*/
const getRandomTestIDs = (Model = 'user') => {
        if (Model == 'user') {
            return UserController.findAll({isTest:true}).then((rows) => {
                const ids = rows.map((row) => {return row.id})
                return ids
            })
        }
    if (Model == 'post') {
        return PostController.findAll({ isTest: true }).then((rows) => {
            const ids = rows.map((row) => { return row.id })
            return ids
        })
    }
    if (Model == 'comment') {
        return CommentController.findAll({ isTest: true }).then((rows) => {
            const ids = rows.map((row) => { return row.id })
            return ids
        })
    }
}

getRandomTestIDs('user').then((ids)=>{
    console.log('USER IDS', ids);
}).catch((error)=>{
    console.log('Error', error);
});

getRandomTestIDs('post').then((ids) => {
    console.log('POST IDS', ids);
}).catch((error) => {
    console.log('Error', error);
});


getRandomTestIDs('comment').then((ids) => {
    console.log('COMMENT IDS', ids);
}).catch((error) => {
    console.log('Error', error);
});


const deleteData = async () => {

    return 
    /*
    CommentController.findAll().then((comments) => {
        console.log('Comments',JSON.stringify(comments, null, 4));
    }).catch((error) => {
        console.log(error);
    });

    PostController.findAll().then((posts) => {
        console.log('Posts',JSON.stringify(posts, null, 4));
    }).catch((error) => {
        console.log(error);
    });

    UserController.findAll().then((users) => {
        console.log('Users',JSON.stringify(users, null, 4));
    }).catch((error) => {
        console.log(error);
    });

// Delete Everything
/*
    CommentController.dropTable().then(() => {
        console.log('Table Comments Droped');
        PostController.dropTable().then(() => {
            console.log('Table Posts Droped');
            UserController.dropTable().then(() => {
                console.log('Table Users Droped');
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });

     */
     

/*

    await CommentController.dropTable().then(() => {
        console.log('Table Comments Droped');
        PostController.dropTable().then(() => {
            console.log('Table Post Droped');
            UserController.dropTable().then(() => {
                console.log('Table Users Droped');
                createTestUsers();
            }).catch((error) => {
                console.log(error);
            });
        }
        ).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });

    /*
    if (commentsTableDeleted) {
        const postTableDeleted = await PostController.dropTable().then(() => {
            console.log('Table Post Droped');
        }).catch((error) => {
            console.log(error);
        });
        if (postTableDeleted) {
            const userTableDeleted = await UserController.dropTable().then(() => {
                console.log('Table Users Droped');
            }).catch((error) => {
                console.log(error);
            });
        }
    }

*/

    if (true){
        /*
    const userTableCreated = await UserController.createTable().then(() => {
        console.log('Table Created');
    }).catch((error) => {
        console.log(error);
    });

        if (userTableCreated){
            const usersCreated = await UserController.createSycnAll([{
                'firstName': 'Gwen',
                'lastName': 'Stacey',
                'email': 'gwen.stacey@teamwork.com',
                'password': '$2b$10$ge2YuV6OQ7WUvc.NlmtGx.EOlszrB6uCFWNLtwUKydt5gLcQmc40O', // spidergwen
                'gender': 'female',
                'jobRole': 'Reporter',
                'department': 'Television',
                'address': 'P.O.Box 12345, Nairobi,Kenya',
                'isAdmin': 'true',
                },
                {
                    'firstName': 'Mary',
                    'lastName': 'Jane',
                    'email': 'mary.jane@teamwork.com',
                    'password': '$2b$10$3MWQw1gZ5Z/WeqyqpJLmGu.e9hipUHvvmrmtMPlxZSzfrwbBLDnfS', // spiderwoman
                    'gender': 'female',
                    'jobRole': 'Model',
                    'department': 'Film',
                    'address': 'P.O.Box 987654, Nairobi,Kenya',
                    'isAdmin': 'false',
                },
                {
                    'firstName': 'Peter',
                    'lastName': 'Parker',
                    'email': 'peter.parker@teamwork.com',
                    'password': '$2b$10$YpVO7dyQJ.INvVvSYycYgOz.WkgCGN15.8WmvD.PU9C7xLa4wmj0u', // spiderman
                    'gender': 'male',
                    'jobRole': 'Photographer',
                    'department': 'Newspaper',
                    'address': 'P.O.Box 147258, Nairobi,Kenya',
                    'isAdmin': 'false',
                }
            ]).then(()=>{
                return(true)
            }).catch((error) => {
                console.log(error);
                return (false)
            }
            )
            if (usersCreated){
                await UserController.findAll().then((users) => {
                    console.log(JSON.stringify(users, null, 4));
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
        */
    }
    

    // Create Users

   

  

    
}

deleteData()

// recreateTestUsers()

// createTestData();

/*
    await CommentController.findAll().then((comments) => {
        // console.log(JSON.stringify(posts, null, 4));
        comments.forEach(comment => {
            PostController.delete(comment.id).catch((error) => {
                console.log(error);
            });
        });
    }).catch((error) => {
        console.log(error);
    });

    await PostController.findAll().then((posts) => {
        // console.log(JSON.stringify(posts, null, 4));
        posts.forEach(post => {
            PostController.delete(post.id).catch((error) => {
                console.log(error);
            });
        });
    }).catch((error) => {
        console.log(error);
    });
*/
    /*
    await UserController.findAll().then((users) => {
        // console.log(JSON.stringify(posts, null, 4));
        users.forEach(user => {
            console.log(`Deleting UserID ${user.id}`);
            PostController.delete(user.id).catch((error) => {
                console.log(error);
            });
        });
    }).catch((error) => {
        console.log(error);
    });
*/

    
/*
    await UserController.findAll().then((users) => {
        console.log(JSON.stringify(users, null, 4));
    }).catch((error) => {
        console.log(error);
    });

    await PostController.findAll().then((posts) => {
        console.log(JSON.stringify(posts, null, 4));
    }).catch((error) => {
        console.log(error);
    });

    await CommentController.findAll().then((comments) => {
        console.log(JSON.stringify(comments, null, 4));
    }).catch((error) => {
        console.log(error);
    });

*/
    /*
    await CommentController.deleteAll().catch((error) => {
        console.log(error);
    });
    await PostController.deleteAll().catch((error) => {
        console.log(error);
    });
    await UserController.deleteAll().catch((error) => {
        console.log(error);
    });
    
    await UserController.findAll().then((users) => {
        console.log(JSON.stringify(users, null, 4));
    }).catch((error) => {
        console.log(error);
    });
    
    await PostController.findAll().then((posts) => {
        console.log(JSON.stringify(posts, null, 4));
    }).catch((error) => {
        console.log(error);
    });

    await CommentController.findAll().then((comments) => {
        console.log(JSON.stringify(comments, null, 4));
    }).catch((error) => {
        console.log(error);
    });

*/

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
/*
PostController.findOne({
    'id': '3',
}).then((posts) => {
    console.log(JSON.stringify(posts, null, 4));
}).catch((error) => {
    console.log(error);
});


PostController.findAll({
    'id': {
        [Op.gt]: 2},
}).then((posts) => {
    console.log(JSON.stringify(posts, null, 4));
}).catch((error)=>{
    console.log(error);
});

/*

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

*/

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


