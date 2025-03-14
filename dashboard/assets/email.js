
    // Dropdown toggle functionality
    document.querySelector('.dropdown-toggle').addEventListener('click', function (e) {
        e.preventDefault();
        const dropdownMenu = document.querySelector('.dropdown-menu');
        dropdownMenu.classList.toggle('show');
    });
