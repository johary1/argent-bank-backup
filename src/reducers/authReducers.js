import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actions/authActions";

const initialState = {
  isAuthenticated: false,
  user: { firstName: "", lastName: "" },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
