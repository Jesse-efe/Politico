const menuIcon =  document.querySelector('#form-area > i').onclick = function(){
    let menu = document.querySelector('#side-bar');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}