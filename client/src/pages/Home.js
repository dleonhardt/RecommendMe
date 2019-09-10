import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import hash from "../utils/hash";

export const authEndpoint = "https://accounts.spotify.com/authorize";
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "85d0a02e55c046448836af208b83323e";
const redirectUri = "http://localhost:3000/callback";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-top-read"
];

class Home extends Component {
  constructor() {
    super();

    this.state = {
      token: null
    };
  }

  componentDidMount() {
    let _token = hash.access_token;

    if(_token) {
      this.setState({
        token: _token
      });

      this.getCurrentlyPlaying(_token);
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <div className="text-center">
                <h1>Recommend.me</h1>
                <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-4" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                {!this.state.token && (
                  <a
                    className="btn btn-success btn-lg"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
                  >
                    Login to Spotify <i className="fa fa-spotify"></i>
                  </a>
                )}
              </div>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
