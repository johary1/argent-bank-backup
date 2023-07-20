import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logingOut } from "../features/LoginSlice"; // Import the logingOut action from the loginSlice.
import { profileOut } from "../features/ProfileSlice"; // Import the profileOut action from the profileSlice.

const LogOut = () => {
  const { isAuth } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const clearLocalStorage = () => {
    localStorage.clear();
    dispatch(logingOut());
    dispatch(profileOut());
  };

  return (
    <>
      {isAuth && (
        <Link className="main-nav-item" onClick={clearLocalStorage} to="/">
          <i className="fa-solid fa-arrow-right-from-bracket" />
          Sign Out
        </Link>
      )}
    </>
  );
};

export default LogOut;
