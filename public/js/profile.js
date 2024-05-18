// Variable declarations
let updateId;
let modal = document.getElementById("update");
let updTitle = document.getElementById("title-update");
let updContent = document.getElementById("content-update");

// Function to open modal and populate with post data for update
const openModal = async (event) => {
  // Get the ID of the post to be updated
  updateId = event.target.getAttribute("data-btn-id");

  // Fetch the post data using its ID
  const response = await fetch(`/post/${updateId}`, {
    method: "GET",
  });

  // If fetching data is successful, populate the modal with post data
  if (response.ok) {
    const result = await response.json();
    updTitle.value = result.title;
    updContent.value = result.content;
  } else {
    // If fetching data fails, show alert and redirect to dashboard
    alert("Failed to retrieve data");
    document.location.replace("/dashboard");
  }

  // Display the modal
  modal.style.display = "block";
};

// Function to delete a post
const deletePost = async (event) => {
  // Get the ID of the post to be deleted
  const id = event.target.getAttribute("data-btn-id");

  // Send DELETE request to delete the post
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  // If deletion is successful, redirect to dashboard
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    // If deletion fails, show alert
    alert("Failed to delete post");
  }
};

// Function to update a post
const updatePost = async (event) => {
  event.preventDefault();

  // Get updated title and content from the modal
  const title = updTitle.value.trim();
  const content = updContent.value.trim();

  // Check if both title and content are provided
  if (title && content) {
    // Send PUT request to update the post
    const response = await fetch(`/api/posts/${updateId}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    // If update is successful, redirect to dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      // If update fails, show alert
      alert("Failed to update post");
    }
  } else {
    // If either title or content is not provided, show alert
    alert("Please fill out both title and content!");
  }
};

// Event listener for opening the modal
document.querySelector(".btn-modal").addEventListener("click", openModal);

// Event listener for deleting a post
document.querySelector(".btn-danger").addEventListener("click", deletePost);

// Event listener for updating a post
document.querySelector(".update-form").addEventListener("submit", updatePost);

// Function to close the modal when clicking outside of it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
