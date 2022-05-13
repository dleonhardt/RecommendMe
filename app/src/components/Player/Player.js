import React from 'react';
import './Player.css';

const isPlaying = false;

const Player = ({ artist, backToHome }) =>
		<>
			<button className='btn btn-primary' onClick={backToHome}>Back</button>
			<section>
				<h3 className='trackTitle'></h3>
				<h4 className='artistName'>{artist.name}</h4>
			</section>
			<section className='card album-card'><img src={artist.image} /></section>
			<section>
				<button className='btn'>{isPlaying ? 'Playing' : 'Paused'}</button>
				<div className='progress'>
					<div className='progressBar' />
				</div>
			</section>
			<div className='background' />
		</>;

export default Player;