const flexContainer = document.getElementById("flex-container-dogs");
const cards = document.getElementsByClassName("card");
const seeMoreButton = document.getElementById("see-more");
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

    newCard.innerHTML = `<img src="${dogImage}" alt="${dogName}.jpg" />
              <p>Name: ${dogName}</p>
              <p>Age: ${dogAge}</p>
              <button class="btn favourite">Add to favourites</button>
              <a href="adopt.html" class="btn adopt">Adopt now</a>`;

    flexContainer.appendChild(newCard);
  }
}

window.onload = async function () {
  const dogData = await fetchDogData();
  createCard(dogData);
};
