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
const btnNo = document.querySelectorAll(".btn-no");
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
const modalDelete = document.querySelector(".modal-delete");
const btnDeleteYes = document.querySelector(".btn-delete-yes");

let contactData = [];

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

btnNo.forEach((x) => {
  x.addEventListener("click", () => {
    modalLogout.classList.add("hidden");
    overlay.classList.add("hidden");
    modalDelete.classList.add("hidden");
  });
});
// btnCloseLogoutModal[0].addEventListener("click", () => {
//   modalLogout.classList.add("hidden");
//   overlay.classList.add("hidden");
//   contactForm.classList.add("hidden");
// });
btnCloseLogoutModal.forEach((element) =>
  element.addEventListener("click", () => {
    modalLogout.classList.add("hidden");
    overlay.classList.add("hidden");
    contactForm.classList.add("hidden");
    modalDelete.classList.add("hidden");
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
  modalDelete.classList.add("hidden");
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
  contactData.forEach((x) => {
    const html = `
  <li class="content">
              <span>${x.name}</span>
              <span>${x.contact}</span>
              <span>${x.email}</span>
              <span class="chng delete-btn">
                <img
                  src="img/delete-svgrepo-com.svg"
                  height="40rem"
                  alt="delete"
                />
              </span>
              <span class="chng edit-btn">
                <img src="img/edit-svgrepo-com.svg" 
                height="40rem" 
                alt="edit" />
              </span>
            </li>
  `;
    titleContainer.insertAdjacentHTML("beforeend", html);
  });

  const btnDelete = document.querySelectorAll(".delete-btn");
  const btnEdit = document.querySelectorAll(".edit-btn");

  btnDelete.forEach((el) => {
    el.addEventListener("click", (e) => {
      modalDelete.classList.remove("hidden");
      overlay.classList.remove("hidden");
    });
  });
  btnEdit.forEach((el) => {
    el.addEventListener("click", () => {
      contactForm.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
      console.log("clicked");
    });
  });
};
// render(contactData[0]);
const pushData = () => {
  contactData.push({
    name: inputFirstName.value + inputLastName.value,
    contact: inputContact.value,
    email: inputEmaill.value,
  });
};
btnDeleteYes.addEventListener("click", () => {
  console.log("hi");
});
btnDone.addEventListener("click", () => {
  const content = document.querySelectorAll(".content");
  content.forEach((el) => {
    el.remove();
  });
  pushData();
  render();
  contactForm.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  inputEmaill.value =
    inputContact.value =
    inputFirstName.value =
    inputLastName.value =
      "";
});
