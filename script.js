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
const msgFormFirst = document.querySelector(".msg-one");
const msgFormLast = document.querySelector(".msg-two");
const msgFormContact = document.querySelector(".msg-three");
const msgFormEmail = document.querySelector(".msg-four");

const displayOverlay = () => overlay.classList.remove("hidden");
const hideOverlay = () => overlay.classList.add("hidden");
const displayForm = () => contactForm.classList.remove("hidden");
const hideForm = () => contactForm.classList.add("hidden");
const hideModalLogout = () => modalLogout.classList.add("hidden");
const hideModalDelete = () => modalDelete.classList.add("hidden");

let contactData = [];
let done;
let index;

//
const setStorage = () => {
  localStorage.setItem("contacts", JSON.stringify(contactData));
};

contactData = JSON.parse(localStorage.getItem("contacts"));
//

const funRemoveEvent = () => btnDone.removeEventListener("click", funBtnDone);
const funAddEvent = () => btnDone.addEventListener("click", funBtnDone);
const funFocus = () => {
  const error = document.querySelectorAll(".error");
  const error2 = document.querySelectorAll(".error2");
  error2.forEach((el) => el.remove());
  error.forEach((el) => el.remove());
};
const funFocusEmail = () => {
  btnLogin.addEventListener("click", funLoginCheck);
  const error = document.querySelectorAll(".error");
  error.forEach((el) => el.remove());
};
// implementing login

const funLoginCheck = (e) => {
  e.preventDefault();
  const inputValue = inputEmail.value.toLowerCase();
  if (!inputValue || !inputValue.includes("@gmail.com")) {
    const error = document.querySelector(".error");
    if (error) error.remove();
    const html = `<p class='error'>Invalid Email address!</p>`;
    msgEmail.insertAdjacentHTML("beforeend", html);
  }
  if (
    !inputPassword.value ||
    inputPassword.value.length <= 6 ||
    inputPassword.value.length >= 10
  ) {
    const error = document.querySelector(".error2");
    if (error) error.remove();
    const html = `<p class='error2'>Password length should be more than 6 or less than 10</p>`;
    msgPassword.insertAdjacentHTML("beforeend", html);
  }
  if (
    inputValue.includes("@gmail.com") &&
    inputPassword.value.length > 6 &&
    inputPassword.value.length < 10
  ) {
    modalLogin.classList.add("hidden");
    appBody.classList.remove("hidden");
    render();
    inputEmail.value = inputPassword.value = "";
  }
};
btnLogin.addEventListener("click", funLoginCheck);

//  implementing logout
btnLogout.addEventListener("click", () => {
  modalLogout.classList.remove("hidden");
  displayOverlay();
});

btnNo.forEach((el) => {
  el.addEventListener("click", () => {
    hideModalLogout();
    hideOverlay();
    hideModalDelete();
  });
});

btnCloseLogoutModal.forEach((element) =>
  element.addEventListener("click", () => {
    hideModalLogout();
    hideOverlay();
    hideForm();
    hideModalDelete();
    clearInputField();
    funFocus();
    done = "";
  })
);
btnCancel.addEventListener("click", () => {
  hideOverlay();
  hideForm();
  clearInputField();
  funFocus();
  done = "";
});
overlay.addEventListener("click", () => {
  hideModalLogout();
  hideOverlay();
  hideForm();
  hideModalDelete();
  clearInputField();
  funFocus();
  done = "";
});
btnYes.addEventListener("click", () => {
  modalLogin.classList.remove("hidden");
  appBody.classList.add("hidden");
  hideModalLogout();
  hideOverlay();
  const content = document.querySelectorAll(".content");
  content.forEach((el) => el.remove());
});
btnAddContact.addEventListener("click", () => {
  displayForm();
  displayOverlay();
  done = "contactForm";
});
const funBtnDone = () => {
  funFocus();
  const content = document.querySelectorAll(".content");
  if (done == "contactForm") {
    if (!inputFirstName.value) {
      const html = `<p class='error'>Invalid first name!</p>`;
      msgFormFirst.insertAdjacentHTML("beforeend", html);
      funRemoveEvent();
    }
    if (!inputLastName.value) {
      const html = `<p class='error'>Invalid last name!</p>`;
      msgFormLast.insertAdjacentHTML("beforeend", html);
      funRemoveEvent();
    }
    if (!inputContact.value || inputContact.value.length !== 10) {
      const html = `<p class='error'>Invalid contact!</p>`;
      msgFormContact.insertAdjacentHTML("beforeend", html);
      funRemoveEvent();
    }
    if (!inputEmaill.value || !inputEmaill.value.includes("@gmail.com")) {
      const html = `<p class='error'>Invalid email!</p>`;
      msgFormEmail.insertAdjacentHTML("beforeend", html);
      funRemoveEvent();
    }
    if (
      inputFirstName.value &&
      inputLastName.value &&
      inputContact.value &&
      inputContact.value.length == 10 &&
      inputEmaill.value &&
      inputEmaill.value.includes("@gmail.com")
    ) {
      content.forEach((el) => {
        el.remove();
      });
      pushData();
      render();

      contactForm.classList.add("hidden");
      overlay.classList.add("hidden");
      clearInputField();
      done = "";
    }
  }
  if (done == "editForm") {
    content.forEach((el) => {
      el.remove();
    });
    contactData.splice(index, 1);
    pushData();
    render();

    contactForm.classList.add("hidden");
    overlay.classList.add("hidden");
    clearInputField();
    done = "";
  }
};

const render = () => {
  contactData.forEach((x) => {
    const html = `
  <li class="content">
              <span>${x.firstName} ${x.lastName}</span>
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

  btnDelete.forEach((el, i) => {
    el.addEventListener("click", (e) => {
      modalDelete.classList.remove("hidden");
      displayOverlay();
      index = i;
    });
  });
  btnEdit.forEach((el, i) => {
    el.addEventListener("click", () => {
      funFocus();
      inputContact.value = contactData[i].contact;
      inputEmaill.value = contactData[i].email;
      inputFirstName.value = contactData[i].firstName;
      inputLastName.value = contactData[i].lastName;
      displayForm();
      displayOverlay();
      index = i;
      done = "editForm";
    });
  });
};
const pushData = () => {
  contactData.unshift({
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    contact: inputContact.value,
    email: inputEmaill.value,
  });
  setStorage();
};
btnDeleteYes.addEventListener("click", (e) => {
  hideOverlay();
  modalDelete.classList.add("hidden");
  console.log(contactData);
  contactData.splice(index, 1);
  setStorage();
  const content = document.querySelectorAll(".content");
  content.forEach((el) => {
    el.remove();
  });
  render();
});
const clearInputField = () => {
  inputEmaill.value =
    inputContact.value =
    inputFirstName.value =
    inputLastName.value =
      "";
};

inputFirstName.addEventListener("focus", funFocus);
inputLastName.addEventListener("focus", funFocus);
inputContact.addEventListener("focus", funFocus);
inputEmaill.addEventListener("focus", funFocus);
inputEmail.addEventListener("focus", funFocusEmail);
inputPassword.addEventListener("focus", funFocus);

btnDone.addEventListener("click", funBtnDone);
// console.log(0 <= 6 || 5 <= 6 || )
