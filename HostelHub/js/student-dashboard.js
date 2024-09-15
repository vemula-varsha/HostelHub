// Import Firebase modules
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

// Display student name and load complaints and announcements
const displayStudentNameAndContent = () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            document.getElementById('studentName').innerText = user.email; // Display user email

            // Load complaints related to the current user
            await loadComplaints(user.email);

            // Load announcements
            await loadAnnouncements();
        } else {
            window.location.href = "login.html"; // Redirect if not authenticated
        }
    });
};

// Load complaints and display as cards
const loadComplaints = async (email) => {
    try {
        const complaintsRef = collection(db, "complaints");
        const q = query(complaintsRef, where("email", "==", email)); // Fetch complaints by user email
        const complaintsSnapshot = await getDocs(q);

        const activeComplaintsList = document.getElementById('activeComplaintsList');
        const completedComplaintsList = document.getElementById('completedComplaintsList');

        // Clear existing lists
        activeComplaintsList.innerHTML = '';
        completedComplaintsList.innerHTML = '';

        complaintsSnapshot.forEach((doc) => {
            const complaint = doc.data();
            const complaintCard = createComplaintCard(complaint);

            // Append to the correct list based on status
            if (complaint.status === 'active') {
                activeComplaintsList.appendChild(complaintCard);
            } else if (complaint.status === 'completed') {
                completedComplaintsList.appendChild(complaintCard);
            }
        });

        if (complaintsSnapshot.empty) {
            activeComplaintsList.innerHTML = '<p>No active complaints found.</p>';
            completedComplaintsList.innerHTML = '<p>No completed complaints found.</p>';
        }

    } catch (error) {
        console.error("Error loading complaints: ", error);
        activeComplaintsList.innerHTML = '<p>Error loading complaints. Please try again later.</p>';
    }
};

// Create a card element for each complaint
const createComplaintCard = (complaint) => {
    const card = document.createElement('div');
    card.classList.add('complaint-card');

    card.innerHTML = `
        <h3>${complaint.problemType}</h3>
        <p><strong>Description:</strong> ${complaint.description}</p>
        <p><strong>Hostel:</strong> ${complaint.hostel}</p>
        <p><strong>Room:</strong> ${complaint.roomNumber}</p>
        <p><strong>Status:</strong> <span class="${complaint.status}">${complaint.status}</span></p>
    `;

    return card;
};

// Load announcements and display them as cards
const loadAnnouncements = async () => {
    try {
        const announcementsRef = collection(db, "announcements");
        const announcementsSnapshot = await getDocs(announcementsRef);

        const announcementsList = document.getElementById('announcementsList');
        announcementsList.innerHTML = ''; // Clear existing announcements

        announcementsSnapshot.forEach((doc) => {
            const announcement = doc.data();
            const announcementCard = createAnnouncementCard(announcement);
            announcementsList.appendChild(announcementCard);
        });

        if (announcementsSnapshot.empty) {
            announcementsList.innerHTML = '<p>No announcements found.</p>';
        }

    } catch (error) {
        console.error("Error loading announcements: ", error);
        announcementsList.innerHTML = '<p>Error loading announcements. Please try again later.</p>';
    }
};

// Create a card element for each announcement
const createAnnouncementCard = (announcement) => {
    const card = document.createElement('div');
    card.classList.add('announcement-card');

    card.innerHTML = `
        <h3>${announcement.title}</h3>
        <p>${announcement.message}</p>
    `;

    return card;
};

// Handle logout
const handleLogout = () => {
    signOut(auth).then(() => {
        window.location.href = "login.html"; // Redirect to login page on successful logout
    }).catch((error) => {
        console.error("Error logging out: ", error);
    });
};

// Event listeners for UI navigation
const setupNavigation = () => {
    document.getElementById('viewComplaints').addEventListener('click', () => {
        showSection('complaintsSection');
    });

    document.getElementById('postSuggestion').addEventListener('click', () => {
        showSection('suggestionsSection');
    });

    document.getElementById('viewAnnouncements').addEventListener('click', () => {
        showSection('announcementsSection');
    });

    document.getElementById('logout').addEventListener('click', handleLogout);
};

// Show specific section and hide others
const showSection = (sectionId) => {
    const sections = ['complaintsSection', 'suggestionsSection', 'announcementsSection'];
    sections.forEach(section => {
        document.getElementById(section).style.display = (section === sectionId) ? 'block' : 'none';
    });
};

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    displayStudentNameAndContent();
});
