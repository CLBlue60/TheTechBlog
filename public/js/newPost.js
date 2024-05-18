// Function to handle submission of a new post
const newPost = async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Get title and content input values, trim whitespace
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#content").value.trim();

  // Check if title and content are provided
  if (title && content) {
    // Send POST request to create new post endpoint
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }), // Convert data to JSON string
      headers: { "Content-Type": "application/json" }, // Set request headers
    });

    // If post creation successful, redirect to dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      // If post creation failed, show alert
      alert("Failed to add post");
    }
  }
};

// Event listener for submission of new post form
document.querySelector(".post-form").addEventListener("submit", newPost);
