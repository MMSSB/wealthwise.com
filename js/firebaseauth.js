// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
    getAuth,
    sendPasswordResetEmail, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyBLCMK2Tm9sk2EBnhqoK9j_y8jiATd-QDA",
    authDomain: "wealth-wise-3c329.firebaseapp.com",
    projectId: "wealth-wise-3c329",
    storageBucket: "wealth-wise-3c329.firebasestorage.app",
    messagingSenderId: "546585897291",
    appId: "1:546585897291:web:111d6c2d3170d93f59e0ce",
    measurementId: "G-PGTS22BHQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize auth here so it's available globally
const db = getFirestore(app);

function showMessage(message, divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function(){
        messageDiv.style.opacity = 0;
    }, 5000);
}

const signUp = document.getElementById('submitSignUp');
if (signUp) {
    signUp.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('rEmail').value;
        const password = document.getElementById('rPassword').value;
        const firstName = document.getElementById('fName').value;
        const lastName = document.getElementById('lName').value;

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
            .then(() => {
                window.location.href = 'login.html';
            })
            .catch((error) => {
                console.error("error writing document", error);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            if(errorCode == 'auth/email-already-in-use'){
                showMessage('Email Address Already Exists!', 'signUpMessage');
            }
            else{
                showMessage('Unable to create User: ' + error.message, 'signUpMessage');
            }
        });
    });
}

const signIn = document.getElementById('submitSignIn');
if (signIn) {
    signIn.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showMessage('Login successful', 'signInMessage');
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'loading1.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            if(errorCode === 'auth/invalid-credential'){
                showMessage('Incorrect Email or Password', 'signInMessage');
            }
            else{
                showMessage('Login failed: ' + error.message, 'signInMessage');
            }
        });
    });
}

// Forgot password handler
const forgotpass = document.getElementById('forgotpass');
if (forgotpass) {
    forgotpass.addEventListener("click", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        
        if (!email) {
            showMessage('Please enter your email address', 'signInMessage');
            return;
        }

        sendPasswordResetEmail(auth, email)
        .then(() => {
            showMessage('Password reset email sent! Please check your inbox.', 'signInMessage');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/user-not-found') {
                showMessage('No account found with this email address', 'signInMessage');
            } else {
                showMessage('Error sending reset email: ' + errorMessage, 'signInMessage');
            }
        });
    });
}