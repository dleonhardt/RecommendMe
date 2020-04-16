const path = require("path");
const router = require("express").Router();
const authRoutes = require("./authRoutes");
const apiRoutes = require("./api");
const userRoutes = require("./user")

// Routes
router.use(authRoutes);
router.use(userRoutes);
router.use("/api", apiRoutes);

// If no API routes are hit, send to the React app
// Define any API or static HTML routes before this runs!
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;