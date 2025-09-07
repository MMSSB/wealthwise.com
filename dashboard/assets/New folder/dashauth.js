import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js"

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

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('loggedUserFName').innerText = userData.firstName || '';
                    if (userData.profilePhoto) {
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

onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('usernameFname').innerText = userData.firstName || '';
                    if (userData.profilePhoto) {
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
onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById('usernamelname').innerText = userData.lastName || '';
                    if (userData.profilePhoto) {
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

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = '../index.html';
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});


const logoutButtonpro = document.getElementById('logoutpro');
logoutButtonpro.addEventListener('click', () => {
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
        .then(() => {
            window.location.href = '../index.html';
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
});


// export { db, storage };


