import '../css/style.css';

const button = document.getElementById('continue-button');
const checkbox = document.getElementById('confirm-checkbox');

// If the checkbox is not checked, disable the button
const handleChecked = () => {
  button.disabled = !checkbox.checked;
};

checkbox.addEventListener('change', handleChecked, { capture: false });

// Continue can only be clicked once the checkbox is checked
const handleContinueClick = (event) => {
  event.preventDefault();
  window.location.href = './webcam.html';
};

button.addEventListener('click', handleContinueClick, { capture: false });
