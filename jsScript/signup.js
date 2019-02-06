const address = 'https://politico-jes.herokuapp.com/api/v1/auth/signup';
const signUpForm = document.getElementById('sign-in-form');

const signUpFormHandler = (e) => {
  e.preventDefault();
  let error = '';
  const resultDiv = document.querySelector('.result-div');
  const loading = document.querySelector('.loading>img');
  resultDiv.style.display = 'none';
  const firstname = document.getElementById('sign-in-first-name').value.trim();
  const lastname = document.getElementById('sign-in-last-name').value.trim();
  const othername = document.getElementById('sign-in-other-name').value.trim();
  const email = document.getElementById('sign-in-email').value.trim();
  const passportUrl = document.getElementById('passport').value.trim();
  const phoneNumber = document.getElementById('sign-in-phone').value.trim();
  const password = document.getElementById('sign-in-pass').value.trim();

  if (firstname === '') {
    error += 'Your first name is required <br />';
  }
  if (lastname === '') {
    error += 'Your last name is required <br />';
  }
  if (othername === '') {
    error += 'Your other name is required <br />';
  }
  if (email === '') {
    error += 'Your email address is required <br />';
  }
  if (phoneNumber === '') {
    error += 'Your phone number is required <br />';
  }
  if (passportUrl === '') {
    error += 'Your passport URL is required <br />';
  }
  if (password === '') {
    error += 'Please choose a password<br />';
  } else if (password.length < 5) {
    error += 'Password should be at least 5 characters <br />';
  }

  if (error === '') {
    const user = {
      firstname,
      lastname,
      othername,
      email,
      phoneNumber,
      passportUrl,
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
        resultDiv.innerHTML = 'Signup was sucessfull';
        resultDiv.classList.remove('error-div');
        resultDiv.classList.add('success-div');
        resultDiv.style.display = 'block';
        loading.style.display = 'none';
        window.localStorage.setItem('token', data.data[0].token);
        window.localStorage.setItem('id', data.data[0].user.id);
        window.location = 'https://jesse-efe.github.io/Politico/UI/user-profile.html';
      } else {
        console.log(data);
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


signUpForm.onsubmit = signUpFormHandler;
