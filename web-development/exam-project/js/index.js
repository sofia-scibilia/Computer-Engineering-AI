const flexContainer = document.getElementById("flex-container-dogs");
const cards = document.getElementsByClassName("card");
const seeMoreButton = document.getElementById("see-more");
const loggedUserId = sessionStorage.getItem("loggedUserId");
let dogData = [];
let dogName = "";
let dogAge = null;
let dogImage = "img/placeholder.jpeg";

async function fetchDogData() {
  try {
    const response = await fetch(
      "https://6af5ce66f6270fa08d68a71a.mockapi.io/pawsnpals/dogs",
    );

    if (response.ok) {
      dogData = await response.json();
      sessionStorage.setItem("dogData", dogData);
      return dogData;
    } else if (!response.ok) {
      throw new Error(
        "An error occured when loading the page. Please try again",
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}

function createCard(data) {
  for (let i = 0; i < 8; i++) {
    const newCard = document.createElement("article");
    newCard.classList.add("card");

    if (!dogData.length == 0) {
      dogAge = data[i].age;
      dogName = data[i].name;
      dogImage = data[i].url;
    } else {
      dogName = "";
      dogAge = "";
      dogImage = "img/placeholder.jpeg";
    }

    newCard.innerHTML = `<div class="img-wrapper">
                <img src="${dogImage}" alt="${dogName}.jpg" />
                <button class="btn favourite"><i class="bi bi-heart" aria-hidden="true"></i></button> 
              </div>         
              <p>Name: ${dogName}</p>
              <p>Age: ${dogAge}</p>
              <a href="adopt.html" class="btn adopt">Adopt now</a>`;

    const adoptButton = newCard.children[3];
    const addFavourite = newCard.children[0].children[1];

    adoptButton.addEventListener(
      "click",
      (event) => (selectedDog = retrieveDogData(event)),
    );

    addFavourite.addEventListener("click", (event) => addFavourites(event));

    flexContainer.appendChild(newCard);
  }
}

function addFavourites(event) {
  event.preventDefault();
  const target = event.currentTarget;

  if (loggedUserId != "") {
    target.classList.toggle("bi-heart-fill");
  } else {
    alert("Login to add dogs to favourites!");
  }
}

window.onload = async function () {
  dogData = await fetchDogData();
  createCard(dogData);
};
