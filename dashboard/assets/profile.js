import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

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
const storage = getStorage();

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
                    if (userData.profilePhoto) {
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

// Handle photo upload
document.getElementById('uploadPhotoBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('photoUpload');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select an image to upload.');
        return;
    }

    const userId = localStorage.getItem('loggedInUserId');
    const storageRef = ref(storage, `profile_photos/${userId}/${file.name}`);

    uploadBytes(storageRef, file)
        .then((snapshot) => {
            return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
            const docRef = doc(db, "users", userId);
            return updateDoc(docRef, { profilePhoto: downloadURL }).then(() => downloadURL);
        })
        .then((downloadURL) => {
            document.getElementById('profilePhoto').src = downloadURL;
            document.getElementById('navProfilePhoto').src = downloadURL;
            alert('Profile photo updated successfully!');
        })
        .catch((error) => {
            console.error('Error uploading photo:', error);
            alert('Failed to upload photo. Please try again.');
        });
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