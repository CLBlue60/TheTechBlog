// Function to handle login form submission
const loginFormHandler = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Get email and password input values, trim whitespace
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  // Check if email and password are provided
  if (email && password) {
    // Send POST request to login endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }), // Convert data to JSON string
      headers: { "Content-Type": "application/json" }, // Set request headers
    });

    // If login successful, redirect to homepage
    if (response.ok) {
      document.location.replace("/");
    } else {
      // If login failed, show alert
      alert("Failed to log in.");
    }
  }
};

// Function to handle signup form submission
const signupFormHandler = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Get username, email, and password input values, trim whitespace
  const username = document.querySelector("#username-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  // Check if username, email, and password are provided
  if (username && email && password) {
    // Send POST request to signup endpoint
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, email, password }), // Convert data to JSON string
      headers: { "Content-Type": "application/json" }, // Set request headers
    });

    // If signup successful, redirect to homepage
    if (response.ok) {
      document.location.replace("/");
    } else {
      // If signup failed, show alert
      alert("Failed to sign up.");
    }
  }
};

// Event listener for login form submission
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

// Event listener for signup form submission
document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
