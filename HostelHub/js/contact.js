document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("contactEmail").value;
    const message = document.getElementById("contactMessage").value;

    // You can add logic here to send this data to a database or backend service
    try {
        // Simulating form submission
        alert(`Thank you for contacting us! Email: ${email}, Message: ${message}`);
        
        // Clear the form after submission
        document.getElementById("contactForm").reset();
    } catch (error) {
        console.error("Error submitting the contact form:", error);
    }
});
