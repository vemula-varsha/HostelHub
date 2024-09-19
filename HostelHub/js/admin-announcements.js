// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChmyqDUFryxP85Kcy0aiRkFjtSqfOJS-k",
    authDomain: "hostelhub-76086.firebaseapp.com",
    projectId: "hostelhub-76086",
    storageBucket: "hostelhub-76086.appspot.com",
    messagingSenderId: "913629984754",
    appId: "1:913629984754:web:bd4f8404375e9aef8d1d6b",
    measurementId: "G-N6ZPGD9Q42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get Firestore instance

// Select HTML elements
const announcementsList = document.getElementById('announcementsList');
const announcementForm = document.getElementById('announcementForm');

// Load announcements and display them
const loadAnnouncements = async () => {
    try {
        const announcements = await getDocs(collection(db, 'announcements'));

        // Clear current list
        announcementsList.innerHTML = '';

        // Append each announcement as a list item
        announcements.forEach((doc) => {
            const announcement = doc.data();
            const li = document.createElement('li');
            li.innerHTML = `<strong>${announcement.title}</strong><p>${announcement.message}</p>`;
            announcementsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading announcements:', error);
    }
};

// Handle announcement form submission
announcementForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('announcementTitle').value;
    const message = document.getElementById('announcementMessage').value;

    try {
        // Add new announcement to Firestore
        await addDoc(collection(db, 'announcements'), {
            title,
            message,
            timestamp: serverTimestamp(),
        });

        // Reset form and reload announcements
        announcementForm.reset();
        loadAnnouncements(); // Reload announcements
    } catch (error) {
        console.error('Error adding announcement:', error);
    }
});

// Load announcements on window load
window.onload = loadAnnouncements;
