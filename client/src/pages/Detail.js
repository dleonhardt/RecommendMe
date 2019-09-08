import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Detail extends Component {
  state = {
    artist: {}
  };
  // When this component mounts, grab the artist with the _id of this.props.match.params.id
  // e.g. localhost:3000/artists/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getArtist(this.props.match.params.id)
      .then(res => this.setState({ artist: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {this.state.artist.name}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
