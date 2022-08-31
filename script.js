"use strict";

const modalLogin = document.querySelector(".modal");
const inputEmail = document.querySelector(".email");
const inputPassword = document.querySelector(".password");
const btnLogin = document.querySelector(".btn--login");
const msgEmail = document.querySelector(".msg-email");
const msgPassword = document.querySelector(".msg-password");
const msg = document.createElement("p");
const appBody = document.querySelector(".container-app");
const btnLogout = document.querySelector(".logout");
const modalLogout = document.querySelector(".modal-logout");
console.log(msgEmail, msgPassword);

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
btnLogout.addEventListener("clcik", () => {
  modalLogout.classList.remove("hidden");
});
