import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { login as userLogin } from "../services/userAuthApi";
import { useSelector, useDispatch } from "react-redux";
import {
  logingPending,
  logingSuccess,
  logingError,
  logingRemember,
} from "../features/LoginSlice";

/**
 * Component - SingIn
 * @returns {React.ReactElement} JSX.Element - SingIn component
 */
function SingIn() {
  const { isLoading, error, isRemember, isAuth } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credientials, setCredientials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(logingSuccess());
      if (isAuth) {
        navigate("/profile");
      }
    }
  }, [dispatch, isAuth, navigate]);

  function handleChange({ currentTarget }) {
    const { value, name } = currentTarget;
    setCredientials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(logingPending());
    try {
      const isAuth = await userLogin(credientials);
      console.log("isAuth:", isAuth);

      if (isAuth) {
        dispatch(logingSuccess());
        navigate("/profile");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(logingError(error.response.data.message));
      } else {
        // If the error doesn't have a response or data property, handle it differently
        console.log("Unexpected error:", error);
        dispatch(logingError("invalid or empty value with login or password"));
      }
    }
  }

  return (
    <>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                defaultChecked={isRemember}
                onChange={() => dispatch(logingRemember(!isRemember))}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <Button type="submit" variant="success" className="sign-in-button">
              Sign In
            </Button>
            {isLoading && (
              <div className="spinner-border text-success mt-1" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </form>
        </section>
      </main>
    </>
  );
}

export default SingIn;
