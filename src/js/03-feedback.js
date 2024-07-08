import throttle from 'lodash.throttle';
// Ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageTextarea = form.querySelector('textarea[name="message"]');
  const STORAGE_KEY = 'feedback-form-state';

  // Load saved data from local storage if available
  loadFormData();

  // Throttle function to save form data to local storage every 500ms
  const saveFormData = _.throttle(() => {
    const formData = {
      email: emailInput.value,
      message: messageTextarea.value
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, 500);

  // Event listener for input events on form elements
  form.addEventListener('input', saveFormData);

  // Event listener for form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log({
      email: emailInput.value,
      message: messageTextarea.value
    });
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
  });

  // Load form data from local storage and populate form fields
  function loadFormData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const { email, message } = JSON.parse(savedData);
      emailInput.value = email || '';
      messageTextarea.value = message || '';
    }
  }
});
