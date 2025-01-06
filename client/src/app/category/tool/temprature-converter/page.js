"use client";

import { useState, useEffect } from "react";
import { FaThermometerHalf } from "react-icons/fa";
import { AiOutlineSwap } from "react-icons/ai";

export default function TemperatureConverter() {
  const [inputValue, setInputValue] = useState("");
  const [fromUnit, setFromUnit] = useState("Celsius");
  const [toUnit, setToUnit] = useState("Celsius");
  const [outputValue, setOutputValue] = useState("");

  // Function to convert temperature
  const convertTemperature = (value, fromUnit, toUnit) => {
    let celsius;

    // Convert from the original unit to Celsius
    switch (fromUnit) {
      case "Fahrenheit":
        celsius = ((parseFloat(value) - 32) * 5) / 9;
        break;
      case "Kelvin":
        celsius = parseFloat(value) - 273.15;
        break;
      case "Celsius":
      default:
        celsius = parseFloat(value);
        break;
    }

    // Convert from Celsius to the target unit
    switch (toUnit) {
      case "Fahrenheit":
        return (celsius * 9) / 5 + 32;
      case "Kelvin":
        return celsius + 273.15;
      case "Celsius":
      default:
        return celsius;
    }
  };

  useEffect(() => {
    if (inputValue === "" || isNaN(inputValue)) {
      setOutputValue("");
      return;
    }

    const convertedValue = convertTemperature(inputValue, fromUnit, toUnit);
    setOutputValue(convertedValue.toFixed(2)); // Round to 2 decimal places
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
            <FaThermometerHalf className="text-4xl text-[#FF6347]" />
            <h2 className="text-gray-900">Temperature Converter</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Convert between different temperature units using the fields below.
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
                <option>Celsius</option>
                <option>Fahrenheit</option>
                <option>Kelvin</option>
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
                <option>Celsius</option>
                <option>Fahrenheit</option>
                <option>Kelvin</option>
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