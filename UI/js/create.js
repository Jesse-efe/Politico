// const menuIcon =  document.querySelector('#form-area > i').onclick = function(){
//     let menu = document.querySelector('#side-bar');
//     menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
// }

const closeMenu =  document.querySelector('#form-area > .fa-times');
closeMenu.style.display = 'none';
const showMenu =  document.querySelector('#form-area > .fa-bars');
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
    const closeMenu =  document.querySelector('#form-area > .fa-times');
    closeMenu.style.display = 'none';
     menu.style.display = 'none'; 
}; 