import '../css/style.css';

// Get the subject ID from the URL or use a default value
const subjID =
  new URL(document.location.href).searchParams.get('subjID') || 'testID';

// Store the subject ID in local storage
localStorage.setItem('subjID', JSON.stringify(subjID));

// Hide the URL parameter after saving it in local storage
window.history.replaceState(null, document.title, window.location.pathname);

// On button click, move to the next page
const button = document.getElementById('continue-button');

const handleContinueClick = (event) => {
  event.preventDefault();
  window.location.href = './welcome.html';
};

button.addEventListener('click', handleContinueClick, { capture: false });
