const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// Routes
router.use("/api", apiRoutes);

// Serve up static assets if environment is production
if (process.env.NODE_ENV === "production") {
    router.use(express.static("../client/build"));
}

// If no API routes are hit, send to the React app index.html
router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;