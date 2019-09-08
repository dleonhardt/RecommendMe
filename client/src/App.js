import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Artists from "./pages/Artists";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import style from "./style.css";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Artists} />
          <Route exact path="/artists" component={Artists} />
          <Route exact path="/artists/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
