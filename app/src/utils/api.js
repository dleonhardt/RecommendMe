import axios from 'axios';

const limit = 100;

const getSpotifyHeaders = token => ({
  Authorization: `Bearer ${token}`
});

export default {
  getDevices: token => axios.get(`https://api.spotify.com/v1/me/player/devices`, { headers: getSpotifyHeaders(token) }),
  getSpotifyUser: token => axios.get(`https://api.spotify.com/v1/me`, { headers: getSpotifyHeaders(token) }),
  getUserTopArtists: (token, term = 'long_term') => axios.get(`https://api.spotify.com/v1/me/top/artists/?time_range=${term}&limit=${limit}`,
    { headers: getSpotifyHeaders(token) }),
  getRelatedArtists: (token, artist) => axios.get(`https://api.spotify.com/v1/artists/${artist}/related-artists`, { headers: getSpotifyHeaders(token) }),
  getArtistTopSongs: (token, artist) => axios.get(`https://api.spotify.com/v1/artists/${artist}/top-tracks?market=US`, { headers: getSpotifyHeaders(token) }),
  setSong: (token, device_id, uris) => axios.put(`https://api.spotify.com/v1/me/player/play`, { uris, device_id }, { headers: getSpotifyHeaders(token) }),
};
