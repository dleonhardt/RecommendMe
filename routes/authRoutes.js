const express = require("express");
const passport = require("passport");
const router = express.Router();

let baseUrl = "";

// This is a hack to get around the fact that our backend server
// that social media sites need to call back to is on a different
// port than our front end when we're running in development mode
if(!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
	baseUrl = "http://localhost:3000";
}

router.get("/auth/spotify", passport.authenticate("spotify"), (req, res) => {
	res.end();
});

router.get("/auth/spotify/callback", passport.authenticate("spotify", {
	successRedirect: `${baseUrl}/callback`,
	failureRedirect: `${baseUrl}/auth/failed`
}));

router.get("/callback", (req, res) => {
	res.redirect("/");
});

module.exports = router;