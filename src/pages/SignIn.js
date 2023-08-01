import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { login as userLogin } from "../services/userAuthApi";
import { useSelector, useDispatch } from "react-redux";
import {
  loginPending,
  loginSuccess,
  loginError,
  loginRemember,
} from "../features/LoginSlice";

import {
  isLoadingSelector,
  errorSelector,
  isRememberSelector,
  isAuthSelector,
} from "../utils/selectors";

/**
 * Component - SingIn
 * @returns {React.ReactElement} JSX.Element - SingIn component
 */
function SingIn() {
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);
  const isRemember = useSelector(isRememberSelector);
  const isAuth = useSelector(isAuthSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credientials, setCredientials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuth) {
      navigate("/profile");
    }
  }, [isAuth, navigate, dispatch]);

  function handleChange({ currentTarget }) {
    const { value, name } = currentTarget;
    setCredientials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // login is on progresss
    dispatch(loginPending());
    try {
      const isAuth = await userLogin(credientials);

      if (isAuth) {
        dispatch(loginSuccess());
        navigate("/profile");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(loginError(error.response.data.message));
      } else {
        // If the error doesn't have a response or data property, handle it differently
        console.log("Unexpected error:", error);
        dispatch(loginError("invalid or empty value with login or password"));
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
                onChange={() => dispatch(loginRemember(!isRemember))}
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
