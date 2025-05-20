import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { PROFILE_ICONS } from './profile-utils.js';

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
const auth = getAuth();
const db = getFirestore();

// Function to load user profile data
export function loadUserProfile() {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    
                    // Update user name
                    const userNameElements = document.querySelectorAll('#loggedUserFName, #usernameFname');
                    userNameElements.forEach(element => {
                        if (element) element.innerText = userData.firstName || '';
                    });

                    // Update last name if element exists
                    const lastNameElement = document.getElementById('usernamelname');
                    if (lastNameElement) {
                        lastNameElement.innerText = userData.lastName || '';
                    }

                    // Update profile images
                    if (userData.profileIconId && PROFILE_ICONS[userData.profileIconId]) {
                        const iconUrl = PROFILE_ICONS[userData.profileIconId];
                        const profileImages = document.querySelectorAll('#profilePhoto, #navProfilePhoto, .profile-photo img');
                        profileImages.forEach(img => {
                            if (img) img.src = iconUrl;
                        });
                    } else if (userData.profilePhoto) {
                        const profileImages = document.querySelectorAll('#profilePhoto, #navProfilePhoto, .profile-photo img');
                        profileImages.forEach(img => {
                            if (img) img.src = userData.profilePhoto;
                        });
                    }
                }
            })
            .catch((error) => {
                console.error("Error loading user profile:", error);
            });
    } else {
        window.location.href = '../index.html';
    }
}

// Function to toggle profile menu
export function toggleMenu() {
    const subMenu = document.getElementById('subMenu');
    if (subMenu) {
        subMenu.classList.toggle('open-menu');
    }
}

// Initialize profile functionality
document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();

    // Add click event listener for profile menu toggle
    const profileElement = document.querySelector('.profile');
    if (profileElement) {
        profileElement.addEventListener('click', toggleMenu);
    }

    // Add click event listener for logout
    const logoutButtons = document.querySelectorAll('#logout, #logoutpro');
    logoutButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', () => {
                localStorage.removeItem('loggedInUserId');
                auth.signOut()
                    .then(() => {
                        window.location.href = '../index.html';
                    })
                    .catch((error) => {
                        console.error('Error signing out:', error);
                    });
            });
        }
    });
});
