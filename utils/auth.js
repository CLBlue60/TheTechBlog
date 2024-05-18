// Middleware function to check if the user is authenticated
const withAuth = (req, res, next) => {
  // Check if the user is logged in
  if (!req.session.logged_in) {
    // If not logged in, redirect to the login page
    res.redirect("/login");
  } else {
    // If logged in, proceed to the next middleware or route handler
    next();
  }
};

module.exports = withAuth; // Export the middleware function for use in other files
