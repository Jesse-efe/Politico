const address = 'https://politico-jes.herokuapp.com/api/v1/offices';
const officeForm = document.getElementById('sign-in-form');

const createOfficeFormHandler = (e) => {
  e.preventDefault();
  let error = '';
  const resultDiv = document.querySelector('.result-div');
  const loading = document.querySelector('.loading>img');
  resultDiv.style.display = 'none';
  const name = document.getElementById('office-name').value.trim();
  const officeType = document.getElementById("office-type").value;


  if (name === '') {
    error += 'Office name is required <br />';
  }
  if (officeType === '') {
    error += 'Please select the office type<br />';
  }

  if (error === '') {
    const office = {
      name,
      officeType,
    };
    loading.style.display = 'block';
    let success = false;
    const token = window.localStorage.getItem('token');
    fetch(address, {
      method: 'POST',
      body: JSON.stringify(office),
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
        window.location = 'https://jesse-efe.github.io/Politico/UI/admin-offices.html';
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


officeForm.onsubmit = createOfficeFormHandler;
