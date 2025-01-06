"use client";
import { useState } from "react";
import axios from "axios";
import { HiOutlineGlobeAlt } from "react-icons/hi";

export default function Page() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleCheckUptime = async (event) => {
    event.preventDefault();
    if (!url) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/check-uptime/`,
        { url },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setStatus(response.data);
    } catch (error) {
      console.error("Error checking website uptime:", error);
      setStatus({ status: "error", message: "Failed to check uptime." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 container">
      <div className="text-left">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <HiOutlineGlobeAlt />
          <h2 className="text-gray-900">Website Uptime Monitor</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Monitor if a website is up or down by entering its URL.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form onSubmit={handleCheckUptime}>
          <div className="mb-4">
            <label htmlFor="url" className="block mb-1 text-sm font-medium">
              Enter Website URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={handleUrlChange}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="https://example.com"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Uptime"}
          </button>
        </form>
        {status && (
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-900">URL: {url}</p>
            {status.status === "success" ? (
              <p className="mt-2 text-green-600">Website is up!</p>
            ) : (
              <p className="mt-2 text-red-600">Error: {status.message}</p>
            )}
          </div>
        )}
        {!status && (
          <p className="mt-4 text-sm text-muted-foreground">
            Results will be shown here once you check a website URL.
          </p>
        )}
      </div>
    </div>
  );
}
