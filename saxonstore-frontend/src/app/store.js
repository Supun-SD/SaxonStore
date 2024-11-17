import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
