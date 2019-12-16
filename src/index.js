document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4131 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const commentUl= document.getElementById('comments');
  const likeElement = document.getElementById('likes');
  const likeButton = document.getElementById('like_button');
  const commentForm = document.getElementById('comment_form');

  let imgData;

  function getImgData() {
    fetch(imageURL)
    .then(response => response.json())
    .then(data => {
      imgData = data
      displayImgData(imgData);
      displayImgLikes(imgData)
      // displayComments(imgData)
    })
  }

  function displayImgData(data){
    let image = document.querySelector('img');
    image.src = `${data.url}`
    let name = document.getElementById("name")
    name.innerText= `${data.name}`
    let comments = data.comments
    
    comments.forEach(comment => {
      let commentLi = document.createElement('li');
      commentLi.innerText = `${comment.content}`
      commentUl.appendChild(commentLi)
      // console.log(comment.content)
    })
  }

  function displayImgLikes(data){
    likeElement.innerText= data.like_count;
    likeButton.addEventListener("click", () => likeImg(data))
  }

  function likeImg(dataInput) {
    let data = {
      image_id: 4131
    }
    
    let configObject = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    } 
    }
    fetch(likeURL, configObject)
    .then(resp => resp.json())
      .then(data => {
        let likeCount = dataInput.like_count
        let newLikeCount = parseInt(likeCount, 10) + 1
        likeElement.innerText = `${newLikeCount}`
      })
    // let likeCount = dataInput.like_count
    // let newLikeCount = likeCount + 1
    // likeElement.innerText = `${newLikeCount}`
    
  }

    commentForm.addEventListener("submit", addComment)

    function addComment(event) {
      event.preventDefault()
      //Grab the input tag for the form:
      let commentInput = document.querySelector("input")
      // This will show the value of what was entered
      console.log(commentInput.value)
      let comment = commentInput.value
      commentLi = document.createElement('li');
      commentLi.innerText = comment
      commentUl.appendChild(commentLi)
      let commentData = {
        image_id: 4131,
        content: `${comment}`
      }
  
      let configObject = {
        method: 'post',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      } 
      }
      fetch(commentsURL, configObject)

    }

  getImgData();
})
