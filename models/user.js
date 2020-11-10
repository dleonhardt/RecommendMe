const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    topArtists: [
        {
            type: Schema.Types.ObjectId,
            ref: "Artist"
        }
    ],
    recommendedArtists: [
        {
            type: Schema.Types.ObjectId,
            ref: "Artist"
        }
    ]
});

const User = model("User", userSchema);

module.exports = User;