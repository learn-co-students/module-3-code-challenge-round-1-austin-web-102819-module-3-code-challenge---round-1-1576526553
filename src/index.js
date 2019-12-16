document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4140//Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(response => response.json())
  .then(data => {
    loadImage(data)
  })

function loadImage(dataImage){
  let img = document.getElementById('image')
  img.src = dataImage.url 

  let title = document.getElementById('name')
  title.innerText = dataImage.name

  let likes = document.getElementById('likes')
  likes.innerText = dataImage.like_count

  const likeButton = document.getElementById('like_button')
  likeButton.addEventListener('click', function(){
  currentLikes = parseInt(likes.innerText)
      likes.innerText = currentLikes + 1

      let newData = {
        image_id: imageId,
        image_likes: likes
      }

      fetch(likeURL, {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(response => console.log('NewLike:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
  })

     //addcomments to page
     let list = document.getElementById('comments')
     let comments = dataImage.comments
     comments.forEach(comment => {
       list.innerHTML += `<li>${comment.content}</li>`
     })

  //eventlistener for new comments 
  const submitButton = document.getElementById('comment_form')
  submitButton.addEventListener('submit', function(){
    //event.preventDefault()

    let input = document.querySelector('input')
    let li = document.createElement('li')
    let newComment = input.value
    //append to list
    li.innerText = newComment

    let newComments = {
      image_id: imageId,
      content: newComment
    }

    fetch(commentsURL, {
      method: 'POST',
      body: JSON.stringify(newComments),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(response => console.log('NewComments:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));

  })

}//loadImage


})//domload
