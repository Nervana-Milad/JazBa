var userEmailInput = document.getElementById("userEmail");
var userPassInput = document.getElementById("userPass");
var userNameInput = document.getElementById("userName");
var emailExistsError = document.getElementById("emailExistsError");
//
var userDonationInput = document.querySelector("#userDonation");
var userPhoneInput = document.querySelector("#userPhone");
var userCountryInput = document.querySelector("#userCountry");
var userStateInput = document.querySelector("#userState");
let donationSuccessfully = document.getElementById("donationSuccessfully");

var whatDonation = document.querySelector("#whatDonation");
var continueBtn = document.getElementById("continueBtn");
//

let registerdSuccessfully = document.getElementById("registerdSuccessfully");

var localUsers = "allUsers";
var allUsers = [];

var allUsers = JSON.parse(localStorage.getItem(localUsers)) || [];
//trueeeeeeeeeee
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

// trueeeeee
function donationUsers() {
  var user = {
    amout: userDonationInput.value,
    phone: userPhoneInput.value,
    country: userCountryInput.value,
    state: userStateInput.value,
  };

  if (
    validateFormInputs(userDonationInput) &&
    validateFormInputs(userPhoneInput) &&
    validateFormInputs(userStateInput)
  ) {
    allUsers.push(user);
    localStorage.setItem(localUsers, JSON.stringify(allUsers));
    donationSuccessfully.classList.replace("d-none", "d-block");
    console.log("Donation added successfully");
  } else {
    console.log("Invalid donation");
  }
}

function isEmailExists(email) {
  return appData.users.some((user) => user.email === email);
}

function validateFormInputs(input) {
  return input.value.trim() !== "";
}

function clearForm() {
  userNameInput.value = "";
  userEmailInput.value = "";
  userPassInput.value = "";
  userDonationInput.value = "";
  userPhoneInput.value = "";
  userCountryInput.value = "";
  userStateInput.value = "";
}

let closeBtn = Array.from(document.querySelectorAll(".closeBtn"));
for (let i = 0; i < closeBtn.length; i++) {
  closeBtn[i].addEventListener("click", clearDonationForm);
  whatDonation.textContent = "Donation amount: " + 0;
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
    userDonation: /^([1-9][0-9]{3,}|1000)$/,
    userPhone: /^(010|011|012|015)[0-9]{8}$/,
    userCounty:
      /^(United States|Canada|United Kingdom|Australia|Germany|France|India|Japan|Egypt)$/,
    userState: /^[A-Za-z\s]{3,99}$/,
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

//
function getAmount() {
  whatDonation.textContent = "Donation amount: " + userDonationInput.value;
}
userDonationInput.addEventListener("input", getAmount);
//

function clearForm() {
  userEmailInput.value = "";
  userPassInput.value = "";
  userNameInput.value = "";
  userEmailInput.classList.remove("is-valid", "is-invalid");
  userPassInput.classList.remove("is-valid", "is-invalid");
  userNameInput.classList.remove("is-valid", "is-invalid");
}

function clearDonationForm() {
  userDonationInput.value = "";
  userPhoneInput.value = "";
  userCountryInput.value = "";
  userStateInput.value = "";
  userDonationInput.classList.remove("is-valid", "is-invalid");
  userPhoneInput.classList.remove("is-valid", "is-invalid");
  userCountryInput.classList.remove("is-valid", "is-invalid");
  userStateInput.classList.remove("is-valid", "is-invalid");
}

function checkFields() {
  const requiredInputs = document.querySelectorAll("input[required]");
  const continueBtn = document.querySelector(".continueBtn");
  let allFieldsFilled = true;
  requiredInputs.forEach(function (input) {
    if (!input.value.trim()) {
      allFieldsFilled = false;
    }
  });
  if (allFieldsFilled) {
    continueBtn.removeAttribute("disabled");
  } else {
    continueBtn.setAttribute("disabled", "disabled");
  }
}
document.querySelectorAll("input[required]").forEach(function (input) {
  input.addEventListener("input", checkFields);
});

continueBtn.addEventListener("click", function () {
  const selectedPaymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  );
  if (selectedPaymentMethod) {
    const paymentMethod = selectedPaymentMethod.value;
    const modalTitle = document.getElementById("paymentMethodDetailsLabel");
    const modalContent = document.getElementById("paymentMethodDetailsContent");
    modalTitle.textContent = paymentMethod + " details";
    let methodDetails = "";
    switch (paymentMethod) {
      case "Wire Transfer":
        methodDetails =
          "Wire Transfer: Please provide your bank account details for the transfer.";
        break;
      case "Credit Card":
        methodDetails = `<div>
            Credit Card: Enter your credit card details to proceed with the payment.
            <div class="mt-3">
              <label for="creditCardNumber">Credit Card Number:</label>
              <input type="text" id="creditCardNumber" oninput="checkCridetCard()" class="form-control" maxlength="16" pattern="\\d{16}" required>
              <span class="text-danger d-none" id="creditCardError">Credit card number must be 16 digits.</span>
            </div>
          </div>
`;
        break;
      case "Debit Card":
        methodDetails = `<div>
            Debit Card: Enter your debit card details to proceed with the payment.
            <div class="mt-3">
              <label for="debitCardNumber">Debit Card Number:</label>
              <input type="text" id="debitCardNumber" oninput="checkDepitCard()" class="form-control" maxlength="16" pattern="\\d{16}" required>
              <span class="text-danger d-none" id="debitCardError">Debit card number must be 16 digits.</span>
            </div>
          </div>
`;
        break;
      case "E-Wallet":
        methodDetails =
          "E-Wallet: You can pay using various e-wallet options available.";
        break;
      case "Online Banking":
        methodDetails =
          "Online Banking: You will be redirected to your bank's online banking portal.";
        break;
      case "UPI / QR":
        methodDetails =
          "UPI / QR: Scan the QR code or enter your UPI ID to proceed with the payment.";
        break;
      default:
        methodDetails = "Please select a valid payment method.";
    }
    modalContent.innerHTML = methodDetails;
    const paymentMethodDetailsModal = new bootstrap.Modal(
      document.getElementById("paymentMethodDetailsModal")
    );
    paymentMethodDetailsModal.show();
  } else {
    console.log("No payment method selected.");
  }
});

function checkCridetCard() {
  let creditCardNumber = document.getElementById("creditCardNumber").value;
  let creditCardError = document.getElementById("creditCardError");
  if (/^\d{16}$/.test(creditCardNumber)) {
    console.log("Credit Card Number:", creditCardNumber);
    creditCardError.classList.add("d-none");
  } else {
    creditCardError.classList.remove("d-none");
  }
}

function checkDepitCard() {
  let debitCardNumber = document.getElementById("debitCardNumber").value;
  let debitCardError = document.getElementById("debitCardError");
  if (/^\d{16}$/.test(debitCardNumber)) {
    console.log("Credit Card Number:", debitCardNumber);
    debitCardError.classList.add("d-none");
  } else {
    debitCardError.classList.remove("d-none");
  }
}
