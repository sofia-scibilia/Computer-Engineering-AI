const flexContainer = document.getElementById("flex-container-dogs");
const cards = document.getElementsByClassName("card");
const seeMoreButton = document.getElementById("see-more");
const createCardFunction = () => (
  (dogIndex = createCard(dogData, dogIndex)),
  console.log(dogIndex)
);
let dogIndex = 0;
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

function submitAdoptionForm(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const chosenDog = document.getElementById("chosen-dog").value;

  const formData = {
    name: name,
    email: email,
    phone: phone,
    chosenDog: chosenDog,
  };

  console.log("Form data submitted:", formData);
}

function formVerification() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const chosenDog = document.getElementById("chosen-dog").value;
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

    newCard.innerHTML = `<img src="${dogImage}" alt="${dogName}.jpg" />
              <p>Name: ${dogName}</p>
              <p>Age: ${dogAge}</p>
              <button class="btn favourite">Add to favourites</button>
              <a href="adopt.html" class="btn adopt">Adopt now</a>`;

    flexContainer.appendChild(newCard);
    dogIndex = i;
  }

  if (dogIndex === 100) {
    seeMoreButton.removeEventListener("click", createCardFunction);
    console.log("There are no more dogs to see!");
  }
  return dogIndex;
}

window.onload = async function () {
  const dogData = await fetchDogData();
  dogIndex = createCard(dogData, dogIndex);
  seeMoreButton.addEventListener("click", createCardFunction);
};
