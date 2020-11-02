import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import Player from "../components/Player";
import ArtistCard from "../components/ArtistCard";
import queryString from "query-string";
import API from "../utils/API";
import axios from "axios";

function Artists(props) {
	const [recommendedArtists, setRecommended] = useState("");
	const [isPlaying, setPlaying] = useState(true);
	const [artist, setArtist] = useState({});

	useEffect(() => {
		console.log(props.user)
		console.log(":::::TOKEN:::::")
		console.log(props.user.accessToken);
		// const _token = queryString.parse(props.location.search).code;

		if(props.user.accessToken) {
			console.log(":::::TOKEN 2:::::")
			console.log(props.user.accessToken);
			getRecommendedArtists(props.user.accessToken);
		} else {
			// Redirect back to Home
		}
	}, [props.user]);

	useEffect(() => {
		console.log(artist);
	}, [artist])

	const listenToArtist = artistClicked => {
		let accessToken = props.user.accessToken;

		// Make a call using the token
		const headers = {
			"Authorization": "Bearer " + accessToken
		};

		console.log("Artist:");
		console.log(artistClicked);

		

		axios.get(`https://api.spotify.com/v1/artists/${artistClicked.id}/top-tracks?country=SE`, { headers })
			.then(res => {
				console.log(res.data.tracks);

				setArtist({
					id: artistClicked.id,
					name: artistClicked.name,
					image: res.data.tracks[0].album.images[0].url,
					track: res.data.tracks[0].name
				});

				// axios.put("https://api.spotify.com/v1/me/player/play", { headers })
				// .then(res => {
					
				// });
			});
	}

	const getRecommendedArtists = accessToken => {
		// Make a call using the token
		const headers = {
			"Authorization": "Bearer " + accessToken
		};

		let topArtists = [];
		let relatedArtists = [];

		axios.get("https://api.spotify.com/v1/me/", { headers })
			.then(res => {
				const data = res.data;
				console.log("User:");
				console.log(data);

				axios.get("https://api.spotify.com/v1/me/top/artists/?time_range=long_term&limit=50", { headers })
					.then(res => {
						const data = res.data;
						console.log("Top Artists:");
						topArtists = data.items;

						const artistArr = topArtists.map(topArtist => topArtist.name);

						console.log(artistArr);
						//console.log("https://api.spotify.com/v1/artists/" + topArtists[0].id + "/related-artists");

						topArtists.map(topArtist => {
							axios.get("https://api.spotify.com/v1/artists/" + topArtist.id + "/related-artists", { headers })
								.then(res => {
									//console.log("Related Artists:");

									relatedArtists = relatedArtists.concat(res.data.artists);
									//console.log(relatedArtists);

									if(relatedArtists.length >= 1000) {
										console.log("-----------------");
										console.log(relatedArtists);

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

										setRecommended(recommendedArtists);
									}
								})
								.catch(err => console.log(err));
						});
					})
					.catch(err => console.log(err));
			})
			.catch(err => console.log(err));
	}

	const backToArtists = () => {
		console.log("Back to artists");
		setArtist({});
	}

	return (
		<Container>
			<button className="btn btn-primary">Rescan <i class="fa fa-refresh" aria-hidden="true"></i></button>
			<Row>
				<Col size="md-12">
					<Jumbotron>
					{ Object.keys(artist).length === 0 ?
						<Row>
							{recommendedArtists.length > 0 && recommendedArtists.map(item =>
							<Col key={item.id} size="md-4">
								<ArtistCard
									id={item.id}
									name={item.name}
									image={item.images[0].url}
									listenToArtist={listenToArtist}
								/>
							</Col>
							)}
						</Row>
					:
					<Player id={artist.id} artist={artist.name} track={artist.track} image={artist.image} isPlaying={isPlaying} backToArtists={backToArtists} />
					}
					</Jumbotron>
				</Col>
			</Row>
		</Container>
	);
}

export default Artists;
