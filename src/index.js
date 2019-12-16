document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4139 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const getImage = () => {
    fetch(imageURL)
      .then(res => res.json())
      .then(buildPage);
  }

  getImage()

  function buildPage(data) {

    let image = document.getElementById('image')
    image.src = data.url

    let name = document.getElementById('name')
    name.innerText = data.name

    const likeButton = document.getElementById('like_button')
    let likes = document.getElementById('likes')
    likes.innerText = data.like_count

    let deleteButton = document.getElementById("delete")

    const comments = document.getElementById('comments')
    console.log(comments);
    
    

    likeButton.addEventListener('click', () => {
      currentLikes = parseInt(likes.innerText)
      likes.innerText = currentLikes + 1
  
      var data = {
        image_id: imageId,
        image_likes: likes
      }
      fetch(likeURL, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
    })

    const commentForm = document.getElementById('comment_form')
   
      data.comments.forEach((comment) => {
        let commentList = document.getElementById("comments")
        docCommentLi = document.createElement('li')
        docCommentLi.innerText = comment.content
        commentList.append(docCommentLi)
      })
    
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault()
      commentInput = document.querySelector("input")
      commentList = document.getElementById("comments")
      commentLi = document.createElement('li')
      commentLi.setA
      content = commentInput.value
      commentLi.innerText = content
      commentList.append(commentLi)
     
      var data = {
        image_id: imageId,
        content: content
      }
      fetch(commentsURL, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
    })

  }

})
