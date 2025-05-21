import '../css/style.css';

const button = document.getElementById('continue-button');
const checkbox = document.getElementById('confirm-checkbox');

// Needs JSON.parse to convert the string back to an object, otherwise we get e.g. "\"test\""
const subjID = JSON.parse(localStorage.getItem('subjID')) || 'test';

// function for response logging, creating csv file on server
function uploadData(toSave) {
  // create a CSV string from the object with hard-coded header
  const header = 'subjID,consent,timestamp';
  const row = toSave.subjID + ',' + toSave.consent + ',' + toSave.timestamp;
  const csvContent = header + '\n' + row + '\n';

  // save current date & time (note: UTC time!)
  const day = new Date().toISOString().substring(0, 10);
  const time = new Date().toISOString().substring(11, 19);

  // prepare form data to send the CSV data as a file
  const formData = new FormData();
  formData.append(
    'csvFile',
    new Blob([csvContent], { type: 'text/csv' }),
    `tangoCC-consent-${toSave.subjID}-${day}-${time}.csv`,
  );

  // send the data to the server
  fetch('./data/data.php', {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.text())
    .then((result) => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const handleChecked = () => {
  // If the checkbox is not checked, disable the button
  button.disabled = !checkbox.checked;

  if (checkbox.checked) {
    const date = new Date();

    const toSave = {
      // get ID out of URL parameter
      subjID: subjID,
      consent: true,
      timestamp: date.toISOString(),
    };
    uploadData(toSave);
  }
};

checkbox.addEventListener('change', handleChecked, { capture: false });

// Continue can only be clicked once the checkbox is checked
const handleContinueClick = (event) => {
  event.preventDefault();
  window.location.href = './webcam.html';
};

button.addEventListener('click', handleContinueClick, { capture: false });
