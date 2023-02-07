let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // new code
  toyFormContainer.addEventListener("submit", (e) => {
    e.preventDefault()
    let toyUrl = toyFormContainer.querySelector('input[name="image"]').value
    fetch(toyUrl)
    .then(resp => resp.json())
    .then(data => addToyToPage(data))
  })
  function addToyToPage(data) {
    let imageURL = data.image
    let enteredName = toyFormContainer.querySelector('input[name="name"]').value
    let toyName = data.name
    let likes = data.likes
    let id = data.id
    ///card
    let newCard = document.createElement('div')
    newCard.className = "card"
    //toyname
    let h2 = document.createElement('h2')
    h2.innerText = `${enteredName} (${toyName})`
    newCard.appendChild(h2)
    //image
    let img = document.createElement('img')
    img.src = imageURL
    img.className = "toy-avatar"
    newCard.appendChild(img)
    //likes
    let p = document.createElement('p')
    p.innerText = likes + ' likes'
    newCard.appendChild(p)
    //button
    let btn = document.createElement('button')
    btn.className = "like-btn"
    btn.id = id
    btn.innerText = 'Like ❤️'
    newCard.appendChild(btn)
    //add to page
    document.querySelector("#toy-collection").appendChild(newCard)
    btn.addEventListener('click', () => {
      let newLikes = ++likes
      updateLikes(newLikes, id)
      p.innerText = newLikes + ' likes'
    })
  }
  /// add button like
  
  
  //update likes with patch
  function updateLikes(newLikes, id) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method:'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body : JSON.stringify({
        "likes": newLikes
      })
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
  }

});

console.log('hello')
///Next thing to do: makes sure that the page updates with the updated likes