"use client";

import { useState, useEffect } from "react";
import { FaTachometerAlt } from "react-icons/fa";
import { AiOutlineSwap } from "react-icons/ai";

export default function PressureConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Pascal");
  const [toUnit, setToUnit] = useState("Pascal");
  const [outputValue, setOutputValue] = useState("");

  // Conversion factors relative to Pascals
  const conversionFactors = {
    Pascal: 1,
    Kilopascal: 1e-3, // 1 kilopascal = 1000 Pascals
    Megapascal: 1e-6, // 1 megapascal = 1,000,000 Pascals
    Gigapascal: 1e-9, // 1 gigapascal = 1,000,000,000 Pascals
    Bar: 1e-5, // 1 bar = 100,000 Pascals
    Millibar: 1e-2, // 1 millibar = 100 Pascals
    Atmosphere: 9.80665e-4, // 1 atmosphere = 101,325 Pascals
    Torr: 7.50062e-3, // 1 torr = 133.322 Pascals
    PoundsPerSquareInch: 1.45038e-4, // 1 psi = 6894.76 Pascals
    InchesOfMercury: 2.95387e-3, // 1 inch of mercury = 3,386.39 Pascals
    FeetOfWater: 2.9802e-2, // 1 foot of water = 2980.2 Pascals
  };

  useEffect(() => {
    if (inputValue === "" || isNaN(inputValue)) {
      setOutputValue("");
      return;
    }

    const valueInPascals = parseFloat(inputValue) / conversionFactors[fromUnit];
    const convertedValue = valueInPascals * conversionFactors[toUnit];
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
            <FaTachometerAlt className="text-4xl text-[#FF6347]" />
            <h2 className="text-gray-900">Pressure Converter</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Convert between different pressure units using the fields below.
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
