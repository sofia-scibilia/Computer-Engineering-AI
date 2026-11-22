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

window.onload = async function () {
  const dogData = await fetchDogData();
};
