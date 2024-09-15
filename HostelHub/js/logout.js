document.getElementById("logout-button").addEventListener("click", (e) => {
    e.preventDefault();
    
    auth.signOut()
        .then(() => {
            alert("Successfully logged out!");
            window.location.href = "index.html";  // Redirect to the home page after logout
        })
        .catch((error) => {
            console.error("Error logging out:", error.message);
        });
});
