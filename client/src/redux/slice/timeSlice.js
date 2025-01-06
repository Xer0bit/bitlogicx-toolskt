// store/timeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fromTime: { hours: 12, minutes: 0, ampm: "AM" }, // This will always be at 12 AM
  toTime: { hours: 12, minutes: 0, ampm: "AM" }, // This value is dynamic and comes from backend API
  slide: 0, // The sliding value, to synchronize sliders
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setFromTime: (state, action) => {
      state.fromTime = action.payload;
    },
    setToTime: (state, action) => {
      state.toTime = action.payload;
    },
    setSlide: (state, action) => {
      state.slide = action.payload;
    },
  },
});

export const { setFromTime, setToTime, setSlide } = timeSlice.actions;
export default timeSlice.reducer;
