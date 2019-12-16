document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

  let imageId = 4142; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/4142`;

  const likeURL = `https://randopic.herokuapp.com/likes/`;

  const commentsURL = `https://randopic.herokuapp.com/comments/`;

  fetch(imageURL)
    .then(response => response.json())
    .then(data => loadPage(data));

  function loadPage(data) {
    const img = document.getElementById("image");
    img.src = data.url;

    const name = document.getElementById("name");
    name.innerText = data.name;

    // likes

    const likeButton = document.getElementById("like_button");
    const likes = document.getElementById("likes");
    likes.innerText = data.like_count;

    likeButton.addEventListener("click", function() {
      likeCount = parseInt(likes.innerText);
      likes.innerText = likeCount += 1;

      let body = {
        image_id: imageId,
        like_count: likeCount
      };

      fetch(likeURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ body })
      });
    });

    // comments

    const comments = data.comments;
    let form = document.querySelector("form");
    comments.forEach(comment => {
      let ul = document.getElementById("comments");
      let li = document.createElement("li");
      li.innerText = comment.content;
      ul.appendChild(li);
    });

    form.addEventListener("submit", event => {
      event.preventDefault();
      const input = document.querySelector("input[name=comment]").value;
      const comments = document.getElementById("comments");
      const listItem = document.createElement("li");
      listItem.innerText = input;
      comments.append(listItem);

      let body = {
        image_id: imageId,
        content: input
      };

      fetch(commentsURL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ body })
      });
    });
  }
});
