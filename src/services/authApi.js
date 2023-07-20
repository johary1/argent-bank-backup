import axios from "axios";
import jwtDecode from "jwt-decode";
const URL_LOGIN = "http://localhost:3001/api/v1/user/login";
export async function login(credentials) {
  try {
    const response = await axios.post(URL_LOGIN, credentials);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + response.data.body.token;
    const { token } = response.data.body;
    localStorage.setItem("authToken", token);

    return isAuthenticated();
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred while logging in"
    );
  }
}

function isAuthenticated() {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    console.log("hereeeee:  " + token);
    const { exp } = jwtDecode(token);
    if (exp * 1000 > new Date().getTime()) {
      return true;
    } else {
      // Token is expired
      localStorage.removeItem("authToken");
      delete axios.defaults.headers.common["Authorization"];
    }
  }
  return false;
}

const authAPI = {
  isAuthenticated,
};
export default authAPI;
