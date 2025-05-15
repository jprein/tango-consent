import '../css/style.css';

const button = document.getElementById('continue-button');
const checkbox = document.getElementById('confirm-checkbox');

// Needs JSON.parse to convert the string back to an object, otherwise we get e.g. "\"test\""
const subjID = JSON.parse(localStorage.getItem('subjID')) || 'test';

// function for response logging, creating json file on server
function uploadData(safe, ID) {
  fetch('data/data.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: JSON.stringify(safe), fname: ID }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const handleChecked = () => {
  // If the checkbox is not checked, disable the button
  button.disabled = !checkbox.checked;

  console.log(checkbox.checked);

  if (checkbox.checked) {
    const date = new Date();

    const toSave = {
      // get ID out of URL parameter
      subjID: subjID,
      consent: true,
      timestamp: date.toISOString(),
      epoch: date.getTime(),
    };
    const toSaveID = `${subjID}`;
    uploadData(toSave, toSaveID);
  }
};

checkbox.addEventListener('change', handleChecked, { capture: false });

// Continue can only be clicked once the checkbox is checked
const handleContinueClick = (event) => {
  event.preventDefault();
  window.location.href = './webcam.html';
};

button.addEventListener('click', handleContinueClick, { capture: false });
