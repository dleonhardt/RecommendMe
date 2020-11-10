const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  spotifyArtistId: {
    type: String,
    required: true
  }
});

const Artist = mongoose.model("Artist", artistSchema);

module.exports = Artist;
