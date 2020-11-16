// ********** emoji reaction function ********

const likeBtn = document.createElement("button");
// const likeBtnCounter = document.createElement("p");

const dislikeBtn = document.createElement("button");
const loveBtn = document.createElement("button");

// likeBtn.onclick = reactionCounter();

// function reactionCounter() {
//   let likecount = 0;
//   return (likeBtn.textContent = "1 like");
// return (likecount += 1);
// }
let likecount = 0;
let dislikecount = 0;
let lovecount = 0;

likeBtn.onclick = function (e) {
  e.preventDefault();
  likecount += 1;
  likeBtn.innerHTML =  likecount;
  console.log(likecount);
  disable();
};

dislikeBtn.onclick = function (e) {
  e.preventDefault();
  dislikecount += 1;
  dislikeBtn.innerHTML = dislikecount;
  disable()
};

loveBtn.onclick = function (e) {
  e.preventDefault();
  lovecount += 1;
  loveBtn.innerHTML = lovecount;
  disable()
};

//helper function to disable every other un-clicked button.
function disable(){
const buttons = [likeBtn, dislikeBtn, loveBtn];
buttons.forEach(button => button.disabled = true)
}

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

  //find a way to pass the count number to server
  // const emojiReactionCounter ={
  //   likes: e.target.likes.value,
  //   dislikes: e.target.dislikes.value,
  //   loves: e.target.loves.value,
  // }

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
  const buttons = [likeBtn, dislikeBtn, loveBtn];
  buttonContainer.style.visibility = "visible";
  buttonContainer.append(likeBtn, dislikeBtn, loveBtn);
  buttons.forEach((button) => button.classList.add("reactionButtons"));
  //create a class for each button for the content
  likeBtn.classList.add("like");
  dislikeBtn.classList.add("dislike");
  loveBtn.classList.add("love");

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
