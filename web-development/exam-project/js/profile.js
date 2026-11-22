const loggedUserId = sessionStorage.getItem("loggedUserId");
const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
const main = document.getElementsByTagName("main")[0];

main.innerHTML = `
      <section id="profile">
        <h1>Welcome back</h1>
        <h2><strong>${currentUser.firstName}</strong></h2>
        <img
          id="profile-picture"
          src="${currentUser.avatar}"
          alt="No image found"
        />
        <p><strong>Name:</strong> ${currentUser.firstName}</p>
        <p><strong>Surname:</strong> ${currentUser.lastName}</p>
        <p><strong>Email:</strong> ${currentUser.email}</p>
      </section>`;
