// Import necessary modules
const sequelize = require("../config/connection"); // Sequelize connection
const { User, Post, Comment } = require("../models"); // Sequelize models
const userData = require("./userData.json"); // User data
const postData = require("./postData.json"); // Post data
const commentData = require("./commentData.json"); // Comment data

// Function to seed the database with initial data
const seedDatabase = async () => {
  // Sync Sequelize models with the database, force=true to drop tables if they exist
  await sequelize.sync({ force: true });

  // Bulk create users with userData
  await User.bulkCreate(userData, {
    individualHooks: true, // Trigger Sequelize hooks
    returning: true, // Get back the created user data
  });

  // Bulk create posts with postData
  await Post.bulkCreate(postData, {
    returning: true, // Get back the created post data
  });

  // Bulk create comments with commentData
  await Comment.bulkCreate(commentData, {
    returning: true, // Get back the created comment data
  });

  // Exit the process after seeding the database
  process.exit(0);
};

// Call the seedDatabase function to start seeding the database
seedDatabase();
