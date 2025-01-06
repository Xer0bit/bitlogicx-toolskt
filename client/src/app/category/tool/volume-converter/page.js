"use client";

import { useState, useEffect } from "react";
import { FaTint } from "react-icons/fa";
import { AiOutlineSwap } from "react-icons/ai";

export default function VolumeConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Liters");
  const [toUnit, setToUnit] = useState("Liters");
  const [outputValue, setOutputValue] = useState("");

  // Conversion factors relative to liters
  const conversionFactors = {
    Liters: 1,
    Milliliters: 1000, // 1 liter = 1000 milliliters
    CubicMeters: 0.001, // 1 liter = 0.001 cubic meters
    Gallons: 0.264172, // 1 liter = 0.264172 gallons (US)
    Quarts: 1.05669, // 1 liter = 1.05669 quarts (US)
    Pints: 2.11338, // 1 liter = 2.11338 pints (US)
    Cups: 4.22675, // 1 liter = 4.22675 cups (US)
    FluidOunces: 33.814, // 1 liter = 33.814 fluid ounces (US)
    CubicInches: 61.0237, // 1 liter = 61.0237 cubic inches
    CubicFeet: 0.035314, // 1 liter = 0.035314 cubic feet
    GallonsUK: 0.219969, // 1 liter = 0.219969 gallons (UK)
    QuartsUK: 0.879876, // 1 liter = 0.879876 quarts (UK)
    PintsUK: 1.75975, // 1 liter = 1.75975 pints (UK)
    CupsUK: 2.11338, // 1 liter = 2.11338 cups (UK)
  };

  useEffect(() => {
    if (inputValue === "" || isNaN(inputValue)) {
      setOutputValue("");
      return;
    }

    const valueInLiters = parseFloat(inputValue) / conversionFactors[fromUnit];
    const convertedValue = valueInLiters * conversionFactors[toUnit];
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
            <FaTint className="text-4xl text-[#FF6347]" />
            <h2 className="text-gray-900">Volume Converter</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Convert between different volume units using the fields below.
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
