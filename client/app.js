// const btn = document.getElementById("loveButton");

// const likes = document.getElementById("likesCounter");
// const dislikes = document.getElementById("dislikesCounter");
// const loves = document.getElementById("lovesCounter");

// btn.addEventListener("click", onClick);

// var clicks = 0;

// function onClick() {

//     clicks += 1;

//     if(likes === )
//   //   likes.innerHTML = clicks;

//   //   dislikes.innerHTML = clicks;

//   loves.innerHTML = clicks;
// }

// ********** SECOND TEST **********

// "use strict";

// // all the .button-counter from the DOM
// const buttonsCounter = document.getElementsByClassName("button-counter");

// // sets the content of the button to what value is currently set for data-counter
// const buttonCounterSetText = (button) =>
//   (button.innerHTML = `(${button.dataset.count || 0})`);

// // handles click event on the button
// const buttonCounterClickHandler = ({ currentTarget }) => {
//   // increases the current value for data-count, or sets it to 0
//   currentTarget.dataset.count =
//     (parseInt(currentTarget.dataset.count) || 0) + 1;
//   // see above
//   buttonCounterSetText(currentTarget);
// };

// // initialize the buttons content and add listeners for click events
// const buttonCounterInitialization = (button) => {
//   buttonCounterSetText(button);
//   button.addEventListener("click", buttonCounterClickHandler);
// };

// // initialize all buttons found with class .button-counter
// [...buttonsCounter].forEach(buttonCounterInitialization);

// ********** THIRD TEST **********

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

const form = document.querySelector("#post-form");
form.addEventListener("submit", submitPost);

const postList = document.querySelector("ul");

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
  const newMessage = document.createElement("p");
  newMessage.textContent = `Anonymous says: ${postData.content}`;
  postList.append(newMessage);
}
