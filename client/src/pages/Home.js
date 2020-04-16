import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import hash from "../utils/hash";

function Home() {
  const [token, setToken] = useState("");

  let baseUrl = "";

  // This is a hack to get around the fact that our backend server
  // that Spotify needs to call back to is on a different port
  // than our front end when we're running in development mode
  if(!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    baseUrl = "http://localhost:3001";
  }

  useEffect(() => {
    if(hash.access_token) {
      setToken(hash.access_token);
    }
  });

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <div className="text-center">
              <h1>Recommend.me</h1>
              <br />
              <a className="btn btn-success btn-lg" href={`${baseUrl}/auth/spotify`}>Login to Spotify <i className="fa fa-spotify"></i></a>
            </div>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
