"use client";

import { useState, useEffect } from "react";
import { FaBolt } from "react-icons/fa";
import { AiOutlineSwap } from "react-icons/ai";
export default function PowerConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Watts");
  const [toUnit, setToUnit] = useState("Watts");
  const [outputValue, setOutputValue] = useState("");

  // Conversion factors relative to watts
  const conversionFactors = {
    Watts: 1,
    Kilowatts: 0.001, // Correct: 1 kilowatt = 1000 watts
    Megawatts: 1e-6,
    Gigawatts: 1e-9,
    Milliwatts: 1000,
    Microwatts: 1e6,
    Nanowatts: 1e9,
    Horsepower: 0.00134102209, // 1 horsepower = 745.7 watts
    KilocaloriesPerHour: 0.001163, // 1 kilocalorie per hour = 1.163 watts
    CaloriesPerHour: 1.163e-6, // 1 calorie per hour = 0.001163 watts
    BTUPerHour: 3.41214, // 1 BTU per hour = 0.293071 watts
    FootPoundsPerSecond: 0.737562, // 1 foot-pound per second = 1.35582 watts
    KilojoulesPerSecond: 0.001, // 1 kilojoule per second = 1000 watts
    MegajoulesPerSecond: 1e-6, // 1 megajoule per second = 1,000,000 watts
    Therm: 2.93071e-6, // 1 therm = 29.3071 kilowatts
    Refrigeration: 0.000352484, // 1 ton of refrigeration = 3.517 kilowatts
  };

  useEffect(() => {
    if (inputValue === "" || isNaN(inputValue)) {
      setOutputValue("");
      return;
    }

    const valueInWatts = parseFloat(inputValue) / conversionFactors[fromUnit];
    const convertedValue = valueInWatts * conversionFactors[toUnit];
    setOutputValue(convertedValue.toPrecision(6)); // Round to 6 significant figures
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
            <FaBolt className="text-4xl text-[#FF6347]" />
            <h2 className="text-gray-900">Power Converter</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Convert between different power units using the fields below.
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
