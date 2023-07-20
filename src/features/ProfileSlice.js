// Import the createSlice function from the Redux Toolkit library
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the profile slice
const initialState = {
  isLoading: false, // Indicates whether profile data is being loaded
  firstName: "", // User's first name
  lastName: "", // User's last name
  error: "", // Error message in case of an error while loading profile data
};

// Create a slice of the global state called "profile"
const ProfileSlice = createSlice({
  name: "profile", // Name of the slice
  initialState, // Initial state of the slice
  reducers: {
    // Reducers to handle actions related to the profile
    profilePending: (state) => {
      // Action to indicate that profile data is being loaded
      state.isLoading = true;
    },
    profileFirstName: (state, action) => {
      // Action to update the user's first name
      state.isLoading = false;
      state.firstName = action.payload; // The first name is passed as the payload of the action
      state.error = "";
    },
    profileLastName: (state, action) => {
      // Action to update the user's last name
      state.isLoading = false;
      state.lastName = action.payload; // The last name is passed as the payload of the action
      state.error = "";
    },
    profileError: (state, action) => {
      // Action to handle errors while loading profile data
      state.isLoading = false;
      state.error = action.payload; // The error message is passed as the payload of the action
    },
    profileOut: (state) => {
      // Action to reset profile data
      state.isLoading = false;
      state.firstName = "";
      state.lastName = "";
      state.error = "";
    },
  },
});

// Destructure the slice into actions and reducer
const { actions, reducer } = ProfileSlice;

// Export the actions to be used in other parts of the application
export const {
  profilePending,
  profileFirstName,
  profileLastName,
  profileError,
  profileOut,
} = actions;

// Export the reducer to be used in the global Redux store
export default reducer;
