import axios from "axios";
import baseURL from "./apiConfig";

export const getAllSizes = async (token) => {
  return await axios.get(`${baseURL}/size`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
