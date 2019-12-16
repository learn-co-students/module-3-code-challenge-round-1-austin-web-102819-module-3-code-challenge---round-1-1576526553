
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4146
  const imageURL = `https://randopic.herokuapp.com/images/4146`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const acquireImage = () => {
    fetch(imageURL)
    .then(res => res.json())
    .then(data => newPage(data))
    .catch(error =>console.error(error.message)) 
  }

  acquireImage()

  function newPage(data) {
    let img = document.getElementById("image")
    img.src = data.url

    let name = document.getElementById("name")
    name.innerHTML = data.name

    const likeButton = document.getElementById('like_button')
    let likes = document.getElementById('likes')
    likes.innerText = data.like_count 

    likeButton.addEventListener( "click", function(){
      currentLikes = parseInt(likes.innerText)
      likes.InnerText = currentLikes + 1

      var newData = {
        image_id: imageId,
        image_likes: likes
      }
      fetch(likeURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newData)
      }).then(res => res.json())
      .then(response => console.log('success: ', JSON.stringify(response)))
      .catch(error => console.error('error: ', error));
    })

    const commForm = document.getElementById('comment_form')
    if (data.comments.length >= 1) {
      data.comments.forEach(function (t) {
        li = document.createElement('li')
        ul = document.getElementById("comments")
        li.innerText = t.content
        ul.appendChild(li)
      })
    }

    commForm.addEventListener('submit', function(e) {
      e.preventDefault()
      input = document.querySelector("input")
      commentList = document.getElementById("comments")
      commentLi = document.createElement('li')
      text = input.value
      commentLi.innerText = text
      commentList.appendChild(commentLi)

      var data = {
        image_id: imageId,
        content: text
      }
      fetch(commentsURL, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }).then(res => res.json())
      .then(response => console.log("success: ", JSON.stringify(response)))
      .catch(error => console.error("error: ", errror));
    })
  }
});
