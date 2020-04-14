const router = require("express").Router();
const apiRoutes = require("./api");
const userRoutes = require("./user")

// Routes
router.use("/", userRoutes);
router.use("/api", apiRoutes);
router.use(require('./htmlRoutes'));

module.exports = router;