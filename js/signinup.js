document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('signUpButton');
    const signInButton = document.getElementById('signInButton');
    const signInForm = document.getElementById('signIn');
    const signUpForm = document.getElementById('signup');

    // Toggle between forms
    signUpButton.addEventListener('click', function() {
        signInForm.style.display = "none";
        signUpForm.style.display = "block";
    });

    signInButton.addEventListener('click', function() {
        signInForm.style.display = "block";
        signUpForm.style.display = "none";
    });

    // Add loading state to buttons
    document.getElementById('submitSignUp').addEventListener('click', function(e) {
        e.preventDefault();
        this.innerHTML = '<span class="btn-loader"></span> Processing...';
        this.disabled = true;
        // Simulate API call
        setTimeout(() => {
            this.innerHTML = 'Register';
            this.disabled = false;
        }, 2000);
    });

    document.getElementById('submitSignIn').addEventListener('click', function(e) {
        e.preventDefault();
        this.innerHTML = '<span class="btn-loader"></span> Signing in...';
        this.disabled = true;
        // Simulate API call
        setTimeout(() => {
            this.innerHTML = 'Login';
            this.disabled = false;
        }, 2000);
    });

    // Add focus effects to inputs
    document.querySelectorAll('.input-group input').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.borderColor = '#6C63FF';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.borderColor = '#e0e0e0';
        });
    });
});