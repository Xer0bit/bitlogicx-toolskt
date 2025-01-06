"use client";
import { useState } from "react";
import axios from "axios";
import { HiOutlineLink } from "react-icons/hi";

export default function BulkURLOpener() {
  const [urls, setUrls] = useState("");
  const [openResults, setOpenResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUrlsChange = (e) => {
    setUrls(e.target.value);
  };

  const handleOpenUrls = async (event) => {
    event.preventDefault();
    if (!urls) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/bulk-url-opener/`,
        { urls },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Open URL results:", response.data);
      setOpenResults(response.data.results);
    } catch (error) {
      console.error("Error opening URLs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="text-left">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <HiOutlineLink />
          <h2 className="text-gray-900">Bulk URL Opener</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Open multiple URLs at once by sending them to the backend.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form className="space-y-4" onSubmit={handleOpenUrls}>
          <div>
            <label htmlFor="urls" className="block mb-1 text-sm font-medium">
              Enter URLs (comma-separated)
            </label>
            <textarea
              id="urls"
              value={urls}
              onChange={handleUrlsChange}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
            disabled={loading}
          >
            {loading ? "Opening..." : "Open URLs"}
          </button>
        </form>
        {openResults.length > 0 && (
          <div className="mt-4">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      URL
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {openResults.map((result, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {result.url}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {result.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {openResults.length === 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            Results will be shown here once you open the URLs.
          </p>
        )}
      </div>
    </div>
  );
}
