import React from "react";
import "./Player.css";

function Player(props) {
	return (
		<>
			<button className="btn btn-primary" onClick={props.backToArtists}>Back</button>
			<section className="card album-card">
				<img src={props.image} />
			</section>
			<section>
				<h3 className="trackTitle">{props.track}</h3>
				<h4 className="artistName">{props.artist}</h4>
				<button className="btn" onClick={props.togglePlay}>{props.isPlaying ? "Playing" : "Paused"}</button>
				<div className="progress">
					<div className="progressBar" />
				</div>
			</section>
			<div className="background" />
		</>
	);
}

export default Player;