import axios from "axios";

const baseUrl = "http://localhost:3001/api/v1";

const login = async (email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const signup = async (firstName, lastName, email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/user/signup`, {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getProfile = async () => {
  try {
    const response = await axios.post(`${baseUrl}/user/profile`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (firstName, lastName) => {
  try {
    const response = await axios.put(`${baseUrl}/user/profile`, {
      firstName,
      lastName,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getToken = async () => {
  try {
    const response = await axios.get(`${baseUrl}/user/token`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = { login, signup, getProfile, updateProfile, getToken };
