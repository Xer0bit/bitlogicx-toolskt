"use client";

import { useState, useEffect } from "react";
import { FaCog } from "react-icons/fa";
import { AiOutlineSwap } from "react-icons/ai";

export default function TorqueConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Newton-Meters");
  const [toUnit, setToUnit] = useState("Newton-Meters");
  const [outputValue, setOutputValue] = useState("");

  // Conversion factors relative to Newton-Meters
  const conversionFactors = {
    "Newton-Meters": 1,
    "Kilogram-Meters": 0.101971, // 1 kilogram-meter = 0.101971 Newton-meters
    "Pound-Feet": 0.737562, // 1 pound-foot = 0.737562 Newton-meters
    "Pound-Inches": 0.0610237, // 1 pound-inch = 0.0610237 Newton-meters
    "Ounce-Feet": 0.006144, // 1 ounce-foot = 0.006144 Newton-meters
    "Kiloponds-Meters": 0.981, // 1 kilopond-meter = 0.981 Newton-meters
    "Dyne-Centimeters": 1e-7, // 1 dyne-centimeter = 1e-7 Newton-meters
    "Meter-Kilograms": 1, // 1 meter-kilogram = 1 Newton-meter (same as Newton-meter)
    Joules: 1, // 1 joule = 1 Newton-meter (same as Newton-meter)
  };

  useEffect(() => {
    if (inputValue === "" || isNaN(inputValue)) {
      setOutputValue("");
      return;
    }

    const valueInNewtonMeters =
      parseFloat(inputValue) / conversionFactors[fromUnit];
    const convertedValue = valueInNewtonMeters * conversionFactors[toUnit];
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
            <FaCog className="text-4xl text-[#FF6347]" />
            <h2 className="text-gray-900">Torque Converter</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Convert between different torque units using the fields below.
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
