var userEmailInput = document.getElementById("userEmail");
var userPassInput = document.getElementById("userPass");
var localUsers = "allUsers";
var allUsers = [];

var allUsers = JSON.parse(localStorage.getItem(localUsers)) || [];
var name;
function signInUser() {
  var user = {
    email: userEmailInput.value,
    password: userPassInput.value,
  };
  var userRecord = getUserByEmail(user.email);

  if (!userRecord) {
    emailExistsError.classList.replace("d-none", "d-block");
    userEmailInput.classList.add("is-invalid");
    return;
  } else {
    emailExistsError.classList.replace("d-block", "d-none");
    if (userRecord.password !== user.password) {
      incorrectPasswordError.classList.replace("d-none", "d-block");
      userPassInput.classList.add("is-invalid");
      return;
    } else {
      incorrectPasswordError.classList.replace("d-block", "d-none");
      if (
        validateFormInputs(userEmailInput) &&
        validateFormInputs(userPassInput)
      ) {
        clearForm();
        document
          .getElementById("directionLink")
          .setAttribute("href", "home.html");
        localStorage.setItem("userNameInput", userRecord.name);
      } else {
        console.log("Invalid input");
      }
    }
  }
}

function getUserByEmail(email) {
  return allUsers.find(function (user) {
    return user.email === email;
  });
}

function validateFormInputs(ele) {
  var regex = {
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
  userEmailInput.classList.remove("is-valid", "is-invalid");
  userPassInput.classList.remove("is-valid", "is-invalid");
}
