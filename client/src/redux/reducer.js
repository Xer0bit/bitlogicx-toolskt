import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import webSlice from "./slice/webSlice";
import sidebarSlice from "./slice/sidebarSlice";
import timeSlice from "./slice/timeSlice";
import adminSlice from "./slice/adminSlice";
const rootReducer = combineReducers({
  user: userReducer,
  web: webSlice,
  sidebar: sidebarSlice,
  time: timeSlice,
  admin: adminSlice, // Add your other reducers here if needed  // Example: admin: adminSlice,  //...  // Add your other reducers here if needed  // Example: admin: adminSlice,  //...  // Add your other reducers here if needed  // Example: admin: adminSlice,  //...  // Add your other reducers here if needed  // Example: admin: adminSlice,  //...  // Add your other reducers
});

export default rootReducer;
