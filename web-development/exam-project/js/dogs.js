const flexContainer = document.getElementById("flex-container-dogs");
const cards = document.getElementsByClassName("card");
const seeMoreButton = document.getElementById("see-more");
const createCardFunction = () => (
  (dogIndex = createCard(dogData, dogIndex)),
  console.log(dogIndex)
);
const loggedUserId = sessionStorage.getItem("loggedUserId");
let dogIndex = 0;
let dogData = [];
let dogName = "";
let dogAge = null;
let dogImage = "img/placeholder.jpeg";
let selectedDog = 0;

// retrieve data from the API and generate cards with them
async function fetchDogData() {
  try {
    const response = await fetch(
      "https://6af5ce66f6270fa08d68a71a.mockapi.io/pawsnpals/dogs",
    );

    if (response.ok) {
      dogData = await response.json();
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

function createCard(data, dogIndex) {
  let dogIndexStart = 0;
  let dogIndexEnd = dogIndexStart + 8;

  if (!dogIndex == 0) {
    if (dogIndex % 2 === 0) {
      dogIndexStart = dogIndex + 1;
      dogIndexEnd = dogIndexStart + 7;
    } else if (dogIndex > 94) {
      dogIndexStart = dogIndex + 1;
      dogIndexEnd = 100 - dogIndex;
    } else {
      dogIndexStart = dogIndex + 1;
      dogIndexEnd = dogIndexStart + 8;
    }
  }

  for (let i = dogIndexStart; i < dogIndexEnd; i++) {
    const newCard = document.createElement("article");

    newCard.classList.add("card");

    if (!data.length == 0) {
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
              
              <button class="btn adopt">Adopt now</button>`;

    const adoptButton = newCard.children[3];
    const addFavourite = newCard.children[0].children[1];

    adoptButton.addEventListener(
      "click",
      (event) => (selectedDog = retrieveDogData(event)),
    );

    addFavourite.addEventListener("click", (event) => addFavourites(event));

    flexContainer.appendChild(newCard);
    dogIndex = i;
  }

  if (dogIndex === 100) {
    seeMoreButton.removeEventListener("click", createCardFunction);
    console.log("There are no more dogs to see!");
  }
  return dogIndex;
}

// retrieve dog data when clicking on "Adopt now"
function retrieveDogData(event) {
  console.log(event.target.tagName);
}

// add the clicked card to favourites associated with the logged user
function addFavourites(event) {
  event.preventDefault();
  const target = event.currentTarget;

  target.classList.toggle("bi-heart-fill");
}

// functions to execute ONLOAD
window.onload = async function () {
  dogData = await fetchDogData();
  dogIndex = createCard(dogData, dogIndex);
  seeMoreButton.addEventListener("click", createCardFunction);
  console.log("Logged user id: " + loggedUserId)
};
