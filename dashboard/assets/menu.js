let subMenu = document.getElementById("subMenu");

function toggleMenu(){
    subMenu.classList.toggle("open-menu");

}




function hover(element) {
    element.setAttribute('src', '../dashboard/images/maleuser.gif');
}

function unhover(element) {
        element.setAttribute('src', '../dashboard/images/male.png');
}
