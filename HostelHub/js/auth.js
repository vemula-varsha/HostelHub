import { auth, db } from './firebase-config.js'; // Import Firebase config
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"; // Import Auth
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"; // Import Firestore methods

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const name = document.getElementById("name").value;
            const phoneNumber = document.getElementById("phone-number").value;
            const role = document.getElementById("role").value;

            let hostel = "";
            let roomNumber = "";

            if (role === "student") {
                hostel = document.getElementById("hostel").value;
                roomNumber = document.getElementById("room-number").value;
            }

            // Create user with email and password
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    const userData = {
                        name,
                        email,
                        phoneNumber,
                        role,
                        uid: user.uid
                    };

                    if (role === "student") {
                        userData.hostel = hostel;
                        userData.roomNumber = roomNumber;
                    }

                    console.log("Writing user data to Firestore:", userData);

                    // Write user data to Firestore using setDoc
                    return setDoc(doc(db, "users", user.uid), userData);
                })
                .then(() => {
                    console.log("User data successfully written.");
                    window.location.href = "login.html"; // Redirect to login page after successful registration
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        alert("The email address is already in use.");
                    } else if (error.code === 'auth/weak-password') {
                        alert("Password should be at least 6 characters.");
                    } else {
                        alert("Error: " + error.message);
                    }
                    console.error("Error writing user data:", error.code, error.message);
                });
        });
    } else {
        console.error("Form element not found.");
    }
});
