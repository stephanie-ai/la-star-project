// ********** emoji reaction function ********


// function createElementButton(){
// const likeBtn = document.createElement("button");
// const dislikeBtn = document.createElement("button");
// const loveBtn = document.createElement("button");
// }


// let likecount = 0;
// let dislikecount = 0;
// let lovecount = 0;

// likeBtn.onclick = function (e) {
//   e.preventDefault();
//   likecount += 1;
//   likeBtn.innerHTML =  likecount;
//   console.log(likecount);
//   disable();
// };

// dislikeBtn.onclick = function (e) {
//   e.preventDefault();
//   dislikecount += 1;
//   dislikeBtn.innerHTML = dislikecount;
//   disable()
// };

// loveBtn.onclick = function (e) {
//   e.preventDefault();
//   lovecount += 1;
//   loveBtn.innerHTML = lovecount;
//   disable()
// };


//helper function to disable every other un-clicked button.
// function disable(){
// const buttons = [likeBtn, dislikeBtn, loveBtn];
// buttons.forEach(button => button.disabled = true)
// }

// ********** Get all previous posts ********
getAllPosts();

function getAllPosts() {
  fetch("http://localhost:3012/anonymousPosts")
    .then((r) => r.json())
    .then(appendPosts)
    .catch(console.warn);
}

// ********** Submit message function ********

const form = document.querySelector("#postForm");
form.addEventListener("submit", megaFunction);

const formReply = document.querySelector("#postContainer");
const postList = document.querySelector("#replyContent");
const buttonContainer = document.querySelector("#buttonContainer");
// const replyButton = document.getElementById("replyButton");



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
    // .then(createReactionButtons)
    // .then(createReplyButton)
    // debugger
    // console.log('debugger working')
    .catch(console.warn);
}

function appendPosts(data) {
  data = JSON.parse(JSON.stringify(data));
  data.forEach(createPost);
}


function createReactionButtons() {
  let likeBtn = document.createElement("button");
  let dislikeBtn = document.createElement("button");
  let loveBtn = document.createElement("button");
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
  const replyButton = document.createElement("button");
  replyButton.textContent = "Reply";
  // newPost.append(replyButton)
  formReply.append(replyButton);
}


function megaFunction(e) {
  submitPost(e);
  createReactionButtons();
  createReplyButton();
  // createElementButton()
}



// postList.style.visibility = "visible";
