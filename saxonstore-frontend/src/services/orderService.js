import axios from "axios";
import baseURL from "./apiConfig";

const addAuthHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const placeOrder = async (order, token) => {
  return await axios.post(`${baseURL}/order`, order, addAuthHeader(token));
};

export const getAllOrders = async (token) => {
  return await axios.get(`${baseURL}/order`, addAuthHeader(token));
};

export const getAllCustomerOrders = async (userId, token) => {
  return await axios.get(
    `${baseURL}/order/customer/${userId}`,
    addAuthHeader(token),
  );
};

export const updateOrder = async (orderId, updatedStatus, token) => {
  return await axios.put(
    `${baseURL}/order/${orderId}`,
    updatedStatus,
    addAuthHeader(token),
  );
};
