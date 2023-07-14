import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/authActions";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = (event) => {
    event.preventDefault();

    // Perform authentication and dispatch login action
    dispatch(login());
    navigate("/profile");
  };

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" autoComplete="off" />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" autoComplete="off" />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">
          Sign In
        </button>
      </form>
    </section>
  );
};

export default SignInForm;
