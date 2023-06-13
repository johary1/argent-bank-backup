import React from "react";
import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <nav className="main-nav">
      <Link to="/">
        <img
          className="main-nav-logo-image"
          src="./argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link to="/user" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Tony
        </Link>
        <Link to="/" className="main-nav-item">
          <i className="fa fa-sign-out"></i>
          Sign Out
        </Link>
      </div>
    </nav>
  );
};

export default MainNav;
