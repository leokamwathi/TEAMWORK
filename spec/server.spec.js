const Request = require("request");

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
        expect(data.body).toBe("Welcome to Teamwork");
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