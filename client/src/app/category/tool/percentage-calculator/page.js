"use client";

import { useState } from "react";
import { FaPercentage } from "react-icons/fa";

export default function PercentageCalculatorTool() {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [p, setP] = useState("");
  const [option, setOption] = useState("What is P% of X?");
  const [result, setResult] = useState(null);
  const [showY, setShowY] = useState(false);
  const [showP, setShowP] = useState(false);

  const calculateResult = () => {
    let res;
    const xVal = parseFloat(x);
    const yVal = parseFloat(y);
    const pVal = parseFloat(p);

    switch (option) {
      case "What is P% of X?":
        res = (pVal / 100) * xVal;
        break;
      case "X is what percent of Y?":
        res = (xVal * 100) / yVal;
        break;
      case "X is P% of what?":
        res = (xVal * 100) / pVal;
        break;
      case "What is X increased by P%?":
        res = xVal * ((100 + pVal) / 100);
        break;
      case "What is X decreased by P%?":
        res = xVal * ((100 - pVal) / 100);
        break;
      default:
        res = "Invalid Option";
    }

    setResult(res);
  };

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setOption(selectedOption);

    // Show or hide fields based on the selected option
    if (selectedOption === "What is P% of X?") {
      setShowY(false);
      setShowP(true);
    } else if (
      selectedOption === "What is X increased by P%?" ||
      selectedOption === "What is X decreased by P%?"
    ) {
      setShowY(false);
      setShowP(true);
    } else if (selectedOption === "X is what percent of Y?") {
      setShowY(true);
      setShowP(selectedOption !== "X is what percent of Y?");
    } else if (selectedOption === "X is P% of what?") {
      setShowY(false);
      setShowP(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <div className="text-left">
          <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
            <FaPercentage className="text-4xl text-[#FF6347]" />
            <h2 className="text-gray-900">Percentage Calculator</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Calculate various percentage-based operations using the fields
            provided.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <label className="block mb-1 text-sm font-medium">X</label>
            <input
              type="number"
              value={x}
              onChange={(e) => setX(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white p-2"
              placeholder="Enter X"
            />
          </div>
          {showY && (
            <div className="w-full lg:w-1/2">
              <label className="block mb-1 text-sm font-medium">Y</label>
              <input
                type="number"
                value={y}
                onChange={(e) => setY(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2"
                placeholder="Enter Y"
              />
            </div>
          )}
          {showP && (
            <div className="w-full lg:w-1/2">
              <label className="block mb-1 text-sm font-medium">P (%)</label>
              <input
                type="number"
                value={p}
                onChange={(e) => setP(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white p-2"
                placeholder="Enter Percentage"
              />
            </div>
          )}
        </div>
        <div className="w-full">
          <label className="block mb-1 text-sm font-medium">
            Select Calculation
          </label>
          <select
            value={option}
            onChange={handleOptionChange}
            className="w-full rounded-md border border-gray-300 bg-white p-2"
          >
            <option>What is P% of X?</option>
            <option>X is what percent of Y?</option>
            <option>X is P% of what?</option>
            <option>What is X increased by P%?</option>
            <option>What is X decreased by P%?</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button
            onClick={calculateResult}
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
          >
            Calculate
          </button>
        </div>
        {result !== null && (
          <div className="mt-6 bg-background border border-gray-300 rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-black">
                Calculation Result
              </h2>
            </div>
            <div className="p-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Result
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {result}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
