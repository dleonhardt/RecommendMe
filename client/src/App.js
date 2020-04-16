import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Artists from "./pages/Artists";
import API from "./utils/API";
import "./style.css";

function App() {
	const [user, setUser] = useState({});

	const getUser = () => {
		API.getUser()
			.then(res => {
				setUser(res.data);
				console.log("USER!");
				console.log(user);
			})
			.catch(err => console.log(err));
	}

	useEffect(() => {
		getUser();
	}, []);

	return (
		<Router>
			<>
				<Nav />
				<Switch>
					<Redirect from="/logout" to="/" />
					<Route exact path="/" component={Home} />
					<Route exact path="/callback" render={() => <Artists user={user} getUser={getUser} /> } />
					<Route exact path="/auth/spotify/callback"  render={() => <Artists user={user} getUser={getUser} /> } />
				</Switch>
			</>
		</Router>
	);
}
export default App;