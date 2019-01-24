function showCandidates(){
    let clickedButton = this;
    let parent = clickedButton.parentElement;
    clickedButton.innerHTML = clickedButton.innerHTML === 'Hide candidates' ? 'See all candidates' : 'Hide candidates';
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
 
const menuIcon =  document.querySelector('#offices > i').onclick = function(){
    let menu = document.querySelector('#side-bar');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}