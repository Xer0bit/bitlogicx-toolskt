"use client";

import { useState } from "react";
import { FaCalculator } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
export default function AverageCalculatorTool() {
  const [values, setValues] = useState([""]);
  const [average, setAverage] = useState(null);

  // Handle input field changes
  const handleInputChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  // Add a new input field
  const addField = () => {
    setValues([...values, ""]);
  };

  // Remove a specific input field
  const removeField = (index) => {
    const newValues = values.filter((_, i) => i !== index);
    setValues(newValues);
  };

  // Calculate the average
  const calculateAverage = () => {
    const filteredValues = values.map(Number).filter((value) => !isNaN(value));
    if (filteredValues.length === 0) {
      setAverage("Please enter at least one valid number.");
      return;
    }
    const sum = filteredValues.reduce((acc, curr) => acc + curr, 0);
    const avg = sum / filteredValues.length;
    setAverage(avg);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <div className="text-left">
          <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
            <FaCalculator className="text-4xl text-[#FF6347]" />
            <h2 className="text-gray-900">Average Calculator</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Calculate the average of the numbers you input. You can add or
            remove input fields as needed.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          {values.map((value, index) => (
            <div key={index} className="flex gap-4 items-center">
              <div className="w-full">
                <label className="block mb-1 text-sm font-medium">
                  Value {index + 1}
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-white p-2"
                  placeholder={`Enter Value ${index + 1}`}
                />
              </div>
              <RiDeleteBin6Line
                onClick={() => removeField(index)}
                className=" text-4xl mt-5 cursor-pointer text-red-500"
              />
            </div>
          ))}
          <div className="flex justify-start">
            <button
              onClick={addField}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Add Field
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={calculateAverage}
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
          >
            Calculate Average
          </button>
        </div>
        {average !== null && (
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
                      Average
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {average}
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
