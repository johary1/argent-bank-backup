import { createSelector } from "reselect";

const getLoginState = (state) => state.login;
const getProfileFirstName = (state) => state.profile.firstName;
//console.log(getProfileFirstName);
export const isLoadingSelector = createSelector(
  [getLoginState],
  (loginState) => loginState.isLoading
);

export const errorSelector = createSelector(
  [getLoginState],
  (loginState) => loginState.error
);

export const isRememberSelector = createSelector(
  [getLoginState],
  (loginState) => loginState.isRemember
);

export const isAuthSelector = createSelector(
  [getLoginState],
  (loginState) => loginState.isAuth
);

export const firstNameSelector = createSelector(
  [getProfileFirstName],
  (firstName) => firstName
);
