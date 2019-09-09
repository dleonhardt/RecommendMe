var Spotify = require("spotify-web-api-js");
var s = new Spotify();
// var spotifyApi = new SpotifyWebApi();

// spotifyApi.setAccessToken("85d0a02e55c046448836af208b83323e");
// spotifyApi.setPromiseImplementation(Q);

// Defining methods for the spotifyController
module.exports = {
  connect: function(req, res) {
    console.log("HI!!!");
		const my_client_id = "85d0a02e55c046448836af208b83323e";
		const redirect_url = "http://localhost:3000/callback";

    var scopes = "user-read-private user-read-email";
   	window.location.href = "https://accounts.spotify.com/authorize?response_type=code&client_id=" + my_client_id + (scopes ? "&scope=" + encodeURIComponent(scopes) : "") + "&redirect_uri=" + redirect_url;
  }
};
