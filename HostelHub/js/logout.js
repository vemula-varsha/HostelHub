document.getElementById("logout-button").addEventListener("click", (e) => {
    e.preventDefault();
    
    console.log("Logout button clicked");
    
    auth.signOut()
        .then(() => {
            console.log("Successfully logged out");
            alert("Successfully logged out!");
            window.location.href = "index.html";  // Redirect to the home page after logout
        })
        .catch((error) => {
            console.error("Error logging out:", error.message);
        });
});
