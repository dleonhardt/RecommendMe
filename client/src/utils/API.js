import axios from "axios";

const spotifyHeader = token => {
  return {
    Authorization: `Bearer ${token}`
  };
}

export default {
  // Get Spotify user
  getSpotifyUser: token => {
    const headers = spotifyHeader(token);

    return axios.get("https://api.spotify.com/v1/me", { headers });
  },
  // Get Spotify devices
  getDevices: token => {
    const headers = spotifyHeader(token);

    return axios.get("https://api.spotify.com/v1/me/player/devices", { headers });
  },
  getArtistTopSongs: (token, artistId) => {
    const headers = spotifyHeader(token);
    
    return axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, { headers });
  },
  setSong: (token, device_id, uris) => {
    const headers = spotifyHeader(token);

    return axios.put("https://api.spotify.com/v1/me/player/play", { uris, device_id }, { headers });
  }
  // getUser: function() {
  //   return axios.get("/user");
  // },
  // // Gets all artists
  // getArtists: function() {
  //   return axios.get("/api/artists");
  // },
  // // Gets the artist with the given id
  // getArtist: function(id) {
  //   return axios.get("/api/artists/" + id);
  // },
  // // Removes the artist with the given id
  // removeArtist: function(id) {
  //   return axios.delete("/api/artists/" + id);
  // },
  // // Saves an artist to the database
  // saveArtist: function(artistData) {
  //   return axios.post("/api/artists", artistData);
  // }
};
