document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta');

  let imageId = 4147; //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
  const likeURL = `https://randopic.herokuapp.com/likes/`;
  const commentsURL = `https://randopic.herokuapp.com/comments`;

  let likeCount = document.querySelector("span#likes");
  const likeButton = document.querySelector("button#like_button");
  let newCommentForm = document.querySelector("form#comment_form");
  const commentList = document.querySelector("ul#comments");
  const inputField = document.querySelector("input#comment_input");

  fetch(imageURL).then(res => res.json()).then(json => {
    likeCount.innerText = json.like_count;
    let allComments = json.comments;
    allComments.forEach(comment => {
      let li = document.createElement("li");
      li.id = `comment${comment.id}`;
      li.innerText = comment.content;
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.id = `deleteComment${comment.id}`;
      deleteButton.addEventListener("click", () => deleteComment(comment.id));
      commentList.appendChild(li);
      li.appendChild(deleteButton);
    })
  });

  likeButton.addEventListener("click", likeImage);
  newCommentForm.addEventListener("submit", addComment);

  // functions

  function likeImage() {
    let likeCountInt = parseInt(likeCount.innerText, 10)
    likeCountInt += 1;
    likeCount.innerText = likeCountInt;

    let data = {
      image_id: imageId
    };

    let configObj = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(likeURL, configObj);
  }

  function addComment(event) {
    event.preventDefault();
    let comment = event.target.elements[id="comment_input"].value;
    let li = document.createElement("li");
    li.innerText = comment;

    let deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteButton.parentNode.remove();
    })
    li.appendChild(deleteButton);

    
    commentList.appendChild(li);
    inputField.value = '';

    let data = {
      image_id: imageId,
      content: comment
    };

    let configObj = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(commentsURL, configObj);
  }

  function deleteComment(CommentId) {
    let targetComment = document.querySelector(`li#comment${CommentId}`);
    console.log(targetComment);
    targetComment.remove();

    let configObj = {
      method: "DELETE"
    }
    fetch(`https://randopic.herokuapp.com/comments/${CommentId}`, configObj);
  }
})
