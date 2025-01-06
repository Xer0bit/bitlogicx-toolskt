"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const timeOptions = Array.from({ length: 96 }, (_, i) => {
  const hours = Math.floor(i / 4);
  const minutes = (i % 4) * 15;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
});

export default function TimeSlider({ label, onChange, value }) {
  const [sliderValue, setSliderValue] = useState(value);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSliderValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="range"
        min="0"
        max="95"
        value={sliderValue}
        onChange={handleChange}
        className="w-full"
      />
      <div className="text-center mt-2">{timeOptions[sliderValue]}</div>
    </div>
  );
}
