const Request = require("request");
const server = require('../server/server');

let serverInstance;

beforeEach((done) => {
    serverInstance = server.run(done);
});

afterEach((done) => {
    serverInstance.close(done);
});

const apiEndpointUrl = 'http://localhost:3000/api/v1/';

/*
-[] Test for Endpoint : POST /auth/create - user(Create user account)
-[] Test for Endpoint : POST /auth/signin(Login a user)

-[x] Test for Endpoint : GET /feed (Get all articles or gifs, showing the most recently posted articles and gifs first.)

-[] Test for Endpoint : POST /articles(Create an article)
-[] Test for Endpoint : GET /articles/<:articleId> (Employees can view a specific article.)
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


describe("GET /", () => {
    const data = {};
    beforeAll((done) => {
        Request.get(`${apiEndpointUrl}feed/`, (error, response, body) => {
            console.log(data.body);
            data.status = response.statusCode;
            data.body = JSON.parse(body);   
            done();
        });
    });
    it("Status 200", () => {
        expect(data.status).toBe(200);
    });
    it("Body Data Test", () => {
        expect(data.body).toContain("id")
    });
});


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