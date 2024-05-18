const router = require("express").Router();

// Import the routes.
const userRoutes = require("./userRoutes"); // Import user routes
const postRoutes = require("./postRoutes"); // Import post routes
// const commentRoutes = require('./commentRoutes') // Import comment routes

// Define routes for users and posts
router.use("/users", userRoutes); // Use user routes with base path '/users'
router.use("/posts", postRoutes); // Use post routes with base path '/posts'
// router.use('/comment', commentRoutes); // Uncomment and use comment routes with base path '/comment'

module.exports = router; // Export the router for use in other files
