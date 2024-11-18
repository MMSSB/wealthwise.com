// Function to set the active link
function setActive() {
    // Get the current URL path
    var path = window.location.pathname.split("/").pop();
    
    // Get all nav links
    var links = document.querySelectorAll('.nav-link');
    
    links.forEach(function(link) {
        // Check if the link's href matches the current path
        if (link.getAttribute('href').split("/").pop() === path) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call the function to set the active link on page load
document.addEventListener('DOMContentLoaded', setActive);
