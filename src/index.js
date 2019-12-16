document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4141 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function getImage(){
    fetch(imageURL)
    .then(response => response.json())
    .then(imageData => displayPage(imageData))
  }

  getImage()

  function displayPage(imageData) {
    document.querySelector('#image').src = imageData.url
    document.querySelector('#name').innerText = imageData.name
    document.querySelector('#likes').innerText = imageData.like_count

    let comments = imageData.comments

    comments.forEach(comment => {
      document.querySelector('#comments').innerHTML += `
      <li>${comment.content}</li>`
    });

    let likeButton = document.getElementById('like_button')
    
    likeButton.addEventListener('click', function() {
     numLikes = parseInt(document.getElementById('likes').innerText)
     document.querySelector('#likes').innerText = numLikes += 1
     let total = numLikes += 1
     
     let data = {
      image_id: imageData.id,
      like_count: total
     }

     fetch(likeURL, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       },
         body: JSON.stringify(data)
     })
    })

    let submitComment = document.getElementById('comment_form')
    
    submitComment.addEventListener('submit', function(e){
      e.preventDefault()
      let newComment = document.getElementById('comment_input').value
      document.querySelector('#comments').innerHTML += `
      <li>${newComment}</li><button>x</button>`

      let data = {
        image_id: imageData.id,
        content: newComment
       }
  
       fetch(commentsURL, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
         },
           body: JSON.stringify(data)
       })
    })

  }
})
