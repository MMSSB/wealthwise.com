// Get DOM elements
const subMenu = document.getElementById("subMenu");
const profileElement = document.querySelector('.profile');

// Function to toggle menu
function toggleMenu() {
    if (subMenu) {
        subMenu.classList.toggle("open-menu");
    }
}

// Add click event listener to profile element
if (profileElement) {
    profileElement.addEventListener('click', toggleMenu);
}

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (subMenu && profileElement) {
        // Check if click is outside profile area
        if (!profileElement.contains(event.target) && !subMenu.contains(event.target)) {
            subMenu.classList.remove("open-menu");
        }
    }
});

// Prevent menu from closing when clicking inside it
if (subMenu) {
    subMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    });
}



function hover(element) {
    element.setAttribute('src', '../dashboard/images/mind2.gif');
}

function unhover(element) {
        element.setAttribute('src', '../dashboard/images/mind.png');
}