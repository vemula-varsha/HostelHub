//firebase-coonfig.js
// Import Firebase modules you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"; // Import Firebase Auth
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js"; // Import Firestore

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

export const auth = getAuth(app);    // Initialize Auth
export const db = getFirestore(app); // Initialize Firestore
