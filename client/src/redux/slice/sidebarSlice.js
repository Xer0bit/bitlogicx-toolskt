// redux/slice/sidebarSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeComponent: null,
  isPagesOpen: false,
  isUsersOpen: false,
  isToolsOpen: false,
  isPlansOpen: false,
  isSubscriptionsOpen: false,
  isSettingsOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setActiveComponent(state, action) {
      state.activeComponent = action.payload;
    },
    toggleDropdown(state, action) {
      const dropdown = action.payload;
      state.isPagesOpen = dropdown === "pages" ? !state.isPagesOpen : false;
      state.isUsersOpen = dropdown === "users" ? !state.isUsersOpen : false;
      state.isToolsOpen = dropdown === "tools" ? !state.isToolsOpen : false;
      state.isPlansOpen = dropdown === "plans" ? !state.isPlansOpen : false;
      state.isSubscriptionsOpen =
        dropdown === "subscriptions" ? !state.isSubscriptionsOpen : false;
      state.isSettingsOpen =
        dropdown === "settings" ? !state.isSettingsOpen : false;
    },
  },
});

export const { setActiveComponent, toggleDropdown } = sidebarSlice.actions;

export default sidebarSlice.reducer;
