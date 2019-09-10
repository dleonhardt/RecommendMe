import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import hash from "../utils/hash";
import axios from "axios";

class User extends Component {
	constructor() {
		super();

		this.state = {
			token: null,
			displayName: null,
			email: null,
			country: null,
			topArtists: [],
			relatedArtists: []
		};

		this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
	}

	getCurrentlyPlaying(token) {
		// Make a call using the token
		const headers = {
			"Authorization": "Bearer " + token
		};

		axios.get("https://api.spotify.com/v1/me/", { headers })
			.then(res => {
				const data = res.data;
				console.log("User:");
				console.log(data);
				this.setState({
					displayName: data.display_name,
					email: data.email,
					country: data.country
				});

				axios.get("https://api.spotify.com/v1/me/top/artists/?time_range=long_term", { headers })
					.then(res => {
						const data = res.data;
						console.log("Top Artists:");
						this.setState({
							topArtists: data.items
						});

						console.log(this.state.topArtists);
						console.log("https://api.spotify.com/v1/artists/" + this.state.topArtists[0].id + "/related-artists");

						this.state.topArtists.map(artist => {
							axios.get("https://api.spotify.com/v1/artists/" + artist.id + "/related-artists", { headers })
								.then(res => {
									console.log("Related Artists:");
									this.setState({
										relatedArtists: this.state.relatedArtists.concat(res.data.artists)
									});
								})
								.catch(err => console.log(err));
							});
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	}

	componentDidMount() {
		let _token = hash.access_token;

		if (_token) {
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
							<h2>{this.state.displayName}</h2>
							<p>Email: {this.state.email}</p>
							<p>Country: {this.state.country}</p>
							<ol>
								{this.state.topArtists.map(artist => (
								<li>{artist.name}</li>
								))}
							</ol>
							<ol>
								{this.state.relatedArtists.map(artist => (
								<li>{artist.name}</li>
								))}
							</ol>
						</Jumbotron>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default User;
