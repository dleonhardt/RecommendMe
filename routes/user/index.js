const router = require("express").Router();
const db = require("../../models/");

async function getCurrentUser(req, res) {
	const { id, username } = req.user;

	const user = await db.User
		.find({ username });

	console.log(":::::USER:::::");
	console.log(user[0]);

	res.json({ id, username, accessToken: user[0].accessToken, refreshToken: user[0].refreshToken });
}

router.get("/user", (req, res) => {
	if(!req.user) {
		return res.status(401).json({ message: "You are not currently logged in." });
	}

	console.log(req.user);

	getCurrentUser(req, res);
});

router.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/");
});

module.exports = router;