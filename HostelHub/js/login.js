import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Fetch user data from Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log("User data:", userData);

                    // Redirect based on role
                    if (userData.role === "admin") {
                        window.location.href = "/public/admin-dashboard.html";
                    } else if (userData.role === "student") {
                        window.location.href = "/public/studentdashboard.html";
                    } else {
                        alert("Unknown role. Please contact support.");
                    }
                } else {
                    alert("User data not found. Please contact support.");
                }
            } catch (error) {
                if (error.code === 'auth/user-not-found') {
                    alert("No user found with this email.");
                } else if (error.code === 'auth/wrong-password') {
                    alert("Incorrect password.");
                } else {
                    alert("Error: " + error.message);
                }
                console.error("Error logging in:", error.code, error.message);
            }
        });
    } else {
        console.error("Login form not found.");
    }
});
