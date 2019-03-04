const address = 'https://politico-jes.herokuapp.com/api/v1/auth/login';
const signInForm = document.getElementById('sign-in-form');

const signInFormHandler = (e) => {
  e.preventDefault();
  let error = '';
  const resultDiv = document.querySelector('.result-div');
  const loading = document.querySelector('.loading>img');
  resultDiv.style.display = 'none';
  const email = document.getElementById('sign-in-email').value.trim();
  const password = document.getElementById('sign-in-pass').value.trim();

  if (email === '') {
    error += 'Your email address is required <br />';
  }

  if (password === '') {
    error += 'Please enter your password <br />';
  } else if (password.length < 5) {
    error += 'Invalid password <br />';
  }

  if (error === '') {
    const user = {
      email,
      password,
    };
    loading.style.display = 'block';
    let success = false;
    fetch(address, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (res.ok) {
        success = true;
      }
      return res.json();
    }).then((data) => {
      if (success) {
        resultDiv.innerHTML = 'login was sucessfull';
        resultDiv.classList.remove('error-div');
        resultDiv.classList.add('success-div');
        resultDiv.style.display = 'block';
        loading.style.display = 'none';
        window.localStorage.setItem('token', data.data[0].token);
        window.localStorage.setItem('id', data.data[0].user.id);
        if (data.data[0].user.isPolitician) {
          window.localStorage.setItem('isPolitician', 'true');
        }
        if (data.data[0].user.isAdmin) {
          window.location = 'https://jesse-efe.github.io/Politico/UI/admin-parties.html';
        } else {
          window.location = 'https://jesse-efe.github.io/Politico/UI/user-profile.html';
        }
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


signInForm.onsubmit = signInFormHandler;
