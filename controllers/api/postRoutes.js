const router = require("express").Router();
const { Post } = require("../../models"); // Import the Post model

// Route to create a new post
router.post("/", async (req, res) => {
  try {
    // Log the request body
    console.log(req.body);

    // Create a new post with the provided data and user_id from session
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    // Respond with the new post
    res.status(200).json(newPost);
  } catch (err) {
    // Handle errors
    res.status(400).json(err);
  }
});

// Route to update a post by id
router.put("/:id", async (req, res) => {
  try {
    // Log the request body
    console.log(req.body);

    // Update the post with the provided data
    const updatePost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    // Respond with the updated post
    res.status(200).json(updatePost);
  } catch (err) {
    // Handle errors
    res.status(400).json(err);
  }
});

// Route to delete a post by id
router.delete("/:id", async (req, res) => {
  try {
    // Delete the post with the provided id and user_id from session
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    // If no post was found, respond with a 404 status
    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    // Respond with the deleted post
    res.status(200).json(postData);
  } catch (err) {
    // Handle errors
    res.status(500).json(err);
  }
});

module.exports = router; // Export the router for use in other files
