import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { profileFirstName } from "../features/ProfileSlice";
import setAuthStatus from "../features/LoginSlice"; // Import the updated loginSlice actions.

const LogIn = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.login);
  const { firstName } = useSelector((state) => state.profile);
  const localStorageFirstName = localStorage.getItem("firstName");
  const localStorageAuthToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (localStorageAuthToken) {
      dispatch(setAuthStatus(true));
      dispatch(profileFirstName(localStorageFirstName));
    }
  }, [dispatch, localStorageAuthToken, localStorageFirstName]);

  return (
    <>
      {isAuth ? (
        <Link className="main-nav-link" to="/profile">
          <i className="fa fa-user-circle"></i>
          {firstName}
        </Link>
      ) : (
        <Link className="main-nav-link" to="/login">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      )}
    </>
  );
};

export default LogIn;
