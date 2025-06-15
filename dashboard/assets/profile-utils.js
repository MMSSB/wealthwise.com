// // assets/profile-utils.js
// import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyBLCMK2Tm9sk2EBnhqoK9j_y8jiATd-QDA",
//     authDomain: "wealth-wise-3c329.firebaseapp.com",
//     projectId: "wealth-wise-3c329",
//     storageBucket: "wealth-wise-3c329.firebasestorage.app",
//     messagingSenderId: "546585897291",
//     appId: "1:546585897291:web:111d6c2d3170d93f59e0ce",
//     measurementId: "G-PGTS22BHQP"
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// export const PROFILE_ICONS = {
//     1: "images/userblue.png",
//     2: "images/userred.png",
//     3: "images/usergreen.png",
//     4: "images/useryellow.png",
//     5: "images/icons8-user-48.png",
//     // 6: "images/male.png"
    
// };

// export function updateProfileImages(iconId) {
//     const iconUrl = PROFILE_ICONS[iconId];
//     // Update all profile images across the app
//     const profileImages = document.querySelectorAll('#profilePhoto, #navProfilePhoto, .profile-photo img');
//     profileImages.forEach(img => {
//         img.src = iconUrl;
//     });
// }

// export async function selectProfileIcon(iconId) {
//     const userId = localStorage.getItem('loggedInUserId');
//     if (!userId) throw new Error('User not logged in');
    
//     try {
//         const docRef = doc(db, "users", userId);
//         await updateDoc(docRef, { 
//             profileIconId: iconId,
//             profilePhoto: PROFILE_ICONS[iconId]
//         });
//         updateProfileImages(iconId);
//         return true;
//     } catch (error) {
//         console.error('Error updating profile icon:', error);
//         throw error;
//     }
// }

// export function setupProfileIcons() {
//     const iconsContainer = document.getElementById('profileIconsContainer');
//     if (!iconsContainer) {
//         console.error('Profile icons container not found');
//         return;
//     }

//     Object.entries(PROFILE_ICONS).forEach(([id, url]) => {
//         const iconDiv = document.createElement('div');
//         iconDiv.className = 'profile-icon-option';
//         iconDiv.innerHTML = `<img src="${url}" alt="Profile ${id}">`;
//         iconDiv.addEventListener('click', async () => {
//             try {
//                 await selectProfileIcon(id);
//                 // Remove selected class from all icons
//                 document.querySelectorAll('.profile-icon-option').forEach(div => {
//                     div.classList.remove('selected');
//                 });
//                 // Add selected class to clicked icon
//                 iconDiv.classList.add('selected');
//                 alert('Profile icon updated successfully!');
//             } catch (error) {
//                 alert('Failed to update profile icon. Please try again.');
//             }
//         });
//         iconsContainer.appendChild(iconDiv);
//     });
// }




// assets/profile-utils.js
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

const firebaseConfig = {
    apiKey: "AIzaSyBLCMK2Tm9sk2EBnhqoK9j_y8jiATd-QDA",
    authDomain: "wealth-wise-3c329.firebaseapp.com",
    projectId: "wealth-wise-3c329",
    storageBucket: "wealth-wise-3c329.firebasestorage.app",
    messagingSenderId: "546585897291",
    appId: "1:546585897291:web:111d6c2d3170d93f59e0ce",
    measurementId: "G-PGTS22BHQP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const PROFILE_ICONS = {
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

export function updateProfileImages(iconId) {
    const iconUrl = PROFILE_ICONS[iconId];
    const profileImages = document.querySelectorAll('#profilePhoto, #navProfilePhoto, .profile-photo img, .sub-menu-wrap .user-info img');
    profileImages.forEach(img => {
        img.src = iconUrl;
        img.style.width = 'auto%'; // Ensure responsive images
        img.style.height = 'auto';
    });
}

export async function selectProfileIcon(iconId) {
    const userId = localStorage.getItem('loggedInUserId');
    if (!userId) {
        console.error('User not logged in');
        return false;
    }
    
    try {
        const docRef = doc(db, "users", userId);
        await updateDoc(docRef, { 
            profileIconId: iconId,
            profilePhoto: PROFILE_ICONS[iconId]
        });
        updateProfileImages(iconId);
        return true;
    } catch (error) {
        console.error('Error updating profile icon:', error);
        return false;
    }
}

export function setupProfileIcons() {
    const iconsContainer = document.getElementById('profileIconsContainer');
    if (!iconsContainer) {
        console.error('Profile icons container not found');
        return;
    }

    // Clear existing icons
    iconsContainer.innerHTML = '';

    Object.entries(PROFILE_ICONS).forEach(([id, url]) => {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'profile-icon-option';
        iconDiv.innerHTML = `<img src="${url}" alt="Profile ${id}" loading="lazy">`; // Added lazy loading
        
        iconDiv.addEventListener('click', async () => {
            const success = await selectProfileIcon(id);
            if (success) {
                document.querySelectorAll('.profile-icon-option').forEach(div => {
                    div.classList.remove('selected');
                });
                iconDiv.classList.add('selected');
                
                // Show a subtle notification instead of alert
                const notification = document.createElement('div');
                notification.className = 'profile-icon-notification';
                notification.textContent = 'Profile icon updated!';
                iconsContainer.parentNode.appendChild(notification);
                setTimeout(() => notification.remove(), 2000);
            }
        });
        
        iconsContainer.appendChild(iconDiv);
    });

    // Add responsive event listeners
    window.addEventListener('resize', adjustIconLayout);
    adjustIconLayout(); // Initial adjustment
}

function adjustIconLayout() {
    const iconsContainer = document.getElementById('profileIconsContainer');
    if (!iconsContainer) return;
    
    const containerWidth = iconsContainer.offsetWidth;
    const iconOptions = document.querySelectorAll('.profile-icon-option');
    
    if (window.innerWidth < 768) {
        // Mobile layout adjustments
        iconOptions.forEach(icon => {
            icon.style.minWidth = '40px';
            icon.style.minHeight = '40px';
        });
    } else {
        // Desktop layout
        iconOptions.forEach(icon => {
            icon.style.minWidth = '50px';
            icon.style.minHeight = '50px';
        });
    }
}