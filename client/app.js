// ********** emoji reaction function ********

const likeBtn = document.createElement("button");
const dislikeBtn = document.createElement("button");
const loveBtn = document.createElement("button");

likeBtn.onclick = reactionCounter();

function reactionCounter() {
  let likecount = 0;
  return (likeBtn.textContent = "1 like");
  // return (likecount += 1);
}
// likecount = 0;
// dislikecount = 0;
// lovecount = 0;

// likeBtn.onclick = function () {
//   likecount += 1;
//   button1.innerHTML = "👍 " + likecount;
// };

// button2.onclick = function () {
//   dislikecount += 1;
//   button2.innerHTML = "👎  " + dislikecount;
// };

// button3.onclick = function () {
//   lovecount += 1;
//   button3.innerHTML = "😍 " + lovecount;
// };

// ********** Submit message function ********

const form = document.querySelector("#postForm");
form.addEventListener("submit", submitPost);

const formReply = document.querySelector("#postContainer");
const postList = document.querySelector("#replyContent");
const buttonContainer = document.querySelector("#buttonContainer");
const replyButton = document.getElementById("replyButton");

function submitPost(e) {
  e.preventDefault();

  const postData = {
    content: e.target.content.value,
  };

  createPost(postData);

  const options = {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("http://localhost:3012/anonymousPosts", options)
    .then((r) => r.json())
    .then(addToBody)
    .catch(console.warn);
}

function appendPosts(data) {
  data.posts.forEach(addToBody);
}

function addToBody() {
  createReactionButtons();
  createReplyButton();
}

function createReactionButtons() {
  buttonContainer.style.visibility = "visible";
  buttonContainer.append(likeBtn, dislikeBtn, loveBtn);
}

function createPost(postData) {
  const newPost = document.createElement("div");
  const newMessage = document.createElement("p");
  newMessage.textContent = `Anonymous says: ${postData.content}`;
  formReply.append(newPost);
  formReply.insertAdjacentElement("afterbegin", newPost);
  newPost.insertAdjacentElement("afterbegin", newMessage);
  formReply.style.visibility = "visible";
}

function createReplyButton() {
  replyButton.style.visibility = "visible";
}

// postList.style.visibility = "visible";
