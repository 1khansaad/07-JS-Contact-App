"use strict";

const modalLogin = document.querySelector(".modal");
const inputEmail = document.querySelector(".email");
const inputPassword = document.querySelector(".password");
const btnLogin = document.querySelector(".btn--login");
const msgEmail = document.querySelector(".msg-email");
const msgPassword = document.querySelector(".msg-password");
const msg = document.createElement("p");
const appBody = document.querySelector(".container-app");
const btnLogout = document.querySelector(".log-out");
const modalLogout = document.querySelector(".modal-logout");
const overlay = document.querySelector(".overlay");
const btnNo = document.querySelector(".btn-no");
const btnYes = document.querySelector(".btn-yes");
const btnCloseLogoutModal = document.querySelectorAll(".btn--close-modal");
const contactForm = document.querySelector(".contact-form");
const btnAddContact = document.querySelector(".add-contact");
const btnCancel = document.querySelector(".btn-cancel");
const btnDone = document.querySelector(".btn-done");
const inputFirstName = document.getElementById("first-name");
const inputLastName = document.getElementById("last-name");
const inputContact = document.getElementById("contact");
const inputEmaill = document.getElementById("email");
const titleContainer = document.querySelector(".title-container");
const contactData = [];

console.log(modalLogout);

// implementing login
inputEmail.addEventListener("focus", function () {
  msg.classList.remove("error");
  msg.innerHTML = "";
});

//
modalLogin.classList.add("hidden");
appBody.classList.remove("hidden");
//

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const inputValue = inputEmail.value.toLowerCase();
  if (
    inputValue.includes("@gmail.com") &&
    inputPassword.value.length >= 6 &&
    inputPassword.value.length <= 10
  ) {
    modalLogin.classList.add("hidden");
    appBody.classList.remove("hidden");
  }
  if (!inputValue.includes("@gmail.com") || !inputValue) {
    const html = `<p class='error'>Invalid Email address!</p>`;
    msgEmail.insertAdjacentHTML("beforeend", html);
  }
  if (
    inputPassword.value.length <= 6 ||
    inputPassword.value.length >= 10 ||
    !inputPassword
  ) {
    const html = `<p class='error'>Invalid Password!</p>`;
    msgPassword.insertAdjacentHTML("beforeend", html);
  }
});

//  implementing logout
btnLogout.addEventListener("click", () => {
  modalLogout.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

btnNo.addEventListener("click", () => {
  modalLogout.classList.add("hidden");
  overlay.classList.add("hidden");
});
btnCloseLogoutModal[0].addEventListener("click", () => {
  modalLogout.classList.add("hidden");
  overlay.classList.add("hidden");
  contactForm.classList.add("hidden");
});
btnCloseLogoutModal.forEach((element) =>
  element.addEventListener("click", () => {
    modalLogout.classList.add("hidden");
    overlay.classList.add("hidden");
    contactForm.classList.add("hidden");
  })
);
btnCancel.addEventListener("click", () => {
  overlay.classList.add("hidden");
  contactForm.classList.add("hidden");
});
overlay.addEventListener("click", () => {
  modalLogout.classList.add("hidden");
  overlay.classList.add("hidden");
  contactForm.classList.add("hidden");
});
btnYes.addEventListener("click", () => {
  modalLogin.classList.remove("hidden");
  appBody.classList.add("hidden");
  // overlay.classList.remove("hidden");
});
btnAddContact.addEventListener("click", () => {
  contactForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
const render = () => {
  const html = `
  <li class="content">
              <span>${inputFirstName.value} ${inputLastName.value}</span>
              <span>${inputContact.value}</span>
              <span>${inputEmaill.value}</span>
              <span class="chng">
                <img
                  src="img/delete-svgrepo-com.svg"
                  height="40rem"
                  alt="delete"
                />
              </span>
              <span class="chng">
                <img src="img/edit-svgrepo-com.svg" height="40rem" alt="edit" />
              </span>
            </li>
  `;
  titleContainer.insertAdjacentHTML("beforeend", html);
  contactData.push({
    firstName: inputFirstName.value,
    firstName: inputLastName.value,
    firstName: inputContact.value,
    firstName: inputEmaill.value,
  });
  inputFirstName.value =
    inputLastName.value =
    inputContact.value =
    inputEmaill.value =
      "";
};
btnDone.addEventListener("click", () => {
  render();
  contactForm.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});
console.log(contactData);
