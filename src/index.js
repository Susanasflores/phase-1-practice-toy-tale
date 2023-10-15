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
})

  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => {
  console.log(data);
  data.forEach(item => {
  const toysDiv = document.createElement("div");
  const toysCollectionDiv = document.getElementById("toy-collection");
  toysCollectionDiv.appendChild(toysDiv);
  toysDiv.classList.add("card")
  console.log(toysDiv)
  
  const childNode = document.createElement("h2");
  childNode.textContent = item.name;
  toysDiv.appendChild(childNode);

  const toysImage = document.createElement("img");
  toysDiv.appendChild(toysImage);
  toysImage.className = "toy-avatar";
  toysImage.src = item.image;

  const pTag = document.createElement("p");
  pTag.textContent = `${item.likes} Likes`;
  toysDiv.appendChild(pTag);

  const btn = document.createElement("button");
  btn.setAttribute("class", "like-btn");
  btn.setAttribute("id", item.id);
  btn.textContent = "Like ❤️";  
  toysDiv.appendChild(btn);
  });
});



document.addEventListener("submit", function () {
const inputForm = document.querySelector('.add-toy-form');
const nameInput = inputForm.querySelector('input[name="name"]');
const imageInput = inputForm.querySelector('input[name="image"]');

const nameValue = nameInput.value;
const imageValue = imageInput.value;

const requestBody = {
  name: nameValue,
  image: imageValue,
  likes: 0
}  
fetch('http://localhost:3000/toys', {
method: 'POST',
headers: {
  'Content-Type': "application/json",
  Accept: "application/json"
},
body: JSON.stringify(requestBody)
})
.then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Something went wrong');
  }
})
.then(data => {
  if (Array.isArray(data)) {
    document.querySelectorAll('.card').forEach((toyCard, index) => {
      const toyImage = toyCard.querySelector('.toy-avatar');
      toyImage.src = data[index].image;
    });
  } else {
    const toyCard = document.querySelector('.card');
    const toyImage = toyCard.querySelector('.toy-avatar');
    toyImage.src = data.image;
  }
});
});


document.addEventListener("click", function(event) {
  if(event.target.classList.contains("like-btn")) {
    const toyId = event.target.id; // capture the toy's id

    //calculate the new number of likes
    const currentLikes = parseInt(event.target.previousSibling.textContent);
    const newNumberOfLikes = currentLikes + 1;
    //make a patch request with headers and body
  fetch(`http://localhost:3000/toys/${toyId}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "likes": newNumberOfLikes
  })
})
.then(res => res.json())
.then(data => {
// update the toy's card in the DOM based on the response
event.target.previousSibling.textContent = `${newNumberOfLikes} Likes`;
})
  }
})



