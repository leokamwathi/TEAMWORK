const Request = require("request");
const jwt = require('jsonwebtoken');
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
const postKeys = ['id', 'createdOn', 'title', 'post', 'isGif', 'authorId'];
const commentKeys = ['id', 'createdOn', 'comment', 'isGif', 'authorId'];
const userKeys = ['id', 'firstName', 'lastName', 'email', 'password', 'gender', 'jobRole', 'department', 'address', 'isAdmin'];
const successKeys = ['statusMessage'];
const signinKeys = ['userId', 'token'];
const postedKeys = ['statusMessage'];
const deleteKeys = ['statusMessage'];
const errorKeys = ['error'];
const userData = {};
// const aminData = {};
// let myToken = '';


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
    case 404:
        return 'error';
    case 500:
        return 'error';
    default:
        return 'error';
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
        getJWSToken(0)
        if (!userData.token) {
            userData.userId = 0;
            userData.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjAsImlhdCI6MTU3MzkxNzUxNiwiZXhwIjoxNTc0MDAzOTE2fQ.HDykzM6u6YHpVewDa3wirHywu6m4pNf_obNCNDFZoY8';
        }
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

   const body = {
        ...postBody
    };

    const authRequest = {
        headers,
        url: endpointUrl,
        body,
        json: true,
    }
    return authRequest
}

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

const testGetArrayAPI = (endpointTest, endpoint, testKeys, statusCode = 200,userType='employee') => {
    describe(`Testing Endpoint: ${endpointTest}`, () => {
        const data = {};
        beforeAll((done) => {
            const apiUrl = apiEndpointUrl + endpoint
            Request.get(createAuthRequest(apiUrl,{}, userType), (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                // console.log(`TESTING ${endpointTest}...`, data.body.status, data.body.data);
                done();
            })
        });
 
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

        it(`${endpointTest} Data Keys Test.`, () => {
            const responseData = data.body.data[0];
            testKeys.forEach((key) => {
                expect(Object.keys(responseData)).toContain(key);
            });
        });

    });
}

const testGetAPI = (endpointTest, endpoint, testKeys, statusCode = 200, userType = 'employee') => {
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

        it(`${endpointTest} Data Keys Test.`, () => {
            const responseData = data.body.data;
            testKeys.forEach((key) => {
                expect(Object.keys(responseData)).toContain(key);
            });
        });

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

            it(`${endpointTest} Status ${statusCode}`, () => {
                expect(data.status).toBe(statusCode);
                // expect(data.body.status).toBe(statusCodeStatus(statusCode));
            });

            it(`${endpointTest} Data Keys Test.`, () => {
                const responseData = data.body.data;
                testKeys.forEach((key)=>{
                    expect(Object.keys(responseData)).toContain(key);
                });
            });
    
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
        
            it(`${endpointTest} Status ${statusCode}`, () => {
                expect(data.status).toBe(statusCode);
            });

            it(`${endpointTest} Data Keys Test.`, () => {
                const responseData = data.body.data;
                testKeys.forEach((key) => {
                    expect(Object.keys(responseData)).toContain(key);
                });
            });
        
    });
}

const testDeleteAPI = (endpointTest, endpoint, testKeys, statusCode = 203, userType = 'employee') => {
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

        it(`${endpointTest} Data Keys Test.`, () => {
            const responseData = data.body.data;
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
    "POST /auth/create", 
    "/auth/create", 
    {
        'id':4,
        'firstName' : 'Miles',
        'lastName' : 'Morales',
        'email' : 'miles.morales@teamwork.com',
        'password' : 'spiderboy',
        'gender' : 'male',
        'jobRole' : 'Web Designer',
        'department' : 'IT',
        'address' : 'P.O.Box 12345, Nairobi,Kenya',
        'isAdmin':'false'
    }, 
    successKeys,
    201,
    'admin'
);

// Non Admin cann't create user
testPostAPI(
    "POST /auth/create",
    "/auth/create",
    {
        'id': 4,
        'firstName': 'Miles',
        'lastName': 'Morales',
        'email': 'miles.morales@teamwork.com',
        'password': 'spiderboy',
        'gender': 'male',
        'jobRole': 'Web Designer',
        'department': 'IT',
        'address': 'P.O.Box 12345, Nairobi,Kenya',
        'isAdmin': 'false'
    },
    errorKeys,
    401,
    'employee'
);

testPatchAPI(
    "POST /auth/edit/0",
    "/auth/edit/0",
    {
        'lastname': 'Morales',
    },
    successKeys
);

testPostAPI(
    "POST /auth/signin",
    "/auth/signin",
    {
        'email': 'peter.parker@teamwork.com',
        'password':'spiderman'
    },
    signinKeys
);

// Wrong Password

testPostAPI(
    "POST /auth/signin",
    "/auth/signin",
    {
        'email': 'peter.parker@teamwork.com',
        'password': 'flyman'
    },
    errorKeys,
    401
);


/**
 *  ARTICLES TESTS
 */

 
testGetArrayAPI(
    "GET /feed",
    "/feed",
    postKeys
);

testGetAPI(
    "GET /articles/1",
    "/articles/1",
    postKeys
);

testPostAPI(
    "POST /articles/",
    "/articles",
    {
        'createdOn': '07-05-2019',
        'title': 'What a day',
        'post': 'It started like any other day.',
        'isGif': 'false',
        'authorId': 4,
        'flags': [],
    },
    postedKeys
);


testPatchAPI(
    "Patch /articles/1",
    "/articles/1",
    {   
        'id': 1,
        'createdOn': '07-05-2019',
        'title': 'Edited Title',
        'post': 'Edited Post.',
        'isGif': 'false',
        'authorId': 3,
    },
    postKeys
);

testPatchAPI(
    "Patch /articles/1/flag (add flag)",
    "/articles/1/flag",
    {   
        'userId': 1,
        'flag':'true'
    },
    postKeys
);

testPatchAPI(
    "Patch /articles/2/flag (remove flag)",
    "/articles/2/flag",
    {
        'userId':12,
        'flag': 'false'
    },
    postKeys
);

testDeleteAPI(
    "DELETE /articles/1",
    "/articles/1",
    deleteKeys
);


/**
 *  ARTICLE COMMENTS TEST
 */

testGetArrayAPI(
    "GET /articles/1/comments",
    "/articles/1/comments",
    commentKeys
);

testGetAPI(
    "GET /articles/1/comments/1",
    "/articles/1/comments/1",
    commentKeys
);

testPostAPI(
    "POST /articles/1/comments",
    "/articles/1/comments",
    {
        'createdOn': '07-05-2019',
        'comment': 'Its a new comment.',
        'isGif': 'false',
        'authorId': 4,
        'flags': [],
    },
    postedKeys
);

testPatchAPI(
    "PATCH /articles/1/comments/2",
    "/articles/1/comments/2",
    {
        'createdOn': '07-05-2019',
        'comment': 'Its an edited comment.',
        'isGif': 'false',
        'authorId': 2,
        'flags': [],
    },
    commentKeys
);

testDeleteAPI(
    "DELETE /articles/1/comments/2",
    "/articles/1/comments/2",
    deleteKeys
);

testPatchAPI(
    "Patch /articles/1/comments/1/flag (add flag)",
    "/articles/1/comments/1/flag",
    {
        'userId': 7,
        'flag': 'true'
    },
    commentKeys
);

testPatchAPI(
    "Patch /articles/2/comments/1/flag (remove flag)",
    "/articles/2/comments/1/flag",
    {
        'userId': 2,
        'flag': 'false'
    },
    commentKeys
);




/**
 *  GIFS TESTS
 */


testPostAPI(
    "POST /gifs/",
    "/gifs",
    {
        'createdOn': '07-05-2019',
        'title': 'Funny Gif',
        'post': 'https://picsum.photos/300',
        'isGif': 'true',
        'authorId': 9,
        'flags': [],
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
    },
    postKeys
);

testPatchAPI(
    "Patch /gifs/1/flag (add flag)",
    "/gifs/1/flag",
    {
        'userId': 1,
        'flag': 'true'
    },
    postKeys
);

testPatchAPI(
    "Patch /gifs/2/flag (remove flag)",
    "/gifs/2/flag",
    {
        'userId': 12,
        'flag': 'false'
    },
    postKeys
);



/**
 *  GIFS COMMENTS TEST
 */

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
        'createdOn': '07-05-2019',
        'comment': 'Its a new comment.',
        'isGif': 'false',
        'authorId': 4,
        'flags': [],
    },
    postedKeys
);

testPatchAPI(
    "PATCH /gifs/1/comments/2",
    "/gifs/1/comments/2",
    {
        'createdOn': '07-05-2019',
        'comment': 'Its an edited comment.',
        'isGif': 'false',
        'authorId': 2,
        'flags': [],
    },
    commentKeys
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
        'userId': 7,
        'flag': 'true'
    },
    commentKeys
);

testPatchAPI(
    "Patch /gifs/2/comments/1/flag (remove flag)",
    "/gifs/2/comments/1/flag",
    {
        'userId': 2,
        'flag': 'false'
    },
    commentKeys
);





