"use client";

import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { AiOutlineSwap } from "react-icons/ai";

export default function TimeConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Seconds");
  const [toUnit, setToUnit] = useState("Seconds");
  const [outputValue, setOutputValue] = useState("");

  // Conversion factors relative to seconds
  const conversionFactors = {
    Seconds: 1,
    Milliseconds: 1e-3, // 1 millisecond = 0.001 seconds
    Microseconds: 1e-6, // 1 microsecond = 0.000001 seconds
    Nanoseconds: 1e-9, // 1 nanosecond = 0.000000001 seconds
    Picoseconds: 1e-12, // 1 picosecond = 0.000000000001 seconds
    Minutes: 1 / 60, // 1 minute = 60 seconds
    Hours: 1 / 3600, // 1 hour = 3600 seconds
    Days: 1 / 86400, // 1 day = 86400 seconds
    Weeks: 1 / 604800, // 1 week = 604800 seconds
    Fortnights: 1 / 1209600, // 1 fortnight = 1209600 seconds
    Months: 1 / 2592000, // 1 month (average) = 2592000 seconds
    Years: 1 / 31536000, // 1 year = 31536000 seconds
    Decades: 1 / 315360000, // 1 decade = 315360000 seconds
    Centuries: 1 / 3153600000, // 1 century = 3153600000 seconds
  };

  useEffect(() => {
    if (inputValue === "" || isNaN(inputValue)) {
      setOutputValue("");
      return;
    }

    const valueInSeconds = parseFloat(inputValue) / conversionFactors[fromUnit];
    const convertedValue = valueInSeconds * conversionFactors[toUnit];
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
            <FaClock className="text-4xl text-[#FF6347]" />
            <h2 className="text-gray-900">Time Converter</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Convert between different time units using the fields below.
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
