import React from "react";
import { Link } from "react-router-dom";
import argentBankLogo from "../img/argentBankLogo.png";
import { useSelector, useDispatch } from "react-redux";
import { loginOut } from "../features/LoginSlice";
import { profileOut } from "../features/ProfileSlice";
import { isAuthSelector, firstNameSelector } from "../utils/selectors";

const Header = () => {
  const isAuth = useSelector(isAuthSelector);
  const firstName = useSelector(firstNameSelector);
  //console.log(firstName + "herrrrrree");
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Remove the authToken from local storage on logout
    localStorage.removeItem("authToken");
    // Dispatch the logingOut action to clear the authentication status in Redux
    dispatch(loginOut());
    // Dispatch the profileOut action to clear the profile data in Redux
    dispatch(profileOut());
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
          {isAuth ? (
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
