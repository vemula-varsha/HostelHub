// Import Firestore functions
import { collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { db } from './firebase-config.js'; // Ensure the correct path to your Firebase config

const suggestionsTableBody = document.getElementById('suggestionsTableBody');

const loadSuggestions = async () => {
    try {
        // Fetch all suggestions from Firestore
        const suggestionsSnapshot = await getDocs(collection(db, 'suggestions'));
        
        suggestionsSnapshot.forEach((doc) => {
            const suggestion = doc.data();
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${suggestion.suggestion || 'N/A'}</td>
                <td>${suggestion.status || 'Pending'}</td>
                <td>
                    ${suggestion.status !== 'read' ? `<button class="mark-read-btn" data-id="${doc.id}">Mark as Read</button>` : 'Read'}
                </td>
            `;
            
            suggestionsTableBody.appendChild(row);
        });

        // Add event listeners for "Mark as Read" buttons
        const markReadButtons = document.querySelectorAll('.mark-read-btn');
        markReadButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const suggestionId = e.target.getAttribute('data-id');
                await markAsRead(suggestionId);
            });
        });
    } catch (error) {
        console.error("Error loading suggestions:", error);
    }
};

// Function to mark a suggestion as "read"
const markAsRead = async (id) => {
    try {
        // Get the reference to the specific suggestion document
        const suggestionRef = doc(db, 'suggestions', id);
        
        // Update the suggestion's status to 'read'
        await updateDoc(suggestionRef, {
            status: 'Done'
        });
        
        // Reload suggestions after the status update
        suggestionsTableBody.innerHTML = ''; // Clear table content
        loadSuggestions(); // Reload updated data
    } catch (error) {
        console.error("Error marking suggestion as read:", error);
    }
};

// Load suggestions when the page is loaded
window.onload = loadSuggestions;
