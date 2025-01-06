"use client";

import { useState } from "react";
import { FaCalculator } from "react-icons/fa";

export default function ProbabilityCalculator() {
  const [favorableOutcomes, setFavorableOutcomes] = useState("");
  const [totalOutcomes, setTotalOutcomes] = useState("");
  const [result, setResult] = useState(null);

  const calculateProbability = () => {
    const favorableVal = parseFloat(favorableOutcomes);
    const totalVal = parseFloat(totalOutcomes);

    if (!isNaN(favorableVal) && !isNaN(totalVal) && totalVal !== 0) {
      const probability = (favorableVal / totalVal) * 100;
      setResult(probability.toFixed(2));
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <div className="text-left">
          <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
            <FaCalculator className="text-4xl text-[#FF6347]" />
            <h2 className="text-gray-900">Probability Calculator</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Calculate the probability of an event occurring based on the number
            of favorable outcomes and the total number of possible outcomes.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <label className="block mb-1 text-sm font-medium">
              Favorable Outcomes
            </label>
            <input
              type="number"
              value={favorableOutcomes}
              onChange={(e) => setFavorableOutcomes(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white p-2"
              placeholder="Enter Favorable Outcomes"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <label className="block mb-1 text-sm font-medium">
              Total Outcomes
            </label>
            <input
              type="number"
              value={totalOutcomes}
              onChange={(e) => setTotalOutcomes(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white p-2"
              placeholder="Enter Total Outcomes"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={calculateProbability}
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
                      Probability
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {result}%
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
