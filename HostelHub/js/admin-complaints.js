import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js';
import { getFirestore, collection, query, onSnapshot, doc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js';

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

// Select HTML elements
const complaintsTableBody = document.getElementById('complaintsTableBody');

// Handle user authentication state
onAuthStateChanged(auth, (adminUser) => {
    if (adminUser) {
        // Fetch and display complaints
        const complaintsRef = collection(db, 'complaints');
        const complaintsQuery = query(complaintsRef);

        onSnapshot(complaintsQuery, (snapshot) => {
            complaintsTableBody.innerHTML = '';

            snapshot.forEach((docSnapshot) => {
                const complaint = docSnapshot.data();
                const tr = document.createElement('tr');

                // Add complaint data to table row
                tr.innerHTML = `
                    <td>${complaint.studentName || 'N/A'}</td>
                    <td>${complaint.email || 'N/A'}</td>
                    <td>${complaint.hostel || 'N/A'}</td>
                    <td>${complaint.roomNumber || 'N/A'}</td>
                    <td>${complaint.problemType || 'N/A'}</td>
                    <td>${complaint.description || 'N/A'}</td>
                    <td>${complaint.status || 'N/A'}</td>
                    <td id="action-${docSnapshot.id}"></td>
                `;

                complaintsTableBody.appendChild(tr);

                // If the complaint status is 'active', add the "Mark as Completed" button
                if (complaint.status === 'active') {
                    const actionCell = document.getElementById(`action-${docSnapshot.id}`);
                    const completeButton = document.createElement('button');
                    completeButton.innerText = 'Mark as Completed';
                    completeButton.onclick = () => markAsCompleted(docSnapshot.id);

                    actionCell.appendChild(completeButton);
                }
            });
        });
    } else {
        window.location.href = 'login.html'; // Redirect to login if not authenticated
    }
});

// Function to mark complaint as completed
const markAsCompleted = async (complaintId) => {
    try {
        const complaintRef = doc(db, 'complaints', complaintId);  // Ensure you're passing the correct document ID
        await updateDoc(complaintRef, { status: 'completed' });   // Update the status to 'completed'
        console.log('Complaint marked as completed');
    } catch (error) {
        console.error('Error updating complaint status:', error);
    }
};

// Handle logout
document.getElementById('logout').addEventListener('click', () => {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Error logging out:', error);
    });
});
