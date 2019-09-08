const router = require("express").Router();
const playlistsController = require("../../controllers/playlistsController");

// Matches with "/api/playlists"
router.route("/")
  .get(playlistsController.findAll)
  .post(playlistsController.create);

// Matches with "/api/playlists/:id"
router
  .route("/:id")
  .get(playlistsController.findById)
  .put(playlistsController.update)
  .delete(playlistsController.remove);

module.exports = router;
