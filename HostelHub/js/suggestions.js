// Import necessary Firebase modules
import { auth, db } from './firebase-config.js'; // Ensure this path is correct
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"; // Import Firestore methods

document.addEventListener("DOMContentLoaded", () => {
    const suggestionsForm = document.getElementById("suggestions-form");

    if (suggestionsForm) {
        suggestionsForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Get form values
            const suggestionText = document.getElementById("suggestion").value;

            const user = auth.currentUser;

            if (!user) {
                alert("Please log in first!");
                return;
            }

            try {
                // Create a new suggestion document
                const docRef = await addDoc(collection(db, "suggestions"), {
                    studentId: user.uid,
                    suggestion: suggestionText,
                    timestamp: new Date(),
                    status: 'active' // Set initial status to 'active'
                });

                console.log("Suggestion submitted with ID:", docRef.id);
                alert("Your suggestion has been submitted.");

                // Optionally, reset the form or redirect the user
                suggestionsForm.reset();
                window.location.href = "studentdashboard.html"; // Redirect to dashboard
            } catch (error) {
                console.error("Error submitting suggestion:", error);
                alert("There was an error submitting your suggestion. Please try again.");
            }
        });
    } else {
        console.error("Suggestions form not found.");
    }
});
