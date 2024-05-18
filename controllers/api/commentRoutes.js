const router = require("express").Router();
const { Comment } = require("../../models"); // Import the Comment model for database operations
const withAuth = require("../../utils/auth"); // Import the withAuth middleware for authentication

// Route for creating a new comment for a specific post
router.post("/:post_id", withAuth, async (req, res) => {
  try {
    // Create a new comment in the database with the provided data
    const newComment = await Comment.create({
      ...req.body, // Spread operator to include all properties from the request body
      user_id: req.session.user_id, // Set the user_id of the comment to the currently authenticated user
      post_id: req.params.post_id, // Set the post_id of the comment to the ID of the post specified in the route parameter
    });

    // Respond with the newly created comment
    res.status(200).json(newComment);
  } catch (err) {
    // If an error occurs during the creation of the comment, respond with a 400 status code and the error message
    res.status(400).json(err);
  }
});

module.exports = router; // Export the router for use in other files
