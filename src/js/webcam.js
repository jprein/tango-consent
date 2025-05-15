import '../css/style.css';

const button = document.getElementById('continue-button');

// Needs JSON.parse to convert the string back to an object, otherwise we get e.g. "\"test\""
const subjID = JSON.parse(localStorage.getItem('subjID')) || 'test';

// Use the German/Leipzig default settings
const lang = 'ger';
const touch = '1';
const fam = '2';
const test = '16';
const bg = '01';
const agents = 'f05-f07-f08-f10-m03-m06-m09-m11';
const webcam = 'true';
const saving = 'upload';

const handleContinueClick = (event) => {
  event.preventDefault();
  window.location.href = `https://devpsy.web.leuphana.de/tango-pwa/tango.html?subjID=${subjID}&lang=${lang}&touch=${touch}&fam=${fam}&test=${test}&bg=${bg}&agents=${agents}&webcam=${webcam}&saving=${saving}`;
};

button.addEventListener('click', handleContinueClick, { capture: false });
