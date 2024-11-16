import axios from "axios";
import baseURL from "./apiConfig";

export const placeOrder = async (order) => {
  return await axios.post(`${baseURL}/orders`, order);
};

export const getAllOrders = async () => {
  return await axios.get(`${baseURL}/order`);
};
