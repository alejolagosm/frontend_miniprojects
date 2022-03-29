const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const smallEl = formControl.querySelector('small');
  smallEl.innerText = message;
}

function showSuccess(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

const getFieldName = input => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const checkRequired = inputArray => {
  inputArray.forEach(input => {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

function checkEmail(input) {
  const check = String(input.value.trim())
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  if (check) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

const checkLength = (input, min, max) => {
  if (input.value.length < min || input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be between ${min} and ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};

const checkMatchPasswords = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
};
// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkEmail(email);
  checkLength(password, 8, 12);
  checkMatchPasswords(password, password2);
});
