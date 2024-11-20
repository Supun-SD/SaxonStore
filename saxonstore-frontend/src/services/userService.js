import axios from "axios";
import baseURL from "./apiConfig";

export const login = async (credentials) => {
  return await axios.post(`${baseURL}/user/login`, credentials);
};

export const register = async (data) => {
  return await axios.post(`${baseURL}/user/createUser`, data);
};

export const update = async (data, userId, token) => {
  return await axios.put(`${baseURL}/user/update/${userId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const forgotPassword = async (email) => {
  return await axios.post(`${baseURL}/user/forgotPassword`, {
    email: email,
    returnUrl: "http://localhost:3000/reset-password",
  });
};

export const resetPassword = async (data) => {
  return await axios.post(`${baseURL}/user/resetPassword`, data);
};
