const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
const body = document.body;

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
    body.classList.add('register-gradient'); // Add register gradient class
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
    body.classList.remove('register-gradient'); // Remove register gradient class
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    // Hard-coded username and password
    const correctUsername = 'MMS';
    const correctPassword = '0000';

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === correctUsername && password === correctPassword) {
            localStorage.setItem('loggedIn', 'true');
            window.location.href = '../loading1.html'; // Redirect to the loading page
        } else {
            errorMessage.textContent = 'Invalid username or password.';
        }
    });
});
