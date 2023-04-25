import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');
const { email, message } = formEl;

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

reloadPage();

function onFormInput() {
  const savedMessage = { email: email.value, message: message.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedMessage));
}

function onFormSubmit(e) {
  e.preventDefault();
  const savedMessage = { email: email.value, message: message.value };
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
}

function reloadPage() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    email.value = savedMessage.email;
    message.value = savedMessage.message;
  }
}
