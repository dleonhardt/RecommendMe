const express = require("express");
const mongoose = require("mongoose");

const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3001;

// Logger
app.use(morgan("dev"));

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/recommendme");

// Routes
app.use(require("./routes"));

app.use((error, _req, res) => {
  console.error(error);

  res.status(500).json({
    error
  })
});

// Start the API server
app.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`));
