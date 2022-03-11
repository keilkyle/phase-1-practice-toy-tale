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
});

toys = {}

fetch("http://localhost:3000/toys")
  .then((resp) => resp.json())
  .then((data) => {
    for (toy in data) {
    let div = document.createElement("div")
    div.innerHTML = `<h2>${data[toy]["name"]}</h2>
    <img src="${data[toy]["image"]}" class="toy-avatar" />
    <p>${data[toy]["likes"]} Likes</p>
    <button class="like-btn" id="${data[toy]["id"]}">Like ❤️</button>`
    div.setAttribute("class","card")
    let toyCollection = document.querySelector("#toy-collection")
    toyCollection.appendChild(div)
  }
    let hearts = document.getElementsByClassName("like-btn")
    for (heart in hearts) {
    hearts[heart].addEventListener("click", likeToy)
  }})

let form = document.querySelector(".add-toy-form")
form.addEventListener("submit", postToy)

function postToy() {
const newToy = fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": form.getElementsByTagName("input")[0].value,
      "image": form.getElementsByTagName("input")[1].value,
      "likes": 0
    })
  });
}

function likeToy(e) {
  id = e.target["id"]

  fetch(`http://localhost:3000/toys/${id}`)
  .then (resp => resp.json())
  .then (data => {
    likes = data["likes"]+1

  const likeToy = fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "likes": likes
    })
  })
  e.target.parentNode.querySelector("p").textContent = `${likes} Likes`

  })

}