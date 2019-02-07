const address = 'https://politico-jes.herokuapp.com/api/v1/parties';
const partyForm = document.getElementById('sign-in-form');

const createPartyFormHandler = (e) => {
  e.preventDefault();
  let error = '';
  const resultDiv = document.querySelector('.result-div');
  const loading = document.querySelector('.loading>img');
  resultDiv.style.display = 'none';
  const name = document.getElementById('party-name').value.trim();
  const hqAddress = document.getElementById('party-address').value.trim();
  const logoUrl = document.getElementById('party-logo').value.trim();


  if (name === '') {
    error += 'Party name is required <br />';
  }
  if (hqAddress === '') {
    error += 'Party address is required <br />';
  }
  if (logoUrl === '') {
    error += 'Party logo URL is required <br />';
  }

  if (error === '') {
    const party = {
      name,
      logoUrl,
      hqAddress,
    };
    loading.style.display = 'block';
    let success = false;
    const token = window.localStorage.getItem('token');
    fetch(address, {
      method: 'POST',
      body: JSON.stringify(party),
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
        resultDiv.innerHTML = 'Party was created successfully';
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


partyForm.onsubmit = createPartyFormHandler;
