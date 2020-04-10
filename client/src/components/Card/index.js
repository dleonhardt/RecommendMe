import React from "react";
import "./style.css";

function Card(props) {
    return (
        <section className="card">
            <h5 className="card-title">{props.name}</h5>
            <img src={props.image} className="img-fluid" />
        </section>
    );
}

export default Card;