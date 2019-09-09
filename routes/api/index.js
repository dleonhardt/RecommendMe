const router = require("express").Router();
const artistRoutes = require("./artists");
const playlistRoutes = require("./playlists");

// Artist routes
router.use("/artists", artistRoutes);

// Playlist routes
router.use("/playlists", playlistRoutes);

module.exports = router;