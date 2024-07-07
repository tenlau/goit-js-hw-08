import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const STORAGE_KEY = 'feedback-form-state';

// Load saved data from local storage
const loadFormData = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    emailInput.value = email || '';
    messageInput.value = message || '';
  }
};

// Save form data to local storage
const saveFormData = throttle(() => {
  const email = emailInput.value;
  const message = messageInput.value;
  const formData = { email, message };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500);

// Handle form submission
const handleSubmit = (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const message = messageInput.value;
  console.log({ email, message });
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
};

// Load form data on page load
document.addEventListener('DOMContentLoaded', loadFormData);

// Add event listeners
form.addEventListener('input', saveFormData);
form.addEventListener('submit', handleSubmit);

