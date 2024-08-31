const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navBar = document.getElementById('nav');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    navBar.classList.toggle('active');
});
