import React from "react";
import "./style.css";

function Card(props) {
    return (
        <section className="card" key={props.id} onClick={() => props.listenToArtist(props.id)}>
            <section className="card-bg"></section>
            <h5 className="card-title">{props.name}</h5>
            <img src={props.image} className="img-fluid" />
        </section>
    );
}

export default Card;