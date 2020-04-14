const express = require("express");
// const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const SpotifyStrategy = require("passport-spotify").Strategy;
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/recommendme");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Routes
require("./passport")(app);
app.use(require("./routes"));

// Here's a little custom error handling middleware
// that logs the error to console, then renders an
// error page describing the error.
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    error
  })
});

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
