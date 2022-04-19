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
  toyFormContainer.addEventListener("submit", (event) => {
    event.preventDefault()
    postToy(event.target.name.value, event.target.image.value)
   })
   
});

function getToys() {
fetch("http://localhost:3000/toys")
.then(response => response.json())
.then(response => response.map(createCard))
}
getToys()

function createCard(toy) {

let toyCollection = document.getElementById("toy-collection")
let div = document.createElement("div")
div.className = "card"
toyCollection.append(div)

const toyCard = `<h2>${toy.name}</h2>
<img src=${toy.image} class="toy-avatar" />
<p>${toy.likes} Likes</p>
<button class="like-btn" id="[toy_id]">Like ❤️</button>`
div.innerHTML += toyCard

}


function postToy(name, url) {
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": url,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(data => createCard(data))
}

function patchToyLikes(id, newLikes) {
  fetch(`http://localhost:3000/toys/:${id}`, {
    method: 'PATCH',
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": likes
    })
  })
}
const likeButton = document.getElementById("[toy_id]")
likeButton.addEventListener("click", (e) => {
    console.log(e.target)
})