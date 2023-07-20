import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../src/features/LoginSlice";
import profileReducer from "../src/features/ProfileSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
  },
});

export default store;
