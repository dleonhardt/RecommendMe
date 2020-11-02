import React from "react";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <a className="navbar-brand" href="/">
        Recommend.Me
      </a>
      <a href="/logout">Logout</a>
    </nav>
  );
}

export default Nav;
