const address = 'https://politico-jes.herokuapp.com/api/v1/parties';
const partyId = window.localStorage.getItem('partyId');
const formContainer = document.querySelector('.form');

const editPartyTemplate = (party) => {
  const template = `<form id="sign-in-form">
    <label for="party-name">Party Name</label>
    <input type="text" id="party-name" class="input" value="${party.name}"><br>
    <span class="loading"><img src="loading.gif"></span>
    <input type="submit" class="submit-button input" value="Edit Party">
</form>`;
  return template;
};

const editParty = (e) => {
  e.preventDefault();
  const error = '';

  const resultDiv = document.querySelector('.result-div');
  const loading = document.querySelector('.loading>img');
  const name = document.getElementById('party-name').value.trim();
  if (name === '') {
    error = 'Party name is required';
  }

  if (error === '') {
    loading.style.display = 'block';
    let success = false;
    const token = window.localStorage.getItem('token');
    fetch(`${address}/${partyId}/name`, {
      method: 'PATCH',
      body: JSON.stringify({ name }),
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
        resultDiv.innerHTML = 'Party was editted successfully';
        resultDiv.classList.remove('error-div');
        resultDiv.classList.add('success-div');
        resultDiv.style.display = 'block';
        loading.style.display = 'none';
        window.location = 'https://jesse-efe.github.io/Politico/UI/admin-parties.html';
      } else {
        resultDiv.innerHTML = data.error;
        resultDiv.classList.remove('success-div');
        resultDiv.classList.add('error-div');
        resultDiv.style.display = 'block';
        loading.style.display = 'none';
      }
    });
  } else {
    resultDiv.innerHTML = error;
    resultDiv.classList.remove('success-div');
    resultDiv.classList.add('error-div');
    resultDiv.style.display = 'block';
  }
};

const getPartyName = () => {
  fetch(`${address}/${partyId}`)
    .then(res => res.json())
    .then((response) => {
      const template = editPartyTemplate(response.data[0]);
      formContainer.innerHTML += template;
      const editPartyForm = document.getElementById('sign-in-form');
      editPartyForm.onsubmit = editParty;
    });
};

getPartyName();
