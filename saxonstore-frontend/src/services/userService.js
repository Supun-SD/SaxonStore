import axios from "axios";
import baseURL from "./apiConfig";

export const login = async (credentials) => {
  return await axios.post(`${baseURL}/users/login`, credentials);
};

export const register = async (data) => {
  return await axios.post(`${baseURL}/users/createUser`, data);
};

export const update = async (data, userId, token) => {
  return await axios.put(`${baseURL}/users/update/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const forgotPassword = async (email) => {
  return await axios.post(`${baseURL}/users/forgotPassword`, {
    email: email,
    returnUrl: "http://localhost:3000/sign-in",
  });
};

export const resetPassword = async (data) => {
  return await axios.post(`${baseURL}/users/resetPassword`, data);
};
