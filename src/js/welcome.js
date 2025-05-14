import '../css/style.css';

const button = document.getElementById('continue-button');

const handleContinueClick = (event) => {
  event.preventDefault();
  window.location.href = './instructions.html';
};

button.addEventListener('click', handleContinueClick, { capture: false });
