import React from "react";
import "./ArtistCard.css";

const ArtistCard = (props) => {
    return (
        <section className="card" key={props.id} onClick={() => props.listenToArtist({ id: props.id, name: props.name, image: props.image })}>
            <section className="card-bg"></section>
            <h5 className="card-title">{props.name}</h5>
            <img src={props.image} className="img-fluid" />
        </section>
    );
}

export default ArtistCard;