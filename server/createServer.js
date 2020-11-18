const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const fs = require("fs");

const dataPosts = fs.readFileSync("anonymousPosts.json");
const anonymousPosts = JSON.parse(dataPosts);

// const dataReplies = fs.readFileSync("anonymousReplies.json");
// const anonymousReplies = JSON.parse(dataReplies);

// const anonymousPosts = [
//   { id: 1, content: "This is the first post", likes: 0, dislikes: 0, loves: 0 },
// ];

app.get("/", (req, res) => {
  // res.send(anonymousPosts, anonymousReplies);
  res.send("Hello La Star");
});

app.get("/anonymousPosts", (req, res) => {
  res.send(anonymousPosts);
});

app.get("/anonymousReplies", (req, res) => {
  // res.send("connected to server");
  res.send(anonymousPosts);
});

app.post("/anonymousPosts", (req, res) => {
  const data = req.body;
  const newPostId = anonymousPosts.length + 1;
  const newPost = { id: newPostId, ...data };
  anonymousPosts.push(newPost);
  res.status(201).send(newPost);
});

app.post("/anonymousReplies", (req, res) => {
  const data = req.body;
  console.log(req.body);
  // const newReplyId = anonymousPosts.length + 1;
  //if postId==true
  //   postId.reply.push(newReply)
  // }
  // const dataReceived
  const newReply = { reply: dataReceived, ...data };
  anonymousPosts.push(newReply);
  res.status(201).send(newReply);
});

module.exports = app;
