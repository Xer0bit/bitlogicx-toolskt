"use client";
import { useState, useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import axios from "axios";

export default function Page() {
  const [ipAddress, setIpAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
        setError("Error fetching IP address.");
      } finally {
        setLoading(false);
      }
    };

    fetchIpAddress();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="text-left w-full">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <AiOutlineInfoCircle />
          <h2 className="text-gray-900">What is My IP Address?</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Find out your current IP address using this tool.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        {loading ? (
          <p className="text-center text-gray-500">Fetching IP address...</p>
        ) : error ? (
          <div className="mt-4 text-red-600 text-sm">{error}</div>
        ) : (
          <div className="mt-4 text-center">
            <p className="text-lg font-medium text-gray-900">
              Your IP Address:
            </p>
            <p className="text-2xl font-semibold text-gray-800 mt-2">
              {ipAddress}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
