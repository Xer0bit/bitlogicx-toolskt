"use client";

import { useState } from "react";
import { FaBirthdayCake } from "react-icons/fa";

export default function AgeCalculatorTool() {
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [ageDetails, setAgeDetails] = useState(null);

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const today = new Date(todayDate);
    const diff = today - birth;

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalSeconds = Math.floor(diff / 1000);
    const totalMonths = years * 12 + months;

    setAgeDetails({
      years,
      months,
      days,
      totalMonths,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <div className="text-left">
          <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
            <FaBirthdayCake className="text-4xl text-[#FF6347]" />
            <h2 className="text-gray-900">Age Calculator</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Calculate your age in years, months, days, weeks, hours, minutes,
            and seconds.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <label className="block mb-1 text-sm font-medium">
              Select Birth Date
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white p-2"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <label className="block mb-1 text-sm font-medium">
              Select Today's Date
            </label>
            <input
              type="date"
              value={todayDate}
              onChange={(e) => setTodayDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white p-2"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={calculateAge}
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
          >
            Calculate Age
          </button>
        </div>
        {ageDetails && (
          <div className="mt-6 bg-background border border-gray-300 rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-black">Age Details</h2>
            </div>
            <div className="p-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Metric
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      You are
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{`${ageDetails.years} years, ${ageDetails.months} months, and ${ageDetails.days} days old`}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Total Months
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ageDetails.totalMonths}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Total Days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ageDetails.totalDays}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Total Weeks
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ageDetails.totalWeeks}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Total Hours
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ageDetails.totalHours}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Total Minutes
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ageDetails.totalMinutes}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Total Seconds
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ageDetails.totalSeconds}
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
