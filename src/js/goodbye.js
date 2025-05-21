import '../css/style.css';

const deleteButton = document.getElementById('delete-button');
const deleteCheckbox = document.getElementById('delete-checkbox');
const pDelete = document.getElementById('p-delete');
const aDownload = document.getElementById('a-download');

// get ID out of URL
const subjID = new URL(document.location.href).searchParams.get('subjID');

// If the deleteCheckbox is not checked, disable the deleteButton
const handleChecked = () => {
  deleteButton.disabled = !deleteCheckbox.checked;
};

deleteCheckbox.addEventListener('change', handleChecked, { capture: false });

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
    `tangoCC-NOconsent-${toSave.subjID}-${day}-${time}.csv`,
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

const handleDeleteClick = (event) => {
  event.preventDefault();

  pDelete.innerHTML = '<strong>Wir werden Ihre Daten löschen. Danke!</strong>';

  const date = new Date();

  const toSave = {
    // get ID out of URL parameter
    subjID: subjID,
    consent: false,
    timestamp: date.toISOString(),
  };
  uploadData(toSave);
};

deleteButton.addEventListener('click', handleDeleteClick, {
  capture: false,
  once: true,
});

// define what happens on deleteButton click
const handleDownloadClick = () => {
  window.open('./thanks.pdf');
};

aDownload.addEventListener('click', handleDownloadClick, { capture: false });
