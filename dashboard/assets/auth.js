import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

export function initializeAuth() {
    onAuthStateChanged(auth, (user) => {
        const loggedInUserId = localStorage.getItem('loggedInUserId');
        if (loggedInUserId) {
            const docRef = doc(db, "users", loggedInUserId);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        // Update UI elements if they exist
                        if (document.getElementById('loggedUserFName')) {
                            document.getElementById('loggedUserFName').innerText = userData.firstName || '';
                        }
                        if (document.getElementById('usernameFname')) {
                            document.getElementById('usernameFname').innerText = userData.firstName || '';
                        }
                        if (document.getElementById('usernamelname')) {
                            document.getElementById('usernamelname').innerText = userData.lastName || '';
                        }
                        // Update profile images
                        const profileIconId = userData.profileIconId || 'icon1'; // Default to icon1
                        const iconUrl = `images/icons/${profileIconId}.png`;
                        const profileImages = document.querySelectorAll('#profilePhoto, #navProfilePhoto');
                        profileImages.forEach(img => {
                            img.src = iconUrl;
                        });
                    } else {
                        console.log("No document found matching id");
                        window.location.href = '../index.html';
                    }
                })
                .catch((error) => {
                    console.error("Error getting document:", error);
                    window.location.href = '../index.html';
                });
        } else {
            console.log("User Id not found in local storage");
            window.location.href = '../index.html';
        }
    });
}

export function setupLogout() {
    const logoutButtons = document.querySelectorAll('#logout, #logoutpro');
    logoutButtons.forEach(button => {
        button.addEventListener('click', () => {
            localStorage.removeItem('loggedInUserId');
            signOut(auth)
                .then(() => {
                    window.location.href = '../index.html';
                })
                .catch((error) => {
                    console.error('Error signing out:', error);
                });
        });
    });
}