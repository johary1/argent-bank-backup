// Action types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

// Action creators
export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Async action creator for login
export const login = () => {
  return (dispatch) => {
    // Simulate an asynchronous login process
    setTimeout(() => {
      dispatch(loginSuccess());
    }, 1000);
  };
};

// Async action creator for logout
export const logout = () => {
  return (dispatch) => {
    // Simulate an asynchronous logout process
    setTimeout(() => {
      dispatch(logoutSuccess());
    }, 1000);
  };
};
