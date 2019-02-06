const closeMenu = document.querySelector('.fa-times');
closeMenu.style.display = 'none';
const showMenu = document.querySelector('.fa-bars');
showMenu.onclick = function () {
  this.style.display = 'none';
  const menu = document.querySelector('#side-bar');
  closeMenu.style.display = 'block';
  menu.style.display = 'block';
};
closeMenu.onclick = function () {
  this.style.display = 'none';
  showMenu.style.display = 'block';
  const menu = document.querySelector('#side-bar');
  closeMenu.style.display = 'none';
  menu.style.display = 'none';
};
