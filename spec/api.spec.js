const Request = require("request");
const jwt = require('jsonwebtoken');
const { UserController, Op } = require('../server/controller/userController');
const { PostController} = require('../server/controller/postController');
const { CommentController } = require('../server/controller/commentController');
const server = require('../server/server');

/*

beforeEach((done) => {
    server.run(done);
});


afterEach((done) => {
    server.close(done);
});
*/

const apiEndpointUrl = 'http://localhost:3000/api/v1';
const postKeys = ['id', 'title', 'post', 'isGif', 'authorId', 'flaged', 'banned', 'createdAt', 'updatedAt'];
const commentKeys = ['id', 'comment', 'authorId', 'flaged', 'banned', 'createdAt', 'updatedAt'];
// const userKeys = ['id', 'firstName', 'lastName', 'email', 'password', 'gender', 'jobRole', 'department', 'address', 'isAdmin'];
const successKeys = ['message'];
const signinKeys = ['userId', 'token'];
const postedKeys = ['message'];
const deleteKeys = ['message'];
const errorKeys = ['error'];
const userData = {};
const testDebug = false;
const testUserIds = [];
const testPostIds = [];
const testCommentIds = [];



// jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// jasmine.loadConfig({
//     random: false,
// });



/**
 * Status Codes 
 */

// {statusCode:'statusMessage'}
const statusCodeStatus = (code) => { 
switch (code) {
    case 200:
        return 'success';
    case 201:
        return 'success';
    case 203:
        return 'success';
    case 401:
        return 'error';
    case 403:
        return 'error';
    case 404:
        return 'error';
    case 500:
        return 'error';
    default:
        return 'error';
}

}

/**
 * Show current test on console if testDebug = true
 * @param {*} msg 
 */

 const debuglog = (msg)=>{
     if (testDebug){
         console.log('\nTESTING ',msg)
     }
 }

/**
 *  Get User Token
 */

const getJWSToken = (userId) => 
{
    const token = jwt.sign(
        { userId },
        'RANDOM_TEAMWORK_SECRET',
        { expiresIn: '24h' });
        userData.userId = userId;
        userData.token = token;
}


const setupAuthUser = (userType='employee') =>{
    userData.userId = null;
    userData.token = null;
    if (userType === 'employee'){
        getJWSToken(2)
        if(!userData.token){
            userData.userId = 2;
            userData.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTU3MzkxNzcwOCwiZXhwIjoxNTc0MDA0MTA4fQ.F8r6EhShY4Ai30GpQ4Xtg_Kqsf0i-PWkYDow9I5PY50';
        }
    }

    if (userType === 'admin') {
        getJWSToken(1)
        if (!userData.token) {
            userData.userId = 1;
            userData.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjAsImlhdCI6MTU3MzkxNzUxNiwiZXhwIjoxNTc0MDAzOTE2fQ.HDykzM6u6YHpVewDa3wirHywu6m4pNf_obNCNDFZoY8';
        }
    }

    if (userType === 'fake') {
            userData.userId = 1000;
            userData.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjAsImlhdCI6MTU3MzkxNzUxNiwiZXhwIjoxNTc0MDAzOTE2fQ.HDykzM6u6YHpVewDa3wirHywu6m4pNf_obNCNDFZoY8';
    }

    if (userType === 'none') {
            userData.userId = 0;
            userData.token = '';        
    }
}

const createAuthRequest = (endpointUrl, postBody = {}, userType='employee') => {
    setupAuthUser(userType)
    const headers = {
        'authorization': `Bearer ${userData.token} ${userData.userId}`,
        'Content-Type': 'application/json',
    };
    // access_token: userData.token,
    // userId: userData.userId,

   const body = postBody;

    const authRequest = {
        headers,
        url: endpointUrl,
        body,
        json: true,
    }
    return authRequest
}

/*
const testStatus = (endpointTest, statusCode, data) => {
    it(`${endpointTest} Status ${statusCode}`, () => {
        expect(data.status).toBe(statusCode);
        expect(data.body.status).toBe(statusCodeStatus(statusCode));
    });
}

const testDataHasKeys = (endpointTest='', testKeys=[], data={}) => {
   // console.log(endpointTest, testKeys, data);
    it(`${endpointTest} Data Has Test Keys.`, () => {
        const responseData = data;
        testKeys.forEach((key) => {
           expect(Object.keys(responseData)).toContain(key);
        });
    });
}
*/


const generateRandomTestIds = async (Model='user') => {
let iD;
    if (Model == 'user') {
        if (testUserIds.length==0) {
          //  console.log(testUserIds.length)
            iD = await UserController.findAll({ isTest: true }).then((rows) => {
                rows.forEach(async row => { testUserIds.push(row.id) })
               console.log(testUserIds);
                return testUserIds[Math.floor(Math.random() * testUserIds.length)];
            })
        } else {
            iD = testUserIds[Math.floor(Math.random() * testUserIds.length)];
        }
    }
    if (Model == 'post') {
        if (testPostIds.length == 0) {
           console.log(testPostIds.length)
            iD = await PostController.findAll({ isTest: true }).then((rows) => {
                rows.forEach(async row => { testPostIds.push(row.id) })
               //  console.log(testPostIds);
                return testPostIds[Math.floor(Math.random() * testPostIds.length)];
            })
        } else {
            iD = testPostIds[Math.floor(Math.random() * testPostIds.length)];
        }
    }
    if (Model == 'comment') {
        if (testCommentIds.length() == 0) {
          //  console.log(testCommentIds.length)
            iD = await CommentController.findAll({ isTest: true }).then((rows) => {
                rows.forEach(async row => { testCommentIds.push(row.id) })
                // console.log(testCommentIds);
                return testCommentIds[Math.floor(Math.random() * testCommentIds.length)];
            })
        } else {
            iD = testCommentIds[Math.floor(Math.random() * testCommentIds.length)];
        }
    }
// console.log(iD);
    return iD
}

const testGetArrayAPI = (endpointTest, endpoint, testKeys, statusCode = 200,userType='employee') => {
    
    describe(`Testing Endpoint: ${endpointTest}`, () => {
        const data = {};
        beforeAll((done) => {
            const apiUrl = apiEndpointUrl + endpoint
            Request.get(createAuthRequest(apiUrl,{}, userType), (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                // console.log(`TESTING ${endpointTest}...`, data.body);
                done();
            })
        });

        afterAll((done)=>{
            debuglog(endpointTest);
            done();
        })
 
        // TODO:See if we can make this work in the future
        // 
        //     // Test status code
        //     testStatus(endpointTest, statusCode, data);
        //     // Test Data Has Given Keys
        //     console.log ("DATA KEYED" , data.body.data[0]);
        //     testDataHasKeys(endpointTest, testKeys, data.body.data[0]);
        // 

        it(`${endpointTest} Status ${statusCode}`, () => {
            expect(data.status).toBe(statusCode);
           // expect(data.body.status).toBe(statusCodeStatus(statusCode));
        });


        // it(`${endpointTest} Data Keys Test.`, () => {
        //     const responseData = data.body.data[0];
        //     testKeys.forEach((key) => {
        //         expect(Object.keys(responseData)).toContain(key);
        //     });
        // });

        if (statusCode == 200) {
            it(`${endpointTest} Test if Data has Keys.`, () => {
                const responseData = data.body.data[0];
                testKeys.forEach((key) => {
                    expect(Object.keys(responseData)).toContain(key);
                });
            });
        } else {
            it(`${endpointTest} Test if response has Keys.`, () => {
                const responseData = data.body;
                testKeys.forEach((key) => {
                    expect(Object.keys(responseData)).toContain(key);
                });
            });
        }

    });
}

const testGetAPI = (endpointTest, endpoint, testKeys=[], statusCode = 200, userType = 'employee') => {
    debuglog(endpointTest);
    describe(`Testing Endpoint: ${endpointTest}`, () => {
        const data = {};
        beforeAll((done) => {
            const apiUrl = apiEndpointUrl + endpoint;
            Request.get(createAuthRequest(apiUrl, {}, userType), (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });

        it(`${endpointTest} Status ${statusCode}`, () => {
            expect(data.status).toBe(statusCode);
            // expect(data.body.status).toBe(statusCodeStatus(statusCode));
        });

            // it(`${endpointTest} Data Keys Test.`, () => {
            //     const responseData = data.body.data;
            //     testKeys.forEach((key) => {
            //         expect(Object.keys(responseData)).toContain(key);
            //     });
            // });

        if (statusCode == 200) {
            it(`${endpointTest} Test if Data has Keys.`, () => {
                const responseData = data.body.data;
                testKeys.forEach((key) => {
                    expect(Object.keys(responseData)).toContain(key);
                });
            });
        } else {
            it(`${endpointTest} Test if response has Keys.`, () => {
                const responseData = data.body;
                testKeys.forEach((key) => {
                    expect(Object.keys(responseData)).toContain(key);
                });
            });
        }

    });
}



const testPostAPI = (endpointTest, endpoint, postData, testKeys, statusCode = 201, userType = 'admin') => {
    describe(`Testing Endpoint: ${endpointTest}`, () => {
        const data = {};
        beforeAll((done) => {
            const apiUrl = apiEndpointUrl + endpoint; 
            Request.post(createAuthRequest(apiUrl, postData, userType), (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                // console.log(`TESTING ${endpointTest}...`, apiUrl, data.body);
                done();
            });
        });

        afterAll((done) => {
            debuglog(endpointTest);
            done();
        })

            it(`${endpointTest} Status ${statusCode}`, () => {
                expect(data.status).toBe(statusCode);
                // expect(data.body.status).toBe(statusCodeStatus(statusCode));
            });

        if (statusCode == 200){
            it(`${endpointTest} Test if Data has Keys.`, () => {
                const responseData = data.body.data;
                testKeys.forEach((key) => {
                    expect(Object.keys(responseData)).toContain(key);
                });
            });
        }else{
            it(`${endpointTest} Test if response has Keys.`, () => {
                const responseData = data.body;
                testKeys.forEach((key) => {
                    expect(Object.keys(responseData)).toContain(key);
                });
            });
        }
            
    
    });
}

const testPatchAPI = (endpointTest, endpoint, postData, testKeys, statusCode = 201, userType = 'employee') => {
    describe(`Testing Endpoint: ${endpointTest}`, () => {
        const data = {};
        beforeAll((done) => {
            const apiUrl = apiEndpointUrl + endpoint
            Request.patch(createAuthRequest(apiUrl, postData, userType), (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });

        afterAll((done) => {
            debuglog(endpointTest);
            done();
        })
        
            it(`${endpointTest} Status ${statusCode}`, () => {
                expect(data.status).toBe(statusCode);
            });

        if (statusCode == 200) {
            it(`${endpointTest} Test if Data has Keys.`, () => {
                const responseData = data.body.data;
                testKeys.forEach((key) => {
                    expect(Object.keys(responseData)).toContain(key);
                });
            });
        } else {
            it(`${endpointTest} Test if response has Keys.`, () => {
                const responseData = data.body;
                testKeys.forEach((key) => {
                    expect(Object.keys(responseData)).toContain(key);
                });
            });
        }
    });
}

const testDeleteAPI = (endpointTest, endpoint, testKeys, statusCode = 203, userType = 'employee') => {
    debuglog(endpointTest);
    describe(`Testing Endpoint: ${endpointTest}`, () => {
        const data = {};
        beforeAll((done) => {
            const apiUrl = apiEndpointUrl + endpoint
            Request.delete(createAuthRequest(apiUrl, {}, userType), (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });

        it(`${endpointTest} Status ${statusCode}`, () => {
            expect(data.status).toBe(statusCode);
        });

            it(`${endpointTest} Test if response has Keys.`, () => {
                const responseData = data.body;
                testKeys.forEach((key) => {
                    expect(Object.keys(responseData)).toContain(key);
                });
            });
        
    });
}





/**
 *  AUTH TESTS
 */

testPostAPI(
    "POST /auth/signin (User can signin)",
    "/auth/signin",
    {
        'email': 'peter.parker@teamwork.com',
        'password': 'spiderman'
    },
    signinKeys,
    200,
    'none'
);

testPostAPI(
    "POST /auth/create (Admin can create user)", 
    "/auth/create", 
    {
        'firstName' : 'Miles',
        'lastName' : 'Morales',
        'email': `miles.morales-${parseInt(Math.random(1000) * 1000000).toString()}@teamwork.com`,
        'password' : 'spiderboy',
        'gender' : 'male',
        'jobRole' : 'Web Designer',
        'department' : 'IT',
        'address' : 'P.O.Box 12345, Nairobi,Kenya',
        'isAdmin':'false',
        'isTest': 'true',
    }, 
    successKeys,
    201,
    'admin'
);

generateRandomTestIds('user').then((userId) => {
    testPatchAPI(
        "PATCH /auth/edit/1",
        "/auth/edit/" + userId,
        {
            'id': userId,
            'lastName': new Date(),
        },
        successKeys,
        201,
        'admin'
    );
})

// ERROR TESTING

testPostAPI(
    "POST /auth/signin (Wrong Password)",
    "/auth/signin",
    {
        'email': 'peter.parker@teamwork.com',
        'password': 'flyman'
    },
    errorKeys,
    401,
    'none'
);

testPostAPI(
    "POST /auth/create (Non Admin cannot create user).",
    "/auth/create",
    {
        'firstName': 'Ben',
        'lastName': 'Parker',
        'email': 'ben.parker@teamwork.com',
        'password': 'uncleben',
        'gender': 'male',
        'jobRole': 'Uncle',
        'department': 'House',
        'address': 'P.O.Box 12345, Nairobi,Kenya',
        'isAdmin': 'false',
        'isTest': 'true',
    },
    errorKeys,
    401,
    'employee'
);

testPatchAPI(
    "PATCH /auth/edit/3 (Non admin cannot edit users)",
    "/auth/edit/3",
    {
        'id': 1,
        'lastName': 'Morales',
    },
    errorKeys,
    401,
    'employee'
);

testPatchAPI(
    "PATCH /auth/edit/3 (Fake authorization token user cannot edit users)",
    "/auth/edit/3",
    {
        'id': 1,
        'lastName': 'Morales',
    },
    errorKeys,
    401,
    'fake'
);

testPatchAPI(
    "PATCH /auth/edit/1000 (Admin cannot edit non existant user)",
    "/auth/edit/1000",
    {
        'id': 1000,
        'firstName':'Bruce',
        'lastName': 'Wyane',
        'isTest': 'true',
    },
    errorKeys,
    404,
    'admin'
);

/**
 *  ARTICLES TESTS
 */

 
testGetArrayAPI(
    "GET /feed",
    "/feed",
    postKeys
);

testGetArrayAPI(
    "GET /feed (None logged is users can view feed)",
    "/feed",
    postKeys,
    200,
    'none'
);

generateRandomTestIds('post').then((postId) => {
testGetAPI(
    "GET /articles/" + postId,
    "/articles/" + postId,
    postKeys
);
})
testPostAPI(
    "POST /articles/",
    "/articles",
    {
        'createdOn': '07-05-2019',
        'title': 'What a day',
        'post': 'It started like any other day.',
        'isGif': 'false',
        'authorId': 4,
        'flags': false,
        'isTest': 'true',
    },
    postedKeys
);

generateRandomTestIds('post').then((postId) => {
testPatchAPI(
    "Patch /articles/" + postId,
    "/articles/" + postId,
    {   
        'id': postId,
        'createdOn': '07-05-2019',
        'title': 'Edited Title',
        'post': 'Edited Post.',
        'isGif': 'false',
        'authorId': 3,
        'isTest': 'true',
    },
    successKeys
);
})

generateRandomTestIds('post').then((postId) => {
testPatchAPI(
    "Patch /articles/" + postId+"/flag (flag article)",
    "/articles/" + postId+"/flag",
    {   
        'flag':'true'
    },
    successKeys
);
})

generateRandomTestIds('post').then((postId) => {
    testPatchAPI(
        "Patch /articles/" + postId + "/flag (unflag article)",
        "/articles/" + postId + "/flag",
        {
            'flag': 'false'
        },
        successKeys
    );
})

generateRandomTestIds('post').then((postId) => {
testDeleteAPI(
    "DELETE /articles/" + postId,
    "/articles/" + postId,
    deleteKeys
);
})

// ERRORS TESTING

testDeleteAPI(
    "DELETE /articles/1000 (Not found error)",
    "/articles/1000",
    errorKeys,
    404
);

testPatchAPI(
    "Patch /articles/1000 (Not found error)",
    "/articles/1000",
    {
        'id': 1000,
        'createdOn': '07-05-2019',
        'title': 'Edited Title',
        'post': 'Edited Post.',
        'isGif': 'false',
        'authorId': 3,
        'isTest': 'true',
    },
    errorKeys,
    404
);

testGetAPI(
    "GET /articles/1000 (Not found error)",
    "/articles/1000",
    errorKeys,
    404
);

testPatchAPI(
    "Patch /articles/1000/flag (not found flag)",
    "/articles/1000/flag",
    {
        'flag': 'true'
    },
    errorKeys,
    404
);


/**
 *  ARTICLE COMMENTS TEST
 */

generateRandomTestIds('post').then((postId) => {
testGetArrayAPI(
    "GET /articles/" + postId+"/comments",
    "/articles/" + postId+"/comments",
    commentKeys
);
});
generateRandomTestIds('post').then((postId) => {
    generateRandomTestIds('comment').then((commentId) => {
testGetAPI(
    "GET /articles/" + postId + "/comments/" + commentId,
    "/articles/" + postId + "/comments/" + commentId,
    commentKeys
);
    })})

generateRandomTestIds('user').then((userId) => {
generateRandomTestIds('post').then((postId) => {
testPostAPI(
    "POST /articles/" + postId+"/comments",
    "/articles/" + postId+"/comments",
    {
        'comment': 'Its a new comment.',
        'authorId': userId,
        'flags': 'false',
        'postId': postId,
        'isTest': 'true',
    },
    successKeys
);
})
});


generateRandomTestIds('post').then((postId) => {
    generateRandomTestIds('comment').then((commentId) => {
testPatchAPI(
    "PATCH /articles/" + postId + "/comments/" + commentId,
    "/articles/" + postId + "/comments/" + commentId,
    {
        'id': commentId,
        'comment': 'Its an edited comment.',
        'authorId': 2,
        'flags': 'false',
        'postId': postId,
        'isTest': 'true',
    },
    successKeys
);
});
});

generateRandomTestIds('post').then((postId) => {
    generateRandomTestIds('comment').then((commentId) => {
testDeleteAPI(
    "DELETE /articles/" + postId + "/comments/" + commentId,
    "/articles/" + postId + "/comments/" + commentId,
    deleteKeys
);
});
});

generateRandomTestIds('post').then((postId) => {
    generateRandomTestIds('comment').then((commentId) => {
testPatchAPI(
    "Patch /articles/" + postId + "/comments/" + commentId+"/flag (flag comment)",
    "/articles/" + postId + "/comments/" + commentId+"/flag",
    {
        'id': commentId,
        'flag': 'true',
        'isTest': 'true',
    },
    successKeys
);
    })})

generateRandomTestIds('post').then((postId) => {
    generateRandomTestIds('comment').then((commentId) => {
        testPatchAPI(
            "Patch /articles/" + postId + "/comments/" + commentId + "/flag (unflag comment)",
            "/articles/" + postId + "/comments/" + commentId + "/flag",
            {
                'id': commentId,
                'flag': 'false',
                'isTest': 'true',
            },
            successKeys
        );
    })
})

// Error testing


testDeleteAPI(
    "DELETE /articles/2/comments/1000 (Not found error)",
    "/articles/2/comments/1000",
    errorKeys,
    404
);

testPatchAPI(
    "Patch /articles/2/comments/1000 (Not found error)",
    "/articles/2/comments/1000",
    {
        'id': 1000,
        'comment': 'Its an edited comment.',
        'authorId': 2,
        'flags': 'false',
        'postId': 3,
        'isTest': 'true',
    },
    errorKeys,
    404
);

testGetAPI(
    "GET /articles/2/comments/1000 (Not found error)",
    "/articles/2/comments/1000",
    errorKeys,
    404
);

testPatchAPI(
    "Patch /articles/2/comments/1000/flag (not found flag)",
    "/articles/2/comments/1000/flag",
    {
        'flag': 'true'
    },
    errorKeys,
    404
);





/**
 *  GIFS TESTS
 */




















 /*


testPostAPI(
    "POST /gifs/",
    "/gifs",
    {
        'createdOn': '07-05-2019',
        'title': 'Funny Gif',
        'post': 'https://picsum.photos/300',
        'isGif': 'true',
        'authorId': 9,
        'flags': false,
        'isTest': 'true',
    },
    postedKeys
);


testGetAPI(
    "GET /gifs/1",
    "/gifs/1",
    postKeys
);


testDeleteAPI(
    "DELETE /gifs/1",
    "/gifs/1",
    deleteKeys
);

testPatchAPI(
    "Patch /gifs/1",
    "/gifs/1",
    {
        'id': 1,
        'createdOn': '07-05-2019',
        'title': 'Edited GIF title',
        'post': 'http://editedgif.url',
        'isGif': 'true',
        'authorId': 5,
        'isTest': 'true',
    },
    successKeys
);

testPatchAPI(
    "Patch /gifs/1/flag (add flag)",
    "/gifs/1/flag",
    {
        'flag': 'true'
    },
    successKeys
);

testPatchAPI(
    "Patch /gifs/2/flag (remove flag)",
    "/gifs/2/flag",
    {
        'flag': 'false'
    },
    successKeys
);

*/

/**
 *  GIFS COMMENTS TEST
 */
/*
testGetArrayAPI(
    "GET /gifs/1/comments",
    "/gifs/1/comments",
    commentKeys
);

testGetAPI(
    "GET /gifs/1/comments/1",
    "/gifs/1/comments/1",
    commentKeys
);

testPostAPI(
    "POST /gifs/1/comments",
    "/gifs/1/comments",
    {
        'comment': 'Its a new comment.',
        'authorId': 4,
        'flags': 'false',
        'postId': 1,
        'isTest': 'true',
    },
    successKeys
);

testPatchAPI(
    "PATCH /gifs/1/comments/4",
    "/gifs/1/comments/4",
    {
        'id': 4,
        'comment': 'Its an edited comment.',
        'authorId': 2,
        'flags': 'false',
        'postId': 3,
        'isTest': 'true',
    },
    successKeys
);

testDeleteAPI(
    "DELETE /gifs/1/comments/2",
    "/gifs/1/comments/2",
    deleteKeys
);

testPatchAPI(
    "Patch /gifs/1/comments/1/flag (add flag)",
    "/gifs/1/comments/1/flag",
    {
        'id': 1,
        'flag': 'true',
    },
    successKeys
);

testPatchAPI(
    "Patch /gifs/2/comments/6/flag (remove flag)",
    "/gifs/2/comments/6/flag",
    {
        'id': 6,
        'flag': 'false',
    },
    successKeys
);

// Error testing


testDeleteAPI(
    "DELETE /gifs/2/comments/1000 (Not found error)",
    "/gifs/2/comments/1000",
    errorKeys,
    404
);

testPatchAPI(
    "Patch /gifs/2/comments/1000 (Not found error)",
    "/gifs/2/comments/1000",
    {
        'id': 1000,
        'comment': 'Its an edited comment.',
        'authorId': 2,
        'flags': 'false',
        'postId': 3,
        'isTest': 'true',
    },
    errorKeys,
    404
);

testGetAPI(
    "GET /gifs/2/comments/1000 (Not found error)",
    "/gifs/2/comments/1000",
    errorKeys,
    404
);

testPatchAPI(
    "Patch /gifs/2/comments/1000/flag (not found flag)",
    "/gifs/2/comments/1000/flag",
    {
        'flag': 'true'
    },
    errorKeys,
    404
);

*/



