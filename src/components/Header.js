import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import argentBankLogo from "../img/argentBankLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { logingOut } from "../features/LoginSlice";
import { profileOut } from "../features/ProfileSlice";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAuth } = useSelector((state) => state.login);
  const { firstName } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAuthenticated(isAuth);
  }, [isAuth]);

  const handleLogout = () => {
    localStorage.clear();
    // Dispatch the logingOut action to clear the authentication status in Redux
    dispatch(logingOut());

    // Clear the accessToken cookie by setting its expiration date to one hour from now
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 hour
    document.cookie = `authToken=; expires=${expirationDate.toUTCString()}; path=/;`;

    // Dispatch the profileOut action to clear the profile data in Redux
    dispatch(profileOut());
    setIsAuthenticated(false);
  };

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div className="auth-link">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="main-nav-link">
                <i className="fa fa-user-circle"></i>
                {firstName}
              </Link>
              <Link className="main-nav-item" to="/" onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket" />
                Sign Out
              </Link>
            </>
          ) : (
            <Link className="main-nav-link" to="/login">
              <i className="fa fa-user-circle"></i>
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
