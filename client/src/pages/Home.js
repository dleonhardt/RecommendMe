import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import axios from "axios";
import qs from "query-string";

class Home extends Component {
  componentDidMount = () => {
    const callback = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).code;

    if(callback) {
      console.log(callback);
      const config = {
        headers: {
          'Authorization': 'Bearer ' + callback
        }
      };

      axios.get("https://api.spotify.com/v1/me", config)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }

  connectToSpotify = () => {
    const my_client_id = "85d0a02e55c046448836af208b83323e";
    const redirect_url = "http://localhost:3000/callback";

    var scopes = "user-read-private user-read-email";
    window.location.href = "https://accounts.spotify.com/authorize?response_type=code&client_id=" + my_client_id + (scopes ? "&scope=" + encodeURIComponent(scopes) : "") + "&redirect_uri=" + redirect_url;
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
                <button type="button" className="btn btn-success btn-lg" onClick={this.connectToSpotify}>Connect to Spotify <i className="fa fa-spotify"></i>
                </button>
              </div>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
