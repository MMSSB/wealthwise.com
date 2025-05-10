// assets/profile-utils.js
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { db, storage } from "./dashauth.js";

export async function uploadProfilePhoto(file) {
    const userId = localStorage.getItem('loggedInUserId');
    if (!userId) throw new Error('User not logged in');
    
    const storageRef = ref(storage, `profile_photos/${userId}/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, { profilePhoto: downloadURL });
    
    return downloadURL;
}

export function updateProfileImages(url) {
    // Update all profile images across the app
    const profileImages = document.querySelectorAll('#profilePhoto, #navProfilePhoto, .profile-photo img');
    profileImages.forEach(img => {
        img.src = url;
    });
}

export function setupProfileUpload(uploadBtnId, fileInputId) {
    document.getElementById(uploadBtnId).addEventListener('click', async () => {
        const fileInput = document.getElementById(fileInputId);
        const file = fileInput.files[0];
        if (!file) {
            alert('Please select an image to upload.');
            return;
        }

        try {
            const downloadURL = await uploadProfilePhoto(file);
            updateProfileImages(downloadURL);
            alert('Profile photo updated successfully!');
        } catch (error) {
            console.error('Error uploading photo:', error);
            alert('Failed to upload photo. Please try again.');
        }
    });
}