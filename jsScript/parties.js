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
        <button class="good-button" data-id="${party.id}" data-name="${party.name}">Join Party</button>
    </div>
</div>`;
  });
  return template;
};

function joinParty() {
  const partyId = this.dataset.id;
  const partyName = this.dataset.name;
  const token = window.localStorage.getItem('token');
  let success = false;
  const resultDiv = document.getElementById('parties-result');
  resultDiv.innerHTML = 'Just a moment, we are processing your request...';
  resultDiv.classList.add('success-div');
  resultDiv.classList.remove('error-div');
  resultDiv.style.display = 'block';
  fetch(`${address}/${partyId}/join`, {
    method: 'POST',
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
      resultDiv.innerHTML = `Successfull ...You are now a member of ${partyName}`;
      resultDiv.classList.add('success-div');
      resultDiv.classList.remove('error-div');
    } else {
      resultDiv.innerHTML = data.error;
      resultDiv.classList.add('error-div');
      resultDiv.classList.remove('success-div');
    }
  });
}

const getParties = () => {
  fetch(address)
    .then(res => res.json())
    .then((response) => {
      const template = createPartyTemplate(response.data);
      partyContainer.innerHTML = template;
      const joinPartyButtons = document.querySelectorAll('.good-button');
      for (let i = 0; i < joinPartyButtons.length; i++) {
        joinPartyButtons[i].onclick = joinParty;
      }
    });
};

getParties();
