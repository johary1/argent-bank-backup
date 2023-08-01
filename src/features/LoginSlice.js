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
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
    },
    loginError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    loginRemember: (state, action) => {
      state.isRemember = action.payload;
    },
    loginOut: (state) => {
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
  loginPending,
  loginSuccess,
  loginError,
  loginOut,
  loginRemember,
  setAuthStatus,
  clearAuthStatus,
} = actions;

export default reducer;
