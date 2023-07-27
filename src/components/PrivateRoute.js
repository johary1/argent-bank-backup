import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuthStatus } from "../features/LoginSlice";
import { isAuthenticated } from "../services/userAuthApi";

/**
 * Component - PrivateRoute
 */
const PrivateRoute = () => {
  const dispatch = useDispatch();

  // Initialize the 'isAuth' state from local storage
  const storedAuthStatus = localStorage.getItem("authToken");
  const { isAuth } = useSelector((state) => state.login);

  useEffect(() => {
    // Check if the user is authenticated based on the token
    const authenticated = isAuthenticated(storedAuthStatus);

    // Set the authentication status in Redux if it's different from the current state
    if (authenticated) {
      dispatch(setAuthStatus(authenticated));
    }
  }, [dispatch, isAuth, storedAuthStatus]);

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
