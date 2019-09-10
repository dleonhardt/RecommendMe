import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import User from "./pages/User";
import "./style.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/callback" component={User} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;