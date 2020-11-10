import React from "react";
import Home from "./pages/Home";
import "./styles/base.css";
import "./styles/app.css";

function App() {
	// const [user, setUser] = useState({});

	// const getUser = () => {
	// 	API.getUser()
	// 		.then(res => {
	// 			setUser(res.data);
	// 			console.log("USER!");
	// 			console.log(user);
	// 		})
	// 		.catch(err => console.log(err));
	// }

	// useEffect(() => {
	// 	getUser();
	// }, []);

	return (
		// <Router>
		// 	<>
		// 		{/* <Nav /> */}
		// 		<Switch>
		// 			{/* <Redirect from="/logout" to="/" /> */}
		// 			<Route exact path={["/", "/callback"]} component={Home} />
		// 			{/* <Route exact path="/callback" render={() => <Artists user={user} getUser={getUser} />} /> */}
		// 			{/* <Route exact path="/auth/spotify/callback" render={() => <Artists user={user} getUser={getUser} />} /> */}
		// 		</Switch>
		// 	</>
		// </Router>
		<Home />
	);
}
export default App;