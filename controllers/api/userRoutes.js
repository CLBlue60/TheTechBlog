const router = require("express").Router();

// Import the User model from the models folder
const { User } = require("../../models");

// Route to create a new user
router.post("/", async (req, res) => {
  try {
    // Create a new user with the data from the request body
    const userData = await User.create(req.body);

    // Save user ID and logged-in state to the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Respond with the newly created user data
      res.status(200).json(userData);
    });
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

// Route to log in a user
router.post("/login", async (req, res) => {
  try {
    // Find user data based on email from the request body
    const userData = await User.findOne({ where: { email: req.body.email } });

    // If no user data found, respond with error message
    if (!userData) {
      res
        .status(500)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Check if the password provided matches the stored password
    const validPassword = await userData.checkPassword(req.body.password);

    // If password is invalid, respond with error message
    if (!validPassword) {
      res
        .status(500)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Save user ID and logged-in state to the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Respond with user data and success message
      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

// Route to log out a user
router.post("/logout", (req, res) => {
  // Check if the user is logged in
  if (req.session.logged_in) {
    // If logged in, destroy the session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If not logged in, respond with 404 status
    res.status(404).end();
  }
});

module.exports = router; // Export the router for use in other files
