const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const loginButton = document.getElementById("submit-login");
const loginButtonFunction = (event) =>
  verifyLogin(event, inputEmail, inputPassword);
let loggedUserId = "";
let currentUser = {};
let userData = [];

async function fetchUserData() {
  try {
    const response = await fetch(
      "https://6af5ce66f6270fa08d68a71a.mockapi.io/pawsnpals/users",
    );

    if (response.ok) {
      userData = await response.json();
      return userData;
    } else if (!response.ok) {
      throw new Error(
        "An error occured when loading the page. Please try again",
      );
    }
  } catch (error) {
    console.log(error.message);
  }
}

function verifyLogin(event, inputEmail, inputPassword) {
  event.preventDefault();

  const foundUser = userData.find(
    (user) =>
      user.email === inputEmail.value && user.password === inputPassword.value,
  );
  if (!foundUser) {
    console.log("No user found");
  } else {
    loggedUserId = foundUser.id;
    loginUser(loggedUserId, foundUser);
  }
}

function loginUser(loggedUserId, foundUser) {
  sessionStorage.setItem("loggedUserId", loggedUserId);
  sessionStorage.setItem("currentUser", JSON.stringify(foundUser));
  loginButton.disabled = true;
  window.location.href = "profile.html";
}

window.onload = async function () {
  userData = await fetchUserData();
  loginButton.addEventListener("click", loginButtonFunction);
};
