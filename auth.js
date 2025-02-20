document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Define the correct password
    const correctPassword = "yaoi"; // Replace with your desired password

    // Get the entered password
    const enteredPassword = document.getElementById('main_pass').value;

    // Check if the entered password is correct
    if (enteredPassword === correctPassword) {
        // Redirect to yaoi.html if the password is correct
        window.location.href = "yaoi.html";
    } else {
        // Alert the user if the password is incorrect
        alert("Incorrect password. Please try again.");
    }
});