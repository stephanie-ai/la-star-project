const request = require("supertest");
const expect = require("chai").expect;

const server = require("../createServer");

const fs = require("fs");
const dataPosts = fs.readFileSync("../server/anonymousPosts.json");
const anonymousPosts = JSON.parse(dataPosts);

describe("API server", () => {
  let api;
  let testPost = {
    content: "Hello",
    likes: 3,
    dislikes: 0,
    loves: 2,
    replies: ["Goodbye"],
  };

  let replyPost = {
    id: 3,
    content: "Hello",
    likes: 3,
    dislikes: 0,
    loves: 2,
    replies: ["Goodbye"],
  };

  before(() => {
    // start the server and store it in the api variable
    api = server.listen(5012, () =>
      console.log("Test server running on port 5012")
    );
  }),
    after((done) => {
      // close the server, then run done
      console.log("Server has been stopped");
      api.close(done);
    }),
    it("responds to get / with status 200", (done) => {
      request(api).get("/").expect(200, done);
    }),
    it("responds to get /anonymousPosts with status 200", (done) => {
      request(api).get("/anonymousPosts").expect(200, done);
    }),
    it("responds to get /anonymousReplies with status 200", (done) => {
      request(api).get("/anonymousPosts").expect(200, done);
    }),
    it("responds to get /anonymousLike with status 200", (done) => {
      request(api).get("/anonymousPosts").expect(200, done);
    }),
    it("responds to get /anonymousDislike with status 200", (done) => {
      request(api).get("/anonymousPosts").expect(200, done);
    }),
    it("responds to get /anonymousLove with status 200", (done) => {
      request(api).get("/anonymousPosts").expect(200, done);
    }),
    it("responds to post /anonymousPosts with status 201", (done) => {
      request(api)
        .post("/anonymousPosts")
        .send(testPost)
        .expect(201)
        .expect({ id: 3, ...testPost }, done);
    }),
    it("responds to post /anonymousReplies with status 201", (done) => {
      request(api)
        .post("/anonymousPosts")
        .send(replyPost)
        .expect(201)
        .expect({ ...replyPost }, done);
    }),
    it("responds to post /anonymousLike with status 201", (done) => {
      request(api)
        .post("/anonymousPosts")
        .send(replyPost)
        .expect(201)
        .expect({ ...replyPost }, done);
    }),
    it("responds to post /anonymousDislike with status 201", (done) => {
      request(api)
        .post("/anonymousPosts")
        .send(replyPost)
        .expect(201)
        .expect({ ...replyPost }, done);
    }),
    it("responds to post /anonymousLove with status 201", (done) => {
      request(api)
        .post("/anonymousPosts")
        .send(replyPost)
        .expect(201)
        .expect({ ...replyPost }, done);
    }),
    it("appends like count by 1", (done) => {
      request(api)
        .post("/anonymousPosts")
        .expect(201)
        .expect(
          {
            id: 1,
            content: "This is the first post",
            likes: 0,
            dislikes: 0,
            loves: 0,
            replies: ["Hello, this is a reply"],
          },
          done
        );
    });
  it("responds to non existing paths with 404", (done) => {
    request(api).get("/no").expect(404, done);
  }),
    it("responds to invalid method request with 405", (done) => {
      request(api).post("/").expect(405, done);
    });
});
