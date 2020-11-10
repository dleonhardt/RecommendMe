import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Container, Row, Col } from "../components/Grid";
import Button from "../components/Button";
import ArtistCard from "../components/ArtistCard";
import Player from "../components/Player";
import hash from "../utils/hash";
import API from "../utils/API";
import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_BASE_URL + "/callback";
const scopes = ["user-read-email", "user-read-private", "user-modify-playback-state"];

function Home() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [devices, setDevices] = useState([]);
  const [activeDevice, setActiveDevice] = useState("");
  const [recommendedArtists, setRecommended] = useState("");
  const [player, setPlayer] = useState(false);
  const [artist, setArtist] = useState({
    id: "",
    name: "",
    track: "",
    image: ""
  });

  useEffect(() => {
    const _token = hash.access_token;

    console.log(_token);

    if (_token) {
      setToken(_token);
      getUserInfo(_token);
      getDevices(_token);
      getRecommended(_token);
    }
  }, []);

  const getUserInfo = token => {
    API.getSpotifyUser(token).then(res => {
      console.log(res);

      setUser(res.data);
    });
  }

  const getDevices = token => {
    API.getDevices(token).then(res => {
      console.log(res.data);
      
      const { devices } = res.data;

      // const activeDevice = devices.filter(device => device.is_active ? device.id : null);
      const activeDevice = devices[0].is_active ? devices[0].id : "";

      console.log("#####################");
      
      console.log(activeDevice);

      console.log("#####################");

      setDevices(res.data.devices);
      setActiveDevice(activeDevice);
    });
  }

  const getRecommended = accessToken => {
    // Make a call using the token
    const headers = {
      "Authorization": "Bearer " + accessToken
    };

    let topArtists = [];
    let relatedArtists = [];

    axios.get("https://api.spotify.com/v1/me/", { headers })
      .then(res => {
        const data = res.data;
        console.log("User:");
        console.log(data);

        axios.get("https://api.spotify.com/v1/me/top/artists/?time_range=long_term&limit=50", { headers })
          .then(res => {
            const data = res.data;
            console.log("Top Artists:");
            topArtists = data.items;

            const artistArr = topArtists.map(topArtist => topArtist.name);

            console.log(artistArr);
            //console.log("https://api.spotify.com/v1/artists/" + topArtists[0].id + "/related-artists");

            topArtists.map(topArtist => {
              axios.get("https://api.spotify.com/v1/artists/" + topArtist.id + "/related-artists", { headers })
                .then(res => {
                  //console.log("Related Artists:");

                  relatedArtists = relatedArtists.concat(res.data.artists);
                  //console.log(relatedArtists);

                  if (relatedArtists.length >= 1000) {
                    console.log("-----------------");
                    console.log(relatedArtists);

                    // check if an element exists in array using a comparer function
                    // comparer : function(currentElement)
                    Array.prototype.inArray = function (comparer) {
                      for (var i = 0; i < this.length; i++) {
                        if (comparer(this[i])) return true;
                      }
                      return false;
                    };

                    // adds an element to the array if it does not already exist using a comparer 
                    // function
                    Array.prototype.pushIfNotExist = function (element, comparer) {
                      if (!this.inArray(comparer)) {
                        this.push(element);
                      }
                    };

                    let onlyNewArtists = [];

                    for (let i = 0; i < relatedArtists.length; i++) {
                      for (let j = 0; j < artistArr.length; j++) {
                        if (relatedArtists[i].name === artistArr[j]) {
                          console.log("|||||||||||||||||||||||||||");
                          console.log("i: " + relatedArtists[i].name);
                          console.log("j: " + artistArr[j]);
                          console.log("|||||||||||||||||||||||||||");
                          break;
                        }

                        if (j === topArtists.length - 1) {
                          onlyNewArtists.push(relatedArtists[i]);
                        }
                      }
                    }

                    console.log("***********");
                    console.log(onlyNewArtists);
                    console.log("***********");

                    let recommendedArtists = [];

                    for (let i = 0; i < onlyNewArtists.length; i++) {
                      recommendedArtists.pushIfNotExist(onlyNewArtists[i], function (e) {
                        return e.name === onlyNewArtists[i].name;
                      });
                    }

                    console.log("Recommended Artists:");
                    console.log(recommendedArtists);

                    setRecommended(recommendedArtists);
                  }
                })
                .catch(err => console.log(err));
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  const selectArtist = ({ id, name, image }) => {
    console.log(id);

    API.getArtistTopSongs(token, id)
      .then(res => {
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$");
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$");
        console.log(res.data);
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$");
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$");

        const songUri = res.data.tracks[0].uri;

        setArtist({
          id: id,
          name: name,
          track: songUri,
          image: image
        });
        
        API.setSong(token, activeDevice, [songUri])
        .then(res => {
          setPlayer(true);
        })
        .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  return (
    <Container fluid>
      <Row>
        <Col size="12">
          <Header>
            <div className="text-center">
              <h1>Recommend.me</h1>
              <br />
              {!token && !player &&
                <Button href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>Connect to Spotify <i className="fa fa-spotify"></i></Button>
              }
              {token && !player &&
                <>
                  <h3>Welcome {user.display_name}</h3>
                  <Button>Rescan <i class="fa fa-refresh" aria-hidden="true"></i></Button>
                  {/* {Object.keys(artist).length === 0 ? */}
                  <Container>
                    <section className="artist-section">
                      {recommendedArtists.length > 0 && recommendedArtists.map((item) =>
                          <ArtistCard
                            id={item.id}
                            name={item.name}
                            image={item.images[0].url}
                            selectArtist={selectArtist}
                          />
                      )}
                      </section>
                    </Container>
                   
                </>
              }
              {player &&
                <Player id={artist.id} name={artist.name} track={artist.track} image={artist.image} />
              }
            </div>
          </Header>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
