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

const handleDeleteClick = (event) => {
  event.preventDefault();

  pDelete.innerHTML = '<strong>Wir werden Ihre Daten löschen. Danke!</strong>';

  const date = new Date();

  const toSave = {
    // get ID out of URL parameter
    subjID: subjID,
    deleteData: true,
    timestamp: date.toISOString(),
    epoch: date.getTime(),
  };
  const toSaveID = `DELETE${subjID}`;
  uploadData(toSave, toSaveID);
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
