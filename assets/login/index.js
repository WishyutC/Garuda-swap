// Function to show the login form and hide the sign-up form
function showLoginForm() {
    document.getElementById("loginFormContainer").style.display = "block";  // Show Login Form
    document.getElementById("signupFormContainer").style.display = "none"; // Hide Sign-Up Form

    document.getElementById("showLoginBtn").style.backgroundColor = "#4CAF50";  // Active Button (Login)
    document.getElementById("showSignupBtn").style.backgroundColor = "";        // Inactive Button (Sign Up)
}

// Function to show the sign-up form and hide the login form
function showSignupForm() {
    document.getElementById("loginFormContainer").style.display = "none";      // Hide Login Form
    document.getElementById("signupFormContainer").style.display = "block";    // Show Sign-Up Form

    document.getElementById("showLoginBtn").style.backgroundColor = "";        // Inactive Button (Login)
    document.getElementById("showSignupBtn").style.backgroundColor = "#4CAF50"; // Active Button (Sign Up)
}

// Automatically show the login form by default when the page loads
window.onload = showLoginForm;

// Login form submission handling
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents form from submitting the traditional way

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("loginMessage").textContent = data.message;
        document.getElementById("loginMessage").style.color = data.success ? "green" : "red";
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("loginMessage").textContent = "An error occurred. Please try again.";
        document.getElementById("loginMessage").style.color = "red";
    });
});

// Sign-Up form submission handling
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents form from submitting the traditional way

    const signupUsername = document.getElementById("signupUsername").value;
    const signupEmail = document.getElementById("signupEmail").value;
    const signupPassword = document.getElementById("signupPassword").value;
    const signupConfirmPassword = document.getElementById("signupConfirmPassword").value;

    // Check if passwords match
    if (signupPassword !== signupConfirmPassword) {
        document.getElementById("signupMessage").textContent = "Passwords do not match!";
        document.getElementById("signupMessage").style.color = "red";
        return;
    }

    fetch("signup.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `username=${encodeURIComponent(signupUsername)}&email=${encodeURIComponent(signupEmail)}&password=${encodeURIComponent(signupPassword)}`
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("signupMessage").textContent = data.message;
        document.getElementById("signupMessage").style.color = data.success ? "green" : "red";
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("signupMessage").textContent = "An error occurred. Please try again.";
        document.getElementById("signupMessage").style.color = "red";
    });
});
