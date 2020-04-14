const express = require("express");
const path = require("path");
const passport = require("passport");
const router = express.Router();

let baseUrl = "";

// This is a hack to get around the fact that our backend server
// that social media sites need to call back to is on a different
// port than our front end when we"re running in development mode
if(!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
	baseUrl = "http://localhost:3000";
}

// we need to define the routes necessary to make passport-spotify work
// here's the URL users need to visit to initiate the spotify login
router.get("/auth/spotify", passport.authenticate("spotify", {
    scope: ["user-read-private", "user-read-email", "user-top-read", "user-modify-playback-state"],
    showDialog: true
}), (req, res) => {
	res.end();
});

// here's the URL spotify will call back to finish logging them into your site
router.get("/auth/spotify/callback", passport.authenticate("spotify", {
	successRedirect: "/callback", // tell it where to go if the log in successfully
	failureRedirect: "/auth/failed" // tell it where to go if they couldn't log in
}));

// Serve up static assets (usually on heroku)
router.use(express.static("client/build", {
	index: false
}));

// Send every request to the React app
// Define any API or static HTML routes before this runs!
router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;