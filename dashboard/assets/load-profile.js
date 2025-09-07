// Function to load user profile data from Firebase
function loadUserProfile() {
    // Import Firebase modules
    import('https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js').then((firebase) => {
        import('https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js').then((firestore) => {
            // Firebase configuration
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
            const app = firebase.initializeApp(firebaseConfig);
            const db = firestore.getFirestore(app);

            // Profile icons mapping
            const PROFILE_ICONS = {
    1: "images/userblue.png",
    2: "images/userred.png",
    3: "images/usergreen.png",
    4: "images/useryellow.png",
    5: "images/thunder.gif",
    6: "images/male.png",
    7: "images/maleuser.gif",
    8: "images/female.png",
    9: "images/femaleuser.gif",
    10: "images/h1.jpg",
    11: "images/h2.jpg",
    12: "images/h3.jpg",
    13: "images/h4.jpg",
    14: "images/h5.jpg",
    15: "images/h6.jpg",
    16: "images/h7.jpg",
    17: "images/j1.jpg",
    18: "images/j2.jpg"
    
};

            // Get user data
            const loggedInUserId = localStorage.getItem('loggedInUserId');
            if (loggedInUserId) {
                const docRef = firestore.doc(db, "users", loggedInUserId);
                firestore.getDoc(docRef)
                    .then((docSnap) => {
                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            
                            // Update user name
                            const userNameElements = document.querySelectorAll('#loggedUserFName, #usernameFname');
                            userNameElements.forEach(element => {
                                if (element) element.innerText = userData.firstName || '';
                            });

                            // Update last name
                            const lastNameElement = document.getElementById('usernamelname');
                            if (lastNameElement) {
                                lastNameElement.innerText = userData.lastName || '';
                            }

                            // Update profile images
                            const defaultIcon = "images/icons8-user-48.png";
                            const imageUrl = userData.profileIconId ? 
                                           PROFILE_ICONS[userData.profileIconId] : 
                                           (userData.profilePhoto || defaultIcon);

                            // Update all profile images including the dropdown menu
                            const profileImages = document.querySelectorAll('#profilePhoto, #navProfilePhoto, .profile-photo img, .user-info img');
                            profileImages.forEach(img => {
                                if (img) {
                                    img.src = imageUrl;
                                    // Ensure image loads properly
                                    img.onerror = () => {
                                        img.src = defaultIcon;
                                    };
                                }
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Error loading user profile:", error);
                    });
            }
        });
    });
}

// Function to toggle profile menu
function toggleMenu() {
    const subMenu = document.getElementById('subMenu');
    if (subMenu) {
        subMenu.classList.toggle('open-menu');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();

    // Add click event listener for profile menu toggle
    const profileElements = document.querySelectorAll('.profile');
    profileElements.forEach(profile => {
        profile.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event from bubbling up
            toggleMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const subMenu = document.getElementById('subMenu');
        const profiles = document.querySelectorAll('.profile');
        let clickedInsideProfile = false;

        profiles.forEach(profile => {
            if (profile.contains(e.target)) {
                clickedInsideProfile = true;
            }
        });

        if (subMenu && !clickedInsideProfile && !subMenu.contains(e.target)) {
            subMenu.classList.remove('open-menu');
        }
    });

    // Add click event listener for logout
    const logoutButtons = document.querySelectorAll('#logout, #logoutpro');
    logoutButtons.forEach(button => {
        button.addEventListener('click', () => {
            localStorage.removeItem('loggedInUserId');
            window.location.href = '../index.html';
        });
    });
});

