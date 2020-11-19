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
form.addEventListener("submit", submitPost);

const postList = document.querySelector("#posts");
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

  createPost(postData);
  e.target.content.value = "";

}

function appendPosts(data) {
  data = JSON.parse(JSON.stringify(data));
  data.forEach(createPost);
}

// ***** Trying to create submit reply function ******

function submitReply(e) {
  e.preventDefault();
  const replyData = {
    id: e.target.getAttribute("postId"),
    reply: e.target.replies.value, //cannot read property type of value
  };
  // console.log(e.target.replies.value);

  const options = {
    method: "POST",
    body: JSON.stringify(replyData),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("http://localhost:3012/anonymousReplies", options)
    .then((r) => r.json())
    // .then(createPost)
    .catch(console.warn);

  repliesFunction(replyData, e.target); //need a new function
  e.target.replies.value = "";
}

// function CreateReply

// **************************************

function createReactionButtons(newPost) {
  const buttonContainer = document.createElement("div");
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
  newPost.append(buttonContainer);
}

function createPost(postData) {
  const newPost = document.createElement("div");
  const newMessage = document.createElement("p");
  // create form for replies
  const formReply = document.createElement("form");
  //create reply input and submitbtn
  const formReplyInput = document.createElement("input");
  formReplyInput.setAttribute("type", "text");
  formReplyInput.setAttribute("name", "replies");
  formReplyInput.setAttribute("value", " ");
  //set id to post to use later in the reply
  formReply.setAttribute("postId", postData.id);

  const formReplySubmitButton = document.createElement("input");
  formReplySubmitButton.setAttribute("type", "submit");

  //create Giphy replyBTN
  // const formGiphyInput = document.createElement("input");
  // formGiphyInput.setAttribute("type", "text");
  // const formGiphySubmitButton = document.createElement("input");
  // formGiphySubmitButton.setAttribute("type", "submit");

  newMessage.textContent = `Anonymous says: ${postData.content}`;
  createReactionButtons(newPost);
  createReplyButton(newPost, formReply);
  formReply.append(formReplyInput);
  formReply.append(formReplySubmitButton);
  newPost.append(formReply);
  postList.append(newPost);
  postList.insertAdjacentElement("afterbegin", newPost);
  newPost.insertAdjacentElement("afterbegin", newMessage);
  formReply.style.visibility = "hidden";

  // add event listener to submit button
  formReply.addEventListener("submit", submitReply);
}

function repliesFunction(replyData, formReply) {
  const newReplyContainer = document.createElement("div");
  const newReplyMessage = document.createElement("p");
  newReplyMessage.textContent = `${replyData.reply}`;
  newReplyContainer.append(newReplyMessage);
  formReply.append(newReplyContainer);

}

function createReplyButton(newPost, formReply) {
  const replyButton = document.createElement("button");
  replyButton.textContent = "Reply";
  // newPost.append(replyButton);
  replyButton.addEventListener("click", hiddenForm);
  function hiddenForm() {
    formReply.style.visibility == "hidden"
      ? (formReply.style.visibility = "visible")
      : (formReply.style.visibility = "hidden");
  }
  newPost.appendChild(replyButton);
}

// function megaFunction(e) {
//   submitPost(e);

//   // createReplyButton();
//   // createElementButton()
// }

//Giphy search functionality

//pseudo code:
//create a Giphy unique key let APIKey = "Tq4DqmIUR4suGhxpH4Ph7U0q1Px5eIOB";
//syntax for api call url = api + key + result limit + key/search word

//3 event listers:

//button click
//text submit
//text reply

//fetching api
const gifBtn = document.getElementById("gif");
gifBtn.addEventListener("click", gifapiCall);

function gifapiCall(e) {
  e.preventDefault();
  console.log("gif has been clicked");

  let appkey = "Tq4DqmIUR4suGhxpH4Ph7U0q1Px5eIOB";

  let url = `https://api.giphy.com/v1/gifs/search?api_key=${appkey}&limit=10&q=`;
  let str = document.getElementById("giphyInput").value.trim();
  console.log(str);
  url = url.concat(str);

  fetch(url)
    .then((res) => res.json())
    .then((content) => {
      // console.log the content received to check: data, pagination, and meta to extract the information we need.
      // console.log(content.data);
      // console.log("META", content.meta);
      //second url we receive from the server to render the image/emoji/text we want.
      let gifimg = document.createElement("img");
      gifimg.src =
        content.data[
          Math.floor(content.data.length * Math.random())
        ].images.downsized.url;
      gifimg.classList.add("imgFormat");
      let gifContainer = document.getElementById("imageContainer");
      gifContainer.append(gifimg);
      gifContainer.insertAdjacentElement("afterbegin", gifimg);
    })
    .catch((err) => {
      console.log("AAAAAAHHH we got an error!!", err.warn);
    });
}
