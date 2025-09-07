import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { setupProfileIcons, PROFILE_ICONS } from './profile-utils.js';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Initialize profile icons after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupProfileIcons();
});

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('loggedUserFName').innerText = userData.firstName || '';
                    document.getElementById('firstName').value = userData.firstName || '';
                    document.getElementById('lastName').value = userData.lastName || '';
                    document.getElementById('email').value = userData.email || '';
                    
                    // Handle profile photo display
                    if (userData.profileIconId && PROFILE_ICONS[userData.profileIconId]) {
                        const iconUrl = PROFILE_ICONS[userData.profileIconId];
                        document.getElementById('profilePhoto').src = iconUrl;
                        document.getElementById('navProfilePhoto').src = iconUrl;
                        
                        // Mark the selected icon
                        setTimeout(() => {
                            const selectedIcon = document.querySelector(`.profile-icon-option:nth-child(${userData.profileIconId})`);
                            if (selectedIcon) {
                                selectedIcon.classList.add('selected');
                            }
                        }, 100);
                    } else if (userData.profilePhoto) {
                        document.getElementById('profilePhoto').src = userData.profilePhoto;
                        document.getElementById('navProfilePhoto').src = userData.profilePhoto;
                    }
                } else {
                    console.log("No document found matching id");
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    } else {
        console.log("User Id not found in local storage");
        window.location.href = '../index.html';
    }
});

// Handle profile update
document.getElementById('updateProfileBtn').addEventListener('click', () => {
    const userId = localStorage.getItem('loggedInUserId');
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    if (!firstName || !lastName) {
        alert('Please enter both first and last names.');
        return;
    }

    const docRef = doc(db, "users", userId);
    updateDoc(docRef, {
        firstName,
        lastName
    })
        .then(() => {
            document.getElementById('loggedUserFName').innerText = firstName;
            alert('Profile updated successfully!');
        })
        .catch((error) => {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        });
});

// Logout functionality
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    auth.signOut()
        .then(() => {
            window.location.href = '../index.html';
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});
