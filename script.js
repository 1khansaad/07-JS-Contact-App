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

// implementing login
inputEmail.addEventListener("focus", function () {
  msg.classList.remove("error");
  msg.innerHTML = "";
});

//
// modalLogin.classList.add("hidden");
// appBody.classList.remove("hidden");
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
    inputEmail.value = inputPassword.value = "";
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
});
btnAddContact.addEventListener("click", () => {
  displayForm();
  displayOverlay();
  done = "contactForm";
});
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
  contactData.push({
    firstName: inputFirstName.value,
    lastName: inputLastName.value,
    contact: inputContact.value,
    email: inputEmaill.value,
  });
};
btnDeleteYes.addEventListener("click", () => {
  hideOverlay();
  modalDelete.classList.add("hidden");
  contactData.splice(index, 1);
  const content = document.querySelectorAll(".content");
  content.forEach((el) => {
    el.remove();
  });
  render();
});

const funRemoveEvent = () => btnDone.removeEventListener("click", funBtnDone);
const funAddEvent = () => btnDone.addEventListener("click", funBtnDone);
const funFocus = () => {
  funAddEvent();
  const error = document.querySelectorAll(".error");
  error.forEach((el) => el.remove());
};
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

const funBtnDone = () => {
  const content = document.querySelectorAll(".content");
  if (done == "contactForm") {
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
      inputEmaill.value =
        inputContact.value =
        inputFirstName.value =
        inputLastName.value =
          "";
      done = "";
    }
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
    if (!inputContact.value || !inputContact.value.length == 10) {
      const html = `<p class='error'>Invalid contact!</p>`;
      msgFormContact.insertAdjacentHTML("beforeend", html);
      funRemoveEvent();
    }
    if (!inputEmaill.value || !inputEmaill.value.includes("@gmail.com")) {
      const html = `<p class='error'>Invalid email!</p>`;
      msgFormEmail.insertAdjacentHTML("beforeend", html);
      funRemoveEvent();
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
btnDone.addEventListener("click", funBtnDone);
