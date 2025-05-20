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
    1: "images/male.png",
    2: "images/maleuser.gif",
    3: "images/female.png",
    4: "images/femaleuser.gif",
    // 5: "images/icons8-user-48.png",
    // 6: "images/male.png"
    
};

export function updateProfileImages(iconId) {
    const iconUrl = PROFILE_ICONS[iconId];
    // Update all profile images across the app
    const profileImages = document.querySelectorAll('#profilePhoto, #navProfilePhoto, .profile-photo img');
    profileImages.forEach(img => {
        img.src = iconUrl;
    });
}

export async function selectProfileIcon(iconId) {
    const userId = localStorage.getItem('loggedInUserId');
    if (!userId) throw new Error('User not logged in');
    
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
        throw error;
    }
}

export function setupProfileIcons() {
    const iconsContainer = document.getElementById('profileIconsContainer');
    if (!iconsContainer) {
        console.error('Profile icons container not found');
        return;
    }

    Object.entries(PROFILE_ICONS).forEach(([id, url]) => {
        const iconDiv = document.createElement('div');
        iconDiv.className = 'profile-icon-option';
        iconDiv.innerHTML = `<img src="${url}" alt="Profile ${id}">`;
        iconDiv.addEventListener('click', async () => {
            try {
                await selectProfileIcon(id);
                // Remove selected class from all icons
                document.querySelectorAll('.profile-icon-option').forEach(div => {
                    div.classList.remove('selected');
                });
                // Add selected class to clicked icon
                iconDiv.classList.add('selected');
                alert('Profile icon updated successfully!');
            } catch (error) {
                alert('Failed to update profile icon. Please try again.');
            }
        });
        iconsContainer.appendChild(iconDiv);
    });
}
