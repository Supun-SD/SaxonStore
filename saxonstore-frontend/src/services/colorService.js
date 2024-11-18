import axios from "axios";
import baseURL from "./apiConfig";

export const getAllColors = async (token) => {
  return await axios.get(`${baseURL}/color`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
