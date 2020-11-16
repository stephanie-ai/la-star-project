const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const anonymousPosts = [
  { id: 1, content: "This is the first post", likes: 0, dislikes: 0, loves: 0 },
];

app.get("/", (req, res) => {
  res.send("Hello tara!");
});

app.get("/anonymousPosts", (req, res) => {
  res.send(anonymousPosts);
});

app.post("/anonymousPosts", (req, res) => {
  const data = req.body;
  const newPostId = anonymousPosts.length + 1;
  const newPost = { id: newPostId, ...data };
  anonymousPosts.push(newPost);
  res.status(201).send(newPost);
});

module.exports = app;
