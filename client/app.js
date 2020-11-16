// ********** emoji reaction function ********

const button1 = document.getElementById("likes");
const button2 = document.getElementById("dislikes");
const button3 = document.getElementById("loves");

likecount = 0;
dislikecount = 0;
lovecount = 0;

button1.onclick = function () {
  likecount += 1;
  button1.innerHTML = "👍 " + likecount;
};

button2.onclick = function () {
  dislikecount += 1;
  button2.innerHTML = "👎  " + dislikecount;
};

button3.onclick = function () {
  lovecount += 1;
  button3.innerHTML = "😍 " + lovecount;
};

// ********** Submit message function ********

const form = document.querySelector("#postForm");
form.addEventListener("submit", submitPost);

const formReply = document.querySelector("#postContainer");
const postList = document.querySelector("#replyContent");
const buttonContainer = document.querySelector("#buttonContainer");

function submitPost(e) {
  e.preventDefault();

  const postData = {
    content: e.target.content.value,
  };

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

function addToBody(postData) {
  const replyButton = document.getElementById("replyButton");
  const newMessage = document.createElement("p");
  newMessage.textContent = `Anonymous says: ${postData.content}`;
  formReply.append(newMessage);
  formReply.style.visibility = "visible";
  replyButton.style.visibility = "visible";
  buttonContainer.style.visibility = "visible";
}

// postList.style.visibility = "visible";
