import axios from "axios";
import baseURL from "./apiConfig";

export const getProductsByCategory = async (category, subcategory) => {
  return await axios.get(
    `${baseURL}/product/filter/byCategory?category=${category}&subcategory=${subcategory}`,
  );
};

export const getProductsByName = async (name) => {
  return await axios.get(
    `${baseURL}/product/filter/byName/${name}`,
  );
};

export const getNewArrivals = async () => {
  return await axios.get(`${baseURL}/product/filter/newArrivals`);
};
