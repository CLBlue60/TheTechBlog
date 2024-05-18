const router = require("express").Router();
const homeRoutes = require("./homeRoutes"); // Import routes for rendering HTML pages
const apiRoutes = require("./api"); // Import API routes for data manipulation

// Mount homeRoutes middleware at the root path
router.use("/", homeRoutes);

// Mount apiRoutes middleware at the '/api' path
router.use("/api", apiRoutes);

module.exports = router;
