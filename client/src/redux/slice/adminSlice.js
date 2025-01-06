// redux/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loginSuccess, logout } = adminSlice.actions;
export default adminSlice.reducer;
