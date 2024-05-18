const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to render the homepage
router.get("/", async (req, res) => {
  try {
    // Fetch all posts with associated usernames
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["createdAt"]],
    });

    // Map the post data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the homepage template with post data and login status
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the user dashboard
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Fetch all posts associated with the logged-in user
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    // Fetch user data
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });

    // Map post data and user data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));
    const user = userData.get({ plain: true });

    // Render the profile template with post data, user data, and login status
    res.render("profile", {
      posts,
      user,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render a specific post
router.get("/posts/:id", async (req, res) => {
  try {
    // Fetch the post data including associated comments and usernames
    const postData = await Post.findOne({
      include: [
        {
          model: Comment,
          include: [User],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
      where: {
        id: req.params.id,
      },
    });

    // Render the post template with the post data
    res.render("post", postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to fetch a specific post data
router.get("/post/:id", async (req, res) => {
  try {
    // Fetch the post data by ID
    const postData = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });

    // Return the post data as JSON response
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to render the new post form
router.get("/post", withAuth, async (req, res) => {
  res.render("newPost");
});

// Route to render the login page
router.get("/login", async (req, res) => {
  // Redirect to homepage if user is already logged in
  if (req.session.logged_in) {
    res.redirect("/homepage");
    return;
  }

  // Render the login template
  res.render("login");
});

module.exports = router;
