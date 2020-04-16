const morgan = require("morgan")
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Logger
app.use(morgan("dev"));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/recommendme", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
mongoose.set("useFindAndModify", false);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport
require("./passport")(app);

// Routes
app.use(require("./routes"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({
    error
  })
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
