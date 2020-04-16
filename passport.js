const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const db = require("./models/");

// export a function that receives the Express app we will configure for Passport
module.exports = (app) => {
	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser(function (userId, done) {
		db.User.findById(userId)
			.then(function (user) {
				done(null, user);
			})
			.catch(function (err) {
				done(err);
			});
	});

	passport.use(new SpotifyStrategy(
		{
			clientID: process.env.SPOTIFY_CLIENT_ID,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
			callbackURL: `${process.env.APP_BASE_URL}/auth/spotify/callback`,
			scope: [
				// "user-read-private",
				// "user-read-email",
				"user-top-read",
				"user-modify-playback-state",
				"playlist-read-private",
				"playlist-read-collaborative"
			]
		},
		(accessToken, refreshToken, expires_in, profile, done) => {
			process.nextTick(async () => {
				let user;

				// Check to see if there is a user already with an account.
				// If so, update their access and refresh tokens.
				try {
					user = await db.User.findOneAndUpdate({ username: profile.username }, { accessToken, refreshToken });
				} catch(err) {
					return done(err, null);
				}

				if(!user) {
					try {
						// If there is no user with this spotify account is on file,
						// create a new user.
						user = await db.User.create({ username: profile.username, accessToken: accessToken, refreshToken: refreshToken });
					} catch(err) {
						return done(err, null);
					}
				}
				
				return done(null, user);
			});
	  }
	));

	// initialize passport. this is required, after you set up passport but BEFORE you use passport.session (if using)
	app.use(passport.initialize());
	// only required if using sessions. this will add middleware from passport
	// that will serialize/deserialize the user from the session cookie and add
	// them to req.user
	app.use(passport.session());
}