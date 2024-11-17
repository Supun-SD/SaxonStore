import { createSlice } from "@reduxjs/toolkit";

const initialStateUser = {
  userDetails: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    login(state, action) {
      state.userDetails = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.userDetails = null;
      state.isAuthenticated = false;
    },
    updateUser(state, action) {
      const updatedInfo = action.payload;
      if (state.userDetails) {
        state.userDetails = {
          ...state.userDetails,
          ...updatedInfo,
        };
      }
    },
    clearUser(state) {
      state.userDetails = null;
      state.isAuthenticated = false;
    },
  },
});

export default userSlice.reducer;

export const { login, logout, updateUser, clearUser } = userSlice.actions;
