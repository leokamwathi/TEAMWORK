const Request = require("request");
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

/*
-[] Test for Endpoint : POST /auth/create - user(Create user account)
-[] Test for Endpoint : POST /auth/signin(Login a user)

-[x] Test for Endpoint : GET /feed (Get all articles or gifs, showing the most recently posted articles and gifs first.)

-[] Test for Endpoint : POST /articles(Create an article)
-[x] Test for Endpoint : GET /articles/<:articleId> (Employees can view a specific article.)
-[] Test for Endpoint : PATCH /articles/<:articleId > (Edit an article with given ID)
-[] Test for Endpoint : DELETE /articles/<:articleId > (Delete article with given ID)
-[] Test for Endpoint : POST /articles/<:articleId>/comment (Employees can comment on article with given ID)
-[] Test for Endpoint : DELETE /articles/<:articleId>/comment/<:commentId> (Employees can comment on article with given ID)

-[] Test for Endpoint : POST / gifs(Create an article)
-[] Test for Endpoint : GET /gifs/<:gifId> (Employees can view a specific article.)
-[] Test for Endpoint : PATCH /gifs/<:gifId > (Edit an article with given ID)
-[] Test for Endpoint : DELETE /gifs/<:gifId > (Delete article with given ID)
-[] Test for Endpoint : POST /gifs/<:gifId>/comment (Employees can comment on article with given ID)
-[] Test for Endpoint : DELETE /gifs/<:gifId>/comment/<:commentId> (Employees can comment on article with given ID)
*/

/*
var jsonDataObj = { 'mes': 'hey dude', 'yo': ['im here', 'and here'] };
request.post({
    url: `${apiEndpointUrl}/auth/create`,
    body: postBody,
    json: true
}, function (error, response, body) {
    console.log(body);
});


{
“firstName” : String ,
“lastName” : String ,
“email” : String ,
“password” : String ,
“gender” : String ,
“jobRole” : String ,
“department” : String ,
“address” : String ,
...
}

*/
/*
describe("Testing Endpoint: POST /auth/create", () => {
    const data = {};
    beforeAll((done) => {
        const postBody = {'email':'alex@email.com','password':'jojo' };
        Request.post({
            url: `${apiEndpointUrl}/auth/create`,
            body: postBody,
            json: true
        }, (error, response, body) => {
           // data.status = response.statusCode;
                data.body = body; 
                console.log("TESTING auth/create...", data.body);
            done();
        });
    });

    it("Status 200", () => {
        expect(data.status).toBe(200);
    });
 
    it("Test Article Data.", () => {
        const responseData = data.body;
        expect(Object.keys(responseData)).toContain('message');
        expect(Object.keys(responseData)).toContain('token');
        expect(Object.keys(responseData)).toContain('userId');
    });
    
});
*/
const testPostAPI = (endpointTest,endpoint,postData,testKeys) => {
    describe(`Testing Endpoint: ${endpointTest}`, () => {
        const data = {};
        beforeAll((done) => {
            const apiUrl = apiEndpointUrl + endpoint
            Request.post({
                url: apiUrl,
                body: postData,
                json: true
            }, (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                // console.log(`TESTING ${endpointTest}...`, apiUrl, data.body);
                done();
            });
        });

        it(`${endpointTest} Status 200`, () => {
            expect(data.status).toBe(200);
        });

        it(`${endpointTest} Data Keys Test.`, () => {
            const responseData = data.body;
            testKeys.forEach((key)=>{
                expect(Object.keys(responseData)).toContain(key);
            });
        });

    });
}

const testGetAPI = (endpointTest, endpoint, testKeys) => {
    describe(`Testing Endpoint: ${endpointTest}`, () => {
        const data = {};
        beforeAll((done) => {
            const apiUrl = apiEndpointUrl + endpoint
            Request.get(apiUrl, (error, response, body) => {
                data.status = response.statusCode;
                data.body = JSON.parse(body);
                // console.log(`TESTING ${endpointTest}...`, data.body);
                done();
            });
        });

        it(`${endpointTest} Status 200`, () => {
            expect(data.status).toBe(200);
        });

        it(`${endpointTest} Data Keys Test.`, () => {
            const responseData = data.body;
            testKeys.forEach((key) => {
                expect(Object.keys(responseData)).toContain(key);
            });
        });

    });
}


const testGetArrayAPI = (endpointTest, endpoint, testKeys) => {
    describe(`Testing Endpoint: ${endpointTest}`, () => {
        const data = {};
        beforeAll((done) => {
            const apiUrl = apiEndpointUrl + endpoint
            Request.get(apiUrl, (error, response, body) => {
                data.status = response.statusCode;
                [data.body] = JSON.parse(body);
                // console.log(`TESTING ${endpointTest}...`, data.body);
                done();
            });
        });

        it(`${endpointTest} Status 200`, () => {
            expect(data.status).toBe(200);
        });

        it(`${endpointTest} Data Keys Test.`, () => {
            const responseData = data.body;
            testKeys.forEach((key) => {
                expect(Object.keys(responseData)).toContain(key);
            });
        });

    });
}

testPostAPI(
    "POST /auth/create", 
    "/auth/create", 
    {'email': 'alex@email.com', 'password': 'jojo'}, 
    ['message', 'token', 'userId']
);

testGetArrayAPI(
    "GET /feed",
    "/feed",
    ['id', 'createdOn', 'title', 'post', 'isGif', 'authorId']
);

testGetAPI(
    "GET /articles/1",
    "/articles/1",
    ['id', 'createdOn', 'title', 'post', 'isGif', 'authorId']
);


/*

post)).toContain('id');
        expect(Object.keys(post)).toContain('createdOn');
        expect(Object.keys(post)).toContain('title');
        expect(Object.keys(post)).toContain('post');
        expect(Object.keys(post)).toContain('isGif');
        expect(Object.keys(post)).toContain('authorId');

describe("Testing Endpoint: GET /feed", () => {
    const data = {};
    beforeAll((done) => {
        Request.get(`${apiEndpointUrl}/feed/`, (error, response, body) => {
            
            data.status = response.statusCode;
            data.body = JSON.parse(body); 
            console.log("TESTING FEED...",data.body[0]);  
            done();
        });
    });

    it("Status 200", () => {
        expect(data.status).toBe(200);
    });
    
    it("Test if Feed has multiple articles/gifs.", () => {
        expect(data.body.length).toBeGreaterThan(0);
    });

    it("Test Feed Data.", () => {
        const post = data.body[0];
        expect(Object.keys(post)).toContain('id');
        expect(Object.keys(post)).toContain('createdOn');
        expect(Object.keys(post)).toContain('title');
        expect(Object.keys(post)).toContain('post');
        expect(Object.keys(post)).toContain('isGif');
        expect(Object.keys(post)).toContain('authorId');
    });
});

describe("Testing Endpoint: GET /articles/1", () => {
    const data = {};
    beforeAll((done) => {
        // http://localhost:3000/api/v1/articles/1
        Request.get(`${apiEndpointUrl}/articles/1`, (error, response, body) => {

            data.status = response.statusCode;
            data.body = JSON.parse(body);
            console.log("TESTING articles/1...",data.body);  
            done();
        });
    });

    it("Status 200", () => {
        expect(data.status).toBe(200);
    });

    it("Test Article Data.", () => {
        const post = data.body;
        expect(Object.keys(post)).toContain('id');
        expect(Object.keys(post)).toContain('createdOn');
        expect(Object.keys(post)).toContain('title');
        expect(Object.keys(post)).toContain('post');
        expect(Object.keys(post)).toContain('isGif');
        expect(Object.keys(post)).toContain('authorId');
    });
});
*/
/*
const server = require('../server');


var serverInstance;

beforeEach(function (done) {
    serverInstance = server.run(done);
});

afterEach(function (done) {
    serverInstance.close(done);
});

*/





/*
describe("GET /", () => {
    const data = {};
    beforeAll((done) => {
        Request.get("http://localhost:3000/", (error, response, body) => {
            data.status = response.statusCode;
            data.body = body;
            done();
        });
    });
    it("Status 200", () => {
        expect(data.status).toBe(200);
    });
    it("Body", () => {
        expect(data.body).toBe("Welcome to Teamwork frontend");
    });
});

describe("GET /articles", () => {
    const data = {};
    beforeAll((done) => {
        Request.get("http://localhost:3000/api/v1/feed", (error, response, body) => {
            data.status = response.statusCode;
            data.body = JSON.parse(body);
            done();
        });
    });
    it("Status 200", () => {
        expect(data.status).toBe(200);
    });
    it("Body", () => {
        expect(data.body.message).toBe("Articles");
    });
});


describe("GET /articles/1", () => {
    const data = {};
    beforeAll((done) => {
        Request.get("http://localhost:3000/api/v1/article/1", (error, response, body) => {
            data.status = response.statusCode;
            data.body = JSON.parse(body);
            done();
        });
    });
    it("Status 200", () => {
        expect(data.status).toBe(200);
    });
    it("Body", () => {
        expect(data.body.message).toBe("Article 1");
    });
});

*/