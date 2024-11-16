import { createSlice } from "@reduxjs/toolkit";

const initialStateCart = {
  cartItems: [],
  cartTotal: 0.0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialStateCart,
  reducers: {
    addProduct(state, action) {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) =>
          item.productVariantId === product.productVariantId &&
          item.size === product.size &&
          item.color === product.color,
      );

      if (existingItem) {
        existingItem.quantity += product.quantity;
      } else {
        state.cartItems.push(product);
      }

      state.cartTotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },
    updateCartItem(state, action) {
      const { id, quantity, color, size } = action.payload;
      const itemToUpdate = state.cartItems.find(
        (item) => item.id === id && item.size === size && item.color === color,
      );

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }

      state.cartTotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },
    removeCartItem(state, action) {
      const { id, color, size } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(item.id === id && item.size === size && item.color === color),
      );

      state.cartTotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },
    clearCart(state) {
      state.cartItems = [];
      state.cartTotal = 0;
    },
  },
});

export default cartSlice.reducer;

export const { addProduct, updateCartItem, removeCartItem, clearCart } =
  cartSlice.actions;
