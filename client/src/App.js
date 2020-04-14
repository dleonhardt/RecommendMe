import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import User from "./pages/User";
import "./style.css";

function App() {
    return (
      <BrowserRouter>
        <>
          <Nav />
          <Switch>
              <Redirect from="/auth/spotify/callback" to="/callback" />
              <Route exact path="/" component={Home} />
              <Route path="/callback" component={User} />
          </Switch>
        </>
      </BrowserRouter>
    );
}
export default App;