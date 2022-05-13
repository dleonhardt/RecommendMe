import React from 'react';
import './ArtistCard.css';

const ArtistCard = ({ artist, setArtist }) => {
    return (
        <section className='artist' onClick={() => setArtist(artist)}>
            <section className='artist-bg'></section>
            <h5 className='artist-name'>{artist.name}</h5>
            <img src={artist.image} className='img-fluid' />
        </section>
    );
}

export default ArtistCard;