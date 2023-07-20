import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isAuth: false,
  isRemember: false,
  error: "",
};

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logingPending: (state) => {
      state.isLoading = true;
    },
    logingSuccess: (state) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
    },
    logingError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logingRemember: (state, action) => {
      state.isRemember = action.payload;
    },
    logingOut: (state) => {
      state.isAuth = false;
    },
    // New action to set the authentication status when the user logs in
    setAuthStatus: (state, action) => {
      state.isAuth = action.payload;
    },
    // New action to clear the authentication status and user data when the user logs out
    clearAuthStatus: (state) => {
      state.isAuth = false;
      state.isRemember = false;
    },
  },
});

const { actions, reducer } = LoginSlice;

export const {
  logingPending,
  logingSuccess,
  logingError,
  logingOut,
  logingRemember,
  setAuthStatus, // Export the new action
  clearAuthStatus, // Export the new action
} = actions;

export default reducer;
