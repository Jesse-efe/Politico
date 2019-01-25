function showCandidates(){
    let clickedButton = this;
    let parent = clickedButton.parentElement;
    if(clickedButton.innerHTML === 'Hide candidates' || clickedButton.innerHTML === 'See all candidates'){
        clickedButton.innerHTML = clickedButton.innerHTML === 'Hide candidates' ? 'See all candidates' : 'Hide candidates';
    } else {
        clickedButton.innerHTML = clickedButton.innerHTML === 'Show result' ? 'Hide result' : 'Show result';
    }
    parent.nextElementSibling.style.display = parent.nextElementSibling.style.display === 'none' ? 'block' : 'none';
}

const candidates = document.getElementsByClassName('candidates');
const showCandidatesButton = document.getElementsByClassName('show-candidates');

for (let i = 0; i < candidates.length; i++) {
    candidates[i].style.display = "none";
}
for (let i = 0; i < showCandidatesButton.length; i++) {
    showCandidatesButton[i].addEventListener('click', showCandidates);
}

const closeMenu =  document.querySelector('#offices > .fa-times');
closeMenu.style.display = 'none';
const showMenu =  document.querySelector('#offices > .fa-bars');
showMenu.onclick = function(){
    this.style.display = 'none';
    let menu = document.querySelector('#side-bar');
    closeMenu.style.display = 'block';
    menu.style.display = 'block'; 
};
closeMenu.onclick = function(){
    this.style.display = 'none';
    showMenu.style.display = 'block';
    let menu = document.querySelector('#side-bar');
    const closeMenu =  document.querySelector('#offices > .fa-times');
    closeMenu.style.display = 'none';
     menu.style.display = 'none'; 
};   
