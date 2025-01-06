import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  isLoginPage: false,
  isSignupPage: false,
  isSubscriptionPage: false,
  navDropdown: false,
  error: null,
  data: [],
};

const webSlice = createSlice({
  name: "web",
  initialState,
  reducers: {
    toggleLoginPage(state) {
      state.isLoginPage = !state.isLoginPage;
    },
    toggleSignupPage(state) {
      state.isSignupPage = !state.isSignupPage;
    },
    toggleSubscriptionPage(state) {
      state.isSubscriptionPage = !state.isSubscriptionPage;
    },
    toggleNavDropdown(state) {
      state.navDropdown = !state.navDropdown;
    },
    falseNavDropdown(state) {
      state.navDropdown = false;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setData(state, action) {
      state.data = action.payload;
    },
  },
});

export const {
  toggleLoginPage,
  toggleSignupPage,
  toggleSubscriptionPage,
  toggleNavDropdown,
  falseNavDropdown,
  setError,
  clearError,
} = webSlice.actions;

export default webSlice.reducer;
