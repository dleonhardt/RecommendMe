import React from "react";
import "./Button.css";

const Button = ({ children, href }) => {
	return !href ? <button type="button" className="btn">{children}</button> : <a href={href} type="button" className="btn">{children}</a>
};

export default Button;