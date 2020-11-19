const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const fs = require("fs");

const dataPosts = fs.readFileSync("anonymousPosts.json");
const anonymousPosts = JSON.parse(dataPosts);

//api GET call
app.get("/", (req, res) => {
  res.send("Hello La Star");
});

app.get("/anonymousPosts", (req, res) => {
  res.send(anonymousPosts);
});

app.get("/anonymousReplies", (req, res) => {
  res.send(anonymousPosts);
});

app.get("/anonymousLike", (req, res) => {
  res.send(anonymousPosts);
});

app.get("/anonymousDislike", (req, res) => {
  res.send(anonymousPosts);
});


app.get("/anonymousLove", (req, res) => {
  res.send(anonymousPosts);
});


//api POST call

app.post("/anonymousPosts", (req, res) => {
  const data = req.body;
  const newPostId = anonymousPosts.length + 1;
  const newPost = { id: newPostId, likes:0, dislikes:0, loves:0, replies:[], ...data };
  anonymousPosts.push(newPost);
  res.status(201).send(newPost);
});

app.post("/anonymousReplies", (req, res) => {
  const data = req.body;
  const newReply = data.reply;
  const post = anonymousPosts.filter(p => p.id == data.id)[0];
  post.replies.push(newReply);
  res.status(201).send(post);
});

app.post("/anonymousLike", (req, res) => {
  const data = req.body;
  const post = anonymousPosts.filter(p => p.id == data.id)[0];
  post.likes++;
  res.status(201).send(post);
});

app.post("/anonymousDislike", (req, res) => {
  const data = req.body;
  const post = anonymousPosts.filter(p => p.id == data.id)[0];
  post.dislikes++;
  res.status(201).send(post);
});


app.post("/anonymousLove", (req, res) => {
  const data = req.body;
  const post = anonymousPosts.filter(p => p.id == data.id)[0];
  post.loves++;
  res.status(201).send(post);
});


module.exports = app;
