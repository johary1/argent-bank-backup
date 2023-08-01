import axios from "axios";
import jwtDecode from "jwt-decode";
//todo move in a config file
const BASE_URL = "http://localhost:3001/api/v1/user";
const URL_LOGIN = BASE_URL + "/login";
const URL_PROFILE = BASE_URL + "/profile";

// Function to store token in local storage and set token expiration time in cookies
const setTokenInLocalStorage = (token) => {
  localStorage.setItem("authToken", token);
  const expirationTime = new Date();
  expirationTime.setTime(expirationTime.getTime() + 3 * 60 * 60 * 1000); // 3 hours
  document.cookie = `authToken=${token};expires=${expirationTime.toUTCString()};path=/`;
};

// Function to get the token from local storage
export const getTokenFromStorage = () => {
  return localStorage.getItem("authToken");
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
  const token = getTokenFromStorage();
  if (token) {
    const { exp } = jwtDecode(token);
    return exp * 1000 > new Date().getTime();
  }
  return false;
};

// Axios instance with interceptor to handle token authentication
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromStorage();
    if (token) {
      const { exp } = jwtDecode(token);
      if (exp * 1000 > new Date().getTime()) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        // Token has expired, remove it from storage and cookies
        localStorage.removeItem("authToken");
        document.cookie =
          "authToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
        delete axiosInstance.defaults.headers.common["Authorization"];
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to handle login and get token from API call
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post(URL_LOGIN, credentials);
    const { token } = response.data.body;
    setTokenInLocalStorage(token);
    return isAuthenticated();
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred while logging in"
    );
  }
};

// Function to get user data used in profile page
export const userDatas = async () => {
  try {
    const res = await axiosInstance.post(URL_PROFILE);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Function to update user's first and last name
export const userUpdate = async (userFirstLastName) => {
  try {
    const res = await axiosInstance.put(URL_PROFILE, userFirstLastName);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Exporting the authentication functions
const authAPI = {
  isAuthenticated,
  login,
};

export default authAPI;
