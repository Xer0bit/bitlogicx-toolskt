"use client";
import { useState } from "react";
import axios from "axios";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function Page() {
  const [password, setPassword] = useState("");
  const [strengthInfo, setStrengthInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckStrength = async (event) => {
    event.preventDefault();
    if (!password) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/password-strength-checker/`,
        { password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //console.log(response.data);
      setStrengthInfo(response.data);
    } catch (error) {
      console.error("Error checking password strength:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 container">
      <div className="text-left">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <HiOutlineShieldCheck />
          <h2 className="text-gray-900">Password Strength Checker</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Check the strength of your password.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form onSubmit={handleCheckStrength}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium"
            >
              Enter Password
            </label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter password here"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Strength"}
          </button>
        </form>
        {strengthInfo && (
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-900">
              Password: {strengthInfo.password}
            </p>
            <p className="mt-2 text-gray-700">
              Strength: {strengthInfo.strength}
            </p>
            <div className="mt-4">
              <h3 className="text-xl font-bold py-3">Criteria</h3>
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Criteria
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Met
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(strengthInfo.criteria).map(
                      ([criteria, met], index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {criteria}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {met ? (
                              <FaCheck className="text-green-500" />
                            ) : (
                              <FaTimes className="text-red-500" />
                            )}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {!strengthInfo && (
          <p className="mt-4 text-sm text-muted-foreground">
            Results will be shown here once you check a password.
          </p>
        )}
      </div>
    </div>
  );
}
