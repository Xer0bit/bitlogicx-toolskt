"use client";

import { useState } from "react";
import { BinaryIcon } from "lucide-react";

export default function DecimalToBinaryConverter() {
  const [decimal, setDecimal] = useState("");
  const [binaryResult, setBinaryResult] = useState(null);

  const convertDecimalToBinary = () => {
    const decimalNum = parseInt(decimal.trim(), 10);

    // Ensure the input is a valid decimal number
    if (!isNaN(decimalNum) && decimalNum >= 0) {
      const binary = decimalNum.toString(2); // Convert decimal number to binary string
      setBinaryResult(binary);
    } else {
      setBinaryResult("Invalid decimal number");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <div className="text-left">
          <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
            <BinaryIcon size={40} className=" text-[#FF6347]" />

            <h2 className="text-gray-900">Decimal to Binary Converter</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Convert decimal numbers to their binary representation using the
            input field below.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full">
            <label className="block mb-1 text-sm font-medium">
              Decimal Number
            </label>
            <input
              type="number"
              value={decimal}
              onChange={(e) => setDecimal(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white p-2"
              placeholder="Enter decimal number"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={convertDecimalToBinary}
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
          >
            Convert
          </button>
        </div>
        {binaryResult !== null && (
          <div className="mt-6 bg-background border border-gray-300 rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-black">
                Conversion Result
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
                      Binary Representation
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {binaryResult}
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
