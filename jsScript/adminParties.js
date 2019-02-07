const address = 'https://politico-jes.herokuapp.com/api/v1/parties';
const partyContainer = document.getElementById('history');

const createPartyTemplate = (partyArray) => {
  let template = '';
  partyArray.forEach((party) => {
    template += `<div id="one-party">
    <div id="one-party-pic">
            <img src="${party.logoUrl}">
    </div>
    <div id="one-party-text">
        <h3>${party.name}</h3>
        <button class="good-button edit-party" data-id="${party.id}">Edit Party</button>
        <button class="good-button delete-party" data-id="${party.id}" data-name="${party.name}">Delete Party</button>
    </div>
</div>`;
  });
  return template;
};

function deleteParty() {
  const partyId = this.dataset.id;
  const partyName = this.dataset.name;
  const parent = this.parentElement;
  const partyDiv = parent.parentElement;
  const token = window.localStorage.getItem('token');
  let success = false;
  const resultDiv = document.getElementById('parties-result');
  resultDiv.innerHTML = 'Just a moment, we are processing your request...';
  resultDiv.classList.add('success-div');
  resultDiv.classList.remove('error-div');
  resultDiv.style.display = 'block';
  fetch(`${address}/${partyId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      success = true;
    }
    return res.json();
  }).then((data) => {
    if (success) {
      partyDiv.style.display = 'none';
      resultDiv.innerHTML = `Successfull ...${partyName} has been deleted`;
      resultDiv.classList.add('success-div');
      resultDiv.classList.remove('error-div');
    } else {
      resultDiv.innerHTML = data.error;
      resultDiv.classList.add('error-div');
      resultDiv.classList.remove('success-div');
    }
  });
}

function editParty() {
  const partyId = this.dataset.id;
  window.localStorage.setItem('partyId', partyId);
  window.location = 'https://jesse-efe.github.io/Politico/UI/edit-party.html';
}

const getParties = () => {
  fetch(address)
    .then(res => res.json())
    .then((response) => {
      const template = createPartyTemplate(response.data);
      partyContainer.innerHTML = template;
      const deletePartyButtons = document.querySelectorAll('.delete-party');
      const editPartyButtons = document.querySelectorAll('.edit-party');
      for (let i = 0; i < deletePartyButtons.length; i++) {
        deletePartyButtons[i].onclick = deleteParty;
      }
      for (let i = 0; i < editPartyButtons.length; i++) {
        editPartyButtons[i].onclick = editParty;
      }
    });
};

getParties();
