import axios from "axios";

const BASE_URL = "http://localhost:3001/api/v1/user";

const URL_LOGIN = BASE_URL + "/login";
// eslint-disable-next-line
const URL_SINGUP = BASE_URL + "/signup";
const URL_PROFILE = BASE_URL + "/profile";

// store token in local storage
const setTokenInLocalStorage = (token) => {
  localStorage.setItem("token", token);
};

/**
 * Function to get user data profile
 *
 */
export const userDatas = async () => {
  try {
    const res = await axios.post(URL_PROFILE);
    return res.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Function to get user data login
 * @param {Object} credentials user's credentials
 * @param {String} credentials.email user's email
 * @param {String} credentials.password user's password
 *
 */
export const userLogin = async (credentials) => {
  try {
    const res = await axios.post(URL_LOGIN, credentials);
    const token = res.data.body.token;
    console.log("ici" + token);
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setTokenInLocalStorage(token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
    return res.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Function to update user's first and last name
 * @param {Object} userFirstLastName
 * @param {String} userFirstLastName.firstName user's first name
 * @param {String} userFirstLastName.lastName user's last name
 * @returns {Promise<any>} Promise with user data
 */
export const userUpdate = async (userFirstLastName) => {
  try {
    const res = await axios.put(URL_PROFILE, userFirstLastName);
    return res.data;
  } catch (error) {
    throw error;
  }
};
