import React from "react";
import "./ArtistCard.css";

const ArtistCard = props => {
    return (
        <section className="artist" onClick={() => props.selectArtist(props)}>
            <section className="artist-bg"></section>
            <h5 className="artist-name">{props.name}</h5>
            <img src={props.image} className="img-fluid" />
        </section>
    );
}

export default ArtistCard;