const address = 'https://politico-jes.herokuapp.com/api/v1/offices';
const voteAddress = 'https://politico-jes.herokuapp.com/api/v1/votes';
let pageContext = '';
const officeContainer = document.getElementById('offices');

const createOfficeTemplate = (officeArray) => {
  let template = '';
  const buttonValue = pageContext === 'result' ? 'Show result' : 'See all candidates';
  const buttons = (id) => {
    if (pageContext === 'offices' && window.localStorage.getItem('isPolitician')) {
      return `
      <button class="run-for-office" data-id="${id}">Run for office</button>
      <button class="show-candidates" data-id="${id}" data-not-fetched-candidates>${buttonValue}</button>`;
    }
    return `<button class="show-candidates" data-id="${id}" data-not-fetched-candidates>${buttonValue}</button>`;
  };
  officeArray.forEach((office) => {
    template += `<div class="one-office">
    <div class="text">
        <p>${office.name}</p>
        ${buttons(office.id)}
    </div>
    <div class="candidates">
        <span class="loading"><img src="loading.gif"></span>
    </div>
</div>`;
  });
  return template;
};
const candidatesTemplate = (candidatesArray, buttonValue) => {
  let template = '<div class="result-div"></div> <form id="voteForm">';
  candidatesArray.forEach((candidate) => {
    template += `<input type="radio" name="candidate" data-id="${candidate.id}">${candidate.firstname} ${candidate.lastname} ${candidate.othername}  [${candidate.abbreviation}]<br>`;
  });
  template += `<input type="submit" value="${buttonValue}" class="vote-button"> </form>`;
  return template;
};
const resultTemplate = (resultArray) => {
  let template = '<div class="result-div"></div> <form id="voteForm">';
  for (let i = 0; i < resultArray.length; i++) {
    if (i === 0) {
      template += `<div class="winner"><p>${resultArray[i].name}  [${resultArray[i].abbreviation}]</p> <span>112 Votes</span></div>`;
    } else {
      template += `<p>${resultArray[i].name}  [${resultArray[i].abbreviation}]</p> <span>112 Votes</span>`;
    }
  }
  template += '<input type="submit" value="Create Petition" class="vote-button"> </form>';
  return template;
};

function candidatesAndResultHandler() {
  const clickedButton = this;
  const officeId = clickedButton.dataset.id;
  const parent = clickedButton.parentElement;
  const vote = (e) => {
    e.preventDefault();
    const resultDiv = parent.nextElementSibling.firstChild;
    const token = window.localStorage.getItem('token');
    const candidates = document.getElementsByName('candidate');
    let error = '';
    let candidate;

    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i].checked) {
        candidate = candidates[i].dataset.id;
        break;
      }
    }
    if (!candidate) {
      error = 'Please select a candidate to vote for';
    }

    if (error === '') {
      let success = false;
      fetch(voteAddress, {
        method: 'POST',
        body: JSON.stringify({ office: officeId, candidate }),
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
          resultDiv.innerHTML = 'You have voted successfully';
          resultDiv.classList.remove('error-div');
          resultDiv.classList.add('success-div');
          resultDiv.style.display = 'block';
        } else {
          resultDiv.innerHTML = data.error;
          resultDiv.classList.remove('success-div');
          resultDiv.classList.add('error-div');
          resultDiv.style.display = 'block';
        }
      });
    } else {
      resultDiv.innerHTML = error;
      resultDiv.classList.remove('success-div');
      resultDiv.classList.add('error-div');
      resultDiv.style.display = 'block';
    }
  };
  const registerCandidate = (e) => {
    e.preventDefault();
    const resultDiv = parent.nextElementSibling.firstChild;
    const token = window.localStorage.getItem('token');
    const candidates = document.getElementsByName('candidate');
    let error = '';
    let id;

    for (let i = 0; i < candidates.length; i++) {
      if (candidates[i].checked) {
        id = candidates[i].dataset.id;
        break;
      }
    }
    if (!id) {
      error = 'Please select a candidate to register';
    }

    if (error === '') {
      let success = false;
      fetch(`${address}/${id}/register`, {
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
          resultDiv.innerHTML = 'Candidate registered successfully';
          resultDiv.classList.remove('error-div');
          resultDiv.classList.add('success-div');
          resultDiv.style.display = 'block';
        } else {
          resultDiv.innerHTML = data.error;
          resultDiv.classList.remove('success-div');
          resultDiv.classList.add('error-div');
          resultDiv.style.display = 'block';
        }
      });
    } else {
      resultDiv.innerHTML = error;
      resultDiv.classList.remove('success-div');
      resultDiv.classList.add('error-div');
      resultDiv.style.display = 'block';
    }
  };
  const getCandidates = () => {
    // don't fetch candidates again if they have already been fteched before
    if ('gottenCandidates' in clickedButton.dataset) {
      return;
    }
    fetch(`${address}/${officeId}/candidates`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then((response) => {
        // add gottenCandidates attribute to button to indicate that candidates
        // has been fetched already
        clickedButton.dataset.gottenCandidates = '';
        if (response.data.length === 0) {
          parent.nextElementSibling.innerHTML = 'There are no candidates yet for this office';
          parent.nextElementSibling.style.display = 'block';
        } else {
          parent.nextElementSibling.innerHTML = candidatesTemplate(response.data, 'VOTE');
          document.getElementById('voteForm').onsubmit = vote;
        }
      });
  };
  const getInterestedCandidates = () => {
    // don't fetch candidates again if they have already been fteched before
    if ('gottenCandidates' in clickedButton.dataset) {
      return;
    }
    fetch(`${address}/${officeId}/interested`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then((response) => {
        // add gottenCandidates attribute to button to indicate that candidates
        // has been fetched already
        clickedButton.dataset.gottenCandidates = '';
        if (response.data.length === 0) {
          parent.nextElementSibling.innerHTML = 'No new candidate wants to run for this office';
          parent.nextElementSibling.style.display = 'block';
        } else {
          parent.nextElementSibling.innerHTML = candidatesTemplate(response.data, 'Register Candidate');
          document.getElementById('voteForm').onsubmit = registerCandidate;
        }
      });
  };
  const getResults = () => {
    // don't fetch candidates again if they have already been fteched before
    if ('gottenCandidates' in clickedButton.dataset) {
      return;
    }
    fetch(`${address}/${officeId}/result`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())
      .then((response) => {
        // add gottenCandidates attribute to button to indicate that candidates
        // has been fetched already
        clickedButton.dataset.gottenCandidates = '';
        if (response.data.length === 0) {
          parent.nextElementSibling.innerHTML = 'No result for this office yet';
          parent.nextElementSibling.style.display = 'block';
        } else {
          parent.nextElementSibling.innerHTML = resultTemplate(response.data);
          // document.getElementById('voteForm').onsubmit = petition;
        }
      });
  };
  const candidatesAndResultToggler = () => {
    if (parent.nextElementSibling.style.display === 'none') {
      parent.nextElementSibling.style.display = 'block';
      if (pageContext === 'admin-offices') {
        getInterestedCandidates();
      } else if (pageContext === 'offices') {
        getCandidates();
      } else {
        getResults();
      }
    } else {
      parent.nextElementSibling.style.display = 'none';
    }
  };

  if (clickedButton.innerHTML === 'Hide candidates' || clickedButton.innerHTML === 'See all candidates') {
    clickedButton.innerHTML = clickedButton.innerHTML === 'Hide candidates' ? 'See all candidates' : 'Hide candidates';
    candidatesAndResultToggler();
  } else {
    clickedButton.innerHTML = clickedButton.innerHTML === 'Show result' ? 'Hide result' : 'Show result';
    candidatesAndResultToggler();
  }
}

function runForOffice() {
  const userId = window.localStorage.getItem('id');
  const officeId = this.dataset.id;
  const token = window.localStorage.getItem('token');
  let success = false;
  const resultDiv = document.getElementById('offices-result');
  resultDiv.innerHTML = 'Just a moment, we are processing your request...';
  resultDiv.classList.add('success-div');
  resultDiv.classList.remove('error-div');
  resultDiv.style.display = 'block';
  fetch(`${address}/${userId}/${officeId}`, {
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
      resultDiv.innerHTML = 'You have successfully expressed interest to run for this office';
      resultDiv.classList.add('success-div');
      resultDiv.classList.remove('error-div');
    } else {
      resultDiv.innerHTML = data.error;
      resultDiv.classList.add('error-div');
      resultDiv.classList.remove('success-div');
    }
  });
}

const getOffices = () => {
  fetch(address)
    .then(res => res.json())
    .then((response) => {
      const template = createOfficeTemplate(response.data);
      officeContainer.innerHTML += template;
      const showCandidatesButtons = document.querySelectorAll('.show-candidates');
      const runForOfficeButtons = document.querySelectorAll('.run-for-office');
      const candidates = document.getElementsByClassName('candidates');
      for (let i = 0; i < candidates.length; i++) {
        candidates[i].style.display = 'none';
      }
      for (let i = 0; i < showCandidatesButtons.length; i++) {
        showCandidatesButtons[i].onclick = candidatesAndResultHandler;
      }
      for (let i = 0; i < runForOfficeButtons.length; i++) {
        runForOfficeButtons[i].onclick = runForOffice;
      }
    });
};

if (location.href.includes('admin-offices')) {
  pageContext = 'admin-offices';
  getOffices();
} else if (location.href.includes('offices')) {
  pageContext = 'offices';
  getOffices();
} else {
  pageContext = 'result';
  getOffices();
}
