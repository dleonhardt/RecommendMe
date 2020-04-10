import React, { Component } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
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
			recommendedArtists: []
		};

		this.getRecommendedArtists = this.getRecommendedArtists.bind(this);
	}

	getRecommendedArtists(token) {
		// Make a call using the token
		const headers = {
			"Authorization": "Bearer " + token
		};

		let topArtists = [];
		let relatedArtists = [];

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

				axios.get("https://api.spotify.com/v1/me/top/artists/?time_range=long_term&limit=50", { headers })
					.then(res => {
						const data = res.data;
						console.log("Top Artists:");
						topArtists = data.items

						const artistArr = topArtists.map(artist => artist.name);

						console.log(artistArr);
						//console.log("https://api.spotify.com/v1/artists/" + topArtists[0].id + "/related-artists");

						topArtists.map(artist => {
							axios.get("https://api.spotify.com/v1/artists/" + artist.id + "/related-artists", { headers })
								.then(res => {
									//console.log("Related Artists:");

									relatedArtists = relatedArtists.concat(res.data.artists);
									//console.log(relatedArtists);

									if(relatedArtists.length >= 1000) {
										console.log("-----------------");

										// check if an element exists in array using a comparer function
										// comparer : function(currentElement)
										Array.prototype.inArray = function(comparer) { 
											for(var i=0; i < this.length; i++) { 
												if(comparer(this[i])) return true; 
											}
											return false; 
										}; 

										// adds an element to the array if it does not already exist using a comparer 
										// function
										Array.prototype.pushIfNotExist = function(element, comparer) { 
											if (!this.inArray(comparer)) {
												this.push(element);
											}
										};
										
										let onlyNewArtists = [];

										for(let i = 0; i < relatedArtists.length; i++) {
											for(let j = 0; j < artistArr.length; j++) {
												if(relatedArtists[i].name === artistArr[j]) {
													console.log("|||||||||||||||||||||||||||");
													console.log("i: " + relatedArtists[i].name);
													console.log("j: " + artistArr[j]);
													console.log("|||||||||||||||||||||||||||");
													break;
												}

												if(j === topArtists.length - 1) {
													onlyNewArtists.push(relatedArtists[i]);
												}
											}
										}

										console.log("***********");
										console.log(onlyNewArtists);
										console.log("***********");

										let recommendedArtists = [];

										for(let i = 0; i < onlyNewArtists.length; i++) {
											recommendedArtists.pushIfNotExist(onlyNewArtists[i], function(e) {
												return e.name === onlyNewArtists[i].name;
											});
										}

										console.log("Recommended Artists:");
										console.log(recommendedArtists);

										this.setState({
											recommendedArtists: recommendedArtists
										});
									}
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

			this.getRecommendedArtists(_token);
		}
	}

	render() {
		return (
			<Container>
				<Row>
					<Col size="md-12">
						<Jumbotron>
							<h2>{this.state.displayName}</h2>
							<p>Email: {this.state.email}</p>
							<p>Country: {this.state.country}</p>
							<Row>
								{this.state.recommendedArtists.map(artist =>
								<Col size="md-4">
									<Card name={artist.name} image={artist.images[0].url} />
								</Col>
								)}
							</Row>
						</Jumbotron>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default User;
