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
  const newPost = { id: newPostId, likes:0, dislikes:0, loves:0, replies:[], ...data };
  anonymousPosts.push(newPost);
  res.status(201).send(newPost);
});

app.post("/anonymousReplies", (req, res) => {
  const data = req.body;
  const post = anonymousPosts.filter(p => p.id == data.id)[0];
  post.replies.push(data.reply);
  res.status(201).send(post);
});

// app.post("/anonymousLike", (req, res) => {
//   const data = req.body;
//   const post = anonymousPosts.filter(p => p.id == data.id)[0];
//   ++post.likes;
//   res.status(201).send(post);
// });



module.exports = app;
