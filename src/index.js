document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

  let imageId = 4135; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  function getImage() {
    fetch(imageURL)
      .then(response => response.json())
      .then(object => {
        console.log(object);

        displayImage(object);
      });
  }

  const like = document.getElementById("likes");
  const ul = document.getElementById("comments");

  function displayImage(img) {
    // console.log(img);

    const image = document.getElementById("image");
    image.src = img.url;
    const image_title = document.getElementById("name");
    image_title.innerText = img.name;
    like.innerText = img.like_count;

    // const ul = document.getElementById("comments");
    ul.innerHTML = "";
    for (comment in img.comments) {
      const li = document.createElement("li");
      li.innerText = img.comments[comment].content;
      const deleteButton = document.createElement("button");
      deleteButton.id = img.comments[comment].id;
      deleteButton.addEventListener("click", deleteComment);
      deleteButton.innerText = "DEL";
      li.appendChild(deleteButton);
      ul.appendChild(li);
    }
  }

  function deleteComment() {
    const deleteUrl = `https://randopic.herokuapp.com/comments/${this.id}`;

    configObject = {
      method: "DELETE"
    };
    fetch(deleteUrl, configObject).then(response => {
      console.log("Comment Successfully Destroyed");
      getImage();
    });
  }

  const like_button = document.getElementById("like_button");
  like_button.addEventListener("click", increaseLike);

  function increaseLike() {
    like.innerText = parseInt(like.innerText) + 1;

    var data = {
      image_id: imageId,
      image_likes: like.innerText
    };
    configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch(likeURL, configObject).then(response => console.log("Success:"));
  }

  const submitForm = document.getElementById("comment_form");
  submitForm.addEventListener("submit", submit);
  function submit(event) {
    event.preventDefault();
    const commentInput = document.getElementById("comment_input");
    // const li = document.createElement("li");
    // li.innerText = commentInput.value;

    // const deleteButton = document.createElement("button");
    // // deleteButton.id = 0;
    // deleteButton.addEventListener("click", deleteComment);
    // deleteButton.innerText = "DEL";
    // li.appendChild(deleteButton);

    // ul.appendChild(li);

    var data = {
      image_id: imageId,
      content: commentInput.value
    };
    configObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    };
    fetch(commentsURL, configObject).then(response => {
      console.log("Success");
      getImage();
    });
  }

  getImage();
});
