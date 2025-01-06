"use client";

import { useState, useEffect } from "react";
import { FaWeight } from "react-icons/fa";
import { AiOutlineSwap } from "react-icons/ai";

export default function WeightConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Grams");
  const [toUnit, setToUnit] = useState("Grams");
  const [outputValue, setOutputValue] = useState("");

  // Conversion factors relative to grams
  const conversionFactors = {
    Grams: 1,
    Kilograms: 0.001, // 1 kilogram = 1000 grams
    MetricTons: 1e-6, // 1 metric ton = 1,000,000 grams
    Pounds: 0.00220462, // 1 pound = 453.592 grams
    Ounces: 0.035274, // 1 ounce = 28.3495 grams
    Stones: 0.000157473, // 1 stone = 6350.29 grams
    Milligrams: 1000, // 1 milligram = 0.001 grams
    Micrograms: 1e6, // 1 microgram = 0.000001 grams
    Tonnes: 1e-6, // 1 tonne = 1,000,000 grams
  };

  useEffect(() => {
    if (inputValue === "" || isNaN(inputValue)) {
      setOutputValue("");
      return;
    }

    const valueInGrams = parseFloat(inputValue) / conversionFactors[fromUnit];
    const convertedValue = valueInGrams * conversionFactors[toUnit];
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
            <FaWeight className="text-4xl text-[#FF6347]" />
            <h2 className="text-gray-900">Weight Converter</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Convert between different weight units using the fields below.
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
