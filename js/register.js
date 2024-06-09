var userEmailInput = document.getElementById("userEmail");
var userPassInput = document.getElementById("userPass");
var userNameInput = document.getElementById("userName");
var emailExistsError = document.getElementById("emailExistsError");
// var registeredSuccessfully = document.getElementById("registeredSuccessfully");

var localUsers = "allUsers";
var allUsers = [];

var allUsers = JSON.parse(localStorage.getItem(localUsers)) || [];

function signUpUser() {
  var user = {
    name: userNameInput.value,
    email: userEmailInput.value,
    password: userPassInput.value,
  };

  if (isEmailExists(user.email)) {
    emailExistsError.classList.replace("d-none", "d-block");
    userEmailInput.classList.add("is-invalid");
    return;
  } else {
    emailExistsError.classList.replace("d-block", "d-none");
    if (
      validateFormInputs(userNameInput) &&
      validateFormInputs(userEmailInput) &&
      validateFormInputs(userPassInput)
    ) {
      allUsers.push(user);
      localStorage.setItem(localUsers, JSON.stringify(allUsers));
      clearForm();
      registerdSuccessfully.classList.replace("d-none", "d-block");
      setTimeout(function () {
        window.location.assign("./index.html");
      }, 2000);

      console.log("User added successfully");
    } else {
      console.log("Invalid input");
    }
  }
}

function isEmailExists(email) {
  return allUsers.some(function (user) {
    return user.email === email;
  });
}

function validateFormInputs(ele) {
  var regex = {
    userName: /^[a-zA-Z0-9]+$/,
    userEmail: /^.{3,}@(gmail|yahoo).com$/,
    userPass:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[{\]};:'",/?]).{8,}$/,
  };

  var isValid = regex[ele.id].test(ele.value);
  var parentOfElement = ele.parentElement;

  if (isValid) {
    console.log("Valid");
    if (ele.classList.contains("is-invalid")) {
      ele.classList.replace("is-invalid", "is-valid");
    } else {
      ele.classList.add("is-valid");
    }
    parentOfElement.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    console.log("InValid");
    if (ele.classList.contains("is-valid")) {
      ele.classList.replace("is-valid", "is-invalid");
    } else {
      ele.classList.add("is-invalid");
    }
    parentOfElement.nextElementSibling.classList.replace("d-none", "d-block");
  }
  return isValid;
}

function clearForm() {
  userEmailInput.value = "";
  userPassInput.value = "";
  userNameInput.value = "";
  userEmailInput.classList.remove("is-valid", "is-invalid");
  userPassInput.classList.remove("is-valid", "is-invalid");
  userNameInput.classList.remove("is-valid", "is-invalid");
}
