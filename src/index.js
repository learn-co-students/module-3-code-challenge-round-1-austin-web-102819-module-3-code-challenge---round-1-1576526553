document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4133 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/4133`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`



  // get data

  function getData(){
    fetch('https://randopic.herokuapp.com/images/4133')
    .then(response => response.json())
    .then(data => pageBuilder(data))
    // .then(data => console.log(data))
  }
    getData()


    // display data 

  function pageBuilder(data){

    // console.log(data)
    const image = document.getElementById("image")
    image.src = data.url

    const name = document.getElementById("name")
    name.innerHTML = data.name

    const likes = document.getElementById("likes")
    likes.innerHTML = data.like_count

    const ul = document.getElementById("comments")
    
    data.comments.forEach(comment => {
      const li = document.createElement("li")
      // const deletebutton = document.createElement("button")
      // deletebutton.innerHTML = "Delete" 
      // deletebutton.addEventListener("click", ()=> removeComment())
      li.innerHTML = comment.content
      // li.appendChild(deletebutton)
      ul.appendChild(li)
    });

    // function removeComment(){
    //   console.log("delete button working")
    // }

      // like button nonsence

    const likeButton = document.getElementById("like_button")
    likeButton.addEventListener("click", () => likeFunction(data))

    function likeFunction(data){
      // console.log("button working")
      let currentlikes = likes.innerHTML
      let updatelikes = parseInt(currentlikes) + 1
      likes.innerHTML = updatelikes

        fetch("https://randopic.herokuapp.com/likes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            image_id: imageId   
          })
        })
      
    }


      // comment bollocks

      const commentform = document.getElementById("comment_form")
      commentform.addEventListener("submit", () => commentFunction(event))

    function commentFunction(event){
      event.preventDefault()
      // console.log(event)

      const commentinput = document.querySelector("input[name=comment]").value;
      const li = document.createElement("li")
      li.innerHTML = commentinput
      ul.appendChild(li)


      fetch("https://randopic.herokuapp.com/comments/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            image_id: imageId,  
            content: commentinput

          })
        })




    }  




  }


})
