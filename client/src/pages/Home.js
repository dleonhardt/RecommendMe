import React, { useState, useEffect } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { Redirect } from "react-router-dom";
import hash from "../utils/hash";
import API from "../utils/API";

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

  // const loginSpotify = () => {
  //   API.connect()
  //     .then(res => console.log(res))
  //     .catch(e => console.log(e));
  // }

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <div className="text-center">
              <h1>Recommend.me</h1>
              <br />
              {!token ? (
                // <button className="btn btn-success btn-lg" onClick={loginSpotify}>Login to Spotify <i className="fa fa-spotify"></i></button>
                <a className="btn btn-success btn-lg" href={`${baseUrl}/auth/spotify`}>Login to Spotify <i className="fa fa-spotify"></i></a>
              ) : (
                <Redirect to="/callback" />
              )}
            </div>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
