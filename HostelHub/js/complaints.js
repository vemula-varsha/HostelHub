// Import necessary Firebase modules
import { auth, db } from './firebase-config.js'; // Ensure this path is correct
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"; // Import Firestore methods
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-storage.js"; // Import Storage methods

document.addEventListener("DOMContentLoaded", () => {
    const complaintForm = document.getElementById("complaint-form");

    if (complaintForm) {
        complaintForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Get form values
            const studentName = document.getElementById("student-name").value;
            const email = document.getElementById("email").value;
            const hostel = document.getElementById("hostel").value;
            const roomNumber = document.getElementById("room-number").value;
            const problemType = document.getElementById("problem-type").value;
            const description = document.getElementById("description").value;
            const fileUpload = document.getElementById("file-upload").files[0];
            
            try {
                // Handle file upload if there is a file
                let fileUrl = null;
                if (fileUpload) {
                    const storage = getStorage(); // Initialize Firebase Storage
                    const fileRef = ref(storage, `complaints/${fileUpload.name}`);
                    await uploadBytes(fileRef, fileUpload);
                    fileUrl = await getDownloadURL(fileRef);
                }

                // Create a new complaint document
                const docRef = await addDoc(collection(db, "complaints"), {
                    studentName,
                    email,
                    hostel,
                    roomNumber,
                    problemType,
                    description,
                    fileUpload: fileUrl, // Store the file URL
                    timestamp: new Date(),
                    status: 'active' // Set initial status to 'active'
                });

                console.log("Complaint submitted with ID:", docRef.id);
                alert("Your complaint has been submitted.");

                // Optionally, you can reset the form or redirect the user
                complaintForm.reset();
                window.location.href = "studentdashboard.html"; // Redirect to dashboard
            } catch (error) {
                console.error("Error submitting complaint:", error);
                alert("There was an error submitting your complaint. Please try again.");
            }
        });
    } else {
        console.error("Complaint form not found.");
    }
});
