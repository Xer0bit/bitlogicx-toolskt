"use client";

import { useState, useEffect } from "react";
import { IoMdSpeedometer } from "react-icons/io";
import { AiOutlineSwap } from "react-icons/ai";

export default function SpeedConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Meters per Second");
  const [toUnit, setToUnit] = useState("Meters per Second");
  const [outputValue, setOutputValue] = useState("");

  // Conversion factors relative to meters per second
  const conversionFactors = {
    "Meters per Second": 1,
    "Kilometers per Hour": 3.6, // 1 m/s = 3.6 km/h
    "Miles per Hour": 2.23694, // 1 m/s = 2.23694 mph
    "Feet per Second": 3.28084, // 1 m/s = 3.28084 ft/s
    Knots: 1.94384, // 1 m/s = 1.94384 knots
    Mach: 0.002938, // 1 m/s = 0.002938 mach (at 20°C)
    "Light Speed": 3.33564e-9, // 1 m/s = 3.33564e-9 light speed
    "Speed of Sound": 0.002867, // 1 m/s = 0.002867 speed of sound (at sea level, 20°C)
  };

  useEffect(() => {
    if (inputValue === "" || isNaN(inputValue)) {
      setOutputValue("");
      return;
    }

    const valueInMetersPerSecond =
      parseFloat(inputValue) / conversionFactors[fromUnit];
    const convertedValue = valueInMetersPerSecond * conversionFactors[toUnit];
    setOutputValue(convertedValue.toFixed(6)); // Round to 6 decimal places
  }, [inputValue, fromUnit, toUnit]);

  const handleSwap = () => {
    setFromUnit((prev) => {
      setToUnit(prev);
      return toUnit;
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <div className="text-left">
          <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
            <IoMdSpeedometer className="text-4xl text-[#FF6347]" />
            <h2 className="text-gray-900">Speed Converter</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Convert between different speed units using the fields below.
          </p>
        </div>
        <div className="flex flex-col gap-10">
          <div className="w-full md:gap-32 flex flex-col lg:flex-row items-center">
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium">
                From Unit
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2"
              >
                {Object.keys(conversionFactors).map((unit) => (
                  <option key={unit}>{unit}</option>
                ))}
              </select>
            </div>

            <AiOutlineSwap
              onClick={handleSwap}
              className="text-7xl cursor-pointer h-fit mt-6 text-[#FF6347]"
            />
            <div className="w-full">
              <label className="block mb-1 text-sm font-medium">To Unit</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2"
              >
                {Object.keys(conversionFactors).map((unit) => (
                  <option key={unit}>{unit}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            <div className="w-full lg:w-1/2">
              <label className="block mb-1 text-sm font-medium">
                Input Value
              </label>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2"
                placeholder="Enter value"
              />
            </div>

            <div className="w-full lg:w-1/2">
              <label className="block mb-1 text-sm font-medium">
                Converted Value
              </label>
              <input
                type="text"
                value={outputValue}
                readOnly
                className="w-full rounded-md border border-gray-300 bg-gray-100 p-2"
                placeholder="Result"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
