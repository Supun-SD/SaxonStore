import { createSlice } from "@reduxjs/toolkit";

const initialStateUser = {
  user: null,
  isAuthenticated: false,
  token: null,
  role: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.user.role;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
    },
    updateUser(state, action) {
      const updatedInfo = action.payload;
      if (state.user) {
        state.user = {
          ...state.user,
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
