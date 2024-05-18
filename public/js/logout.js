// Function to handle user logout
const logout = async () => {
  // Send POST request to logout endpoint
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  // If logout successful, redirect to homepage
  if (response.ok) {
    document.location.replace("/");
  } else {
    // If logout failed, show alert
    alert("Failed to log out.");
  }
};

// Event listener for logout button click
document.querySelector("#logout").addEventListener("click", logout);
