import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Container, Row, Col } from '../components/Grid';
import Button from '../components/Button';
import ArtistCard from '../components/ArtistCard';
import Player from '../components/Player';
import hash from '../utils/hash';
import api from '../utils/api';

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_BASE_URL + '/callback';
const scopes = ['user-read-email', 'user-read-private', 'user-modify-playback-state'];

const Home = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [devices, setDevices] = useState([]);
  const [activeDevice, setActiveDevice] = useState({});
  const [recommendedArtists, setRecommended] = useState([]);
  const [player, setPlayer] = useState(false);
  const [artist, setArtist] = useState(undefined);

  useEffect(() => {
    const { access_token } = hash;

    access_token && setToken(access_token);
  }, []);

  useEffect(() => {
    if (token) {
      getUserInfo();
      getDevices();
      getRecommended();
    }
  }, [token]);

  useEffect(() => {
    !!artist && setPlayer(true);
  }, [artist])

  const backToHome = () => {
    setPlayer(false);
    setArtist(undefined);
  }

  const getUserInfo = async () => {
    const { data: userData } = await api.getSpotifyUser(token);

    console.log('user', userData);

    setUser(userData);
  }

  const getDevices = () => {
    api.getDevices(token).then(res => {
      console.log(res.data);
      
      const { devices } = res.data;

      console.log('devices', devices);

      const activeDevice = devices.find(device => device.is_active && device.id);

      console.log('activeDevice', activeDevice);

      setDevices(res.data.devices);
      setActiveDevice(activeDevice);
    });
  }

  const getRecommended = async () => {
    const { data: artistData } = await api.getUserTopArtists(token);
    const { items: artistArr } = artistData;

    const topArtists = artistArr.map(topArtist => topArtist.name);

    console.log('Top Artists:', topArtists);

    let relatedArtists = [];

    relatedArtists = await Promise.all(artistArr.map(async artist => {
      const { data: relatedArtistData } = await api.getRelatedArtists(token, artist.id);

      return relatedArtistData.artists.map(({ id, name, images }) => ({
        id,
        name,
        image: images[0]?.url,
      }),
    ).filter(({ name }) => !topArtists.includes(name)).filter(({ name }) => !relatedArtists.find(artist => artist.name === name))}));

    const recommendedArtists = relatedArtists.flat();

    console.log('recommendedArtists', recommendedArtists);

    setRecommended(recommendedArtists);
  }

  return (
    <Container fluid>
      <Row>
        <Col size="12">
          <Header>
            <div className="text-center">
              <h1>RecommendMe</h1>
              <br />
              {!player ? !token ? (
                <Button href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`}>Connect to Spotify <i className="fa fa-spotify"></i></Button>
              ) : (
                <>
                  <h3>Welcome {user.display_name}!</h3>
                  <Button>Rescan <i className="fa fa-refresh" aria-hidden="true"></i></Button>
                  <Container>
                    <section className="artist-section">
                      {recommendedArtists.length > 0 && recommendedArtists.map(artist =>
                          <ArtistCard artist={artist} setArtist={setArtist} />
                      )}
                      </section>
                    </Container>
                   
                </>
              ) : (
                <Player artist={artist} backToHome={backToHome} />
            )}
            </div>
          </Header>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
