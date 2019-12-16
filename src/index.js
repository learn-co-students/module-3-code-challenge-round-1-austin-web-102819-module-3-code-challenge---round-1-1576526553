document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4145 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likeButton = document.getElementById("like_button")

  const addComment = document.getElementById("comment_form")

  let data = fetch(imageURL).then(res => res.json())
  .then(res => displayImage(res))

  function displayImage(res) {
    let img = document.getElementById("image")
    let likes = document.getElementById("likes")
    let title = document.getElementById("name")
    let comment = document.getElementById("comments")

    img.src = res.url
    likes.innerText = res.like_count
    title.innerText = res.name
    
    displayComments(res)
  }

  function displayComments(res) {
    let comment = document.getElementById("comments")
    res.comments.forEach(com => {
      let c = document.createElement("li")
      let dele = document.createElement("button")
      dele.innerHTML = "Delete"
      c.setAttribute("id", `${com.id}`)
      dele.setAttribute("id", `${com.id}`)
      c.innerHTML = com.content
      comment.appendChild(c)
      comment.appendChild(dele)

      dele.addEventListener("click", (event) => {
        event.preventDefault()
        fetch(`https://randopic.herokuapp.com/comments/${event.target.id}`, {
        method: "delete"
        })
        alert("Comment Successfully Destroyed!")
        let garbage = document.getElementById(`${event.target.id}`)
        garbage.remove()
        let garb = document.getElementById(`${event.target.id}`)
        garb.remove()
      }) 
    })
  }

  likeButton.addEventListener("click", (event) => {
    event.preventDefault()
    let likes = document.getElementById("likes")
    let current = parseInt(likes.innerHTML) + 1
    likes.innerHTML = current

    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId})
    })
  })

  addComment.addEventListener("submit", (event) => {
    event.preventDefault()
    let com = document.getElementById("comment_input").value

    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId, content: com})
    })

    let comment = document.getElementById("comments")
    let c = document.createElement("li")
    c.innerHTML = com
    comment.appendChild(c)
  })

})
