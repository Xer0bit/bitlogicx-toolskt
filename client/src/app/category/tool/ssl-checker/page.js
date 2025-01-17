"use client";
import { useState } from "react";
import axios from "axios";
import { HiOutlineShieldCheck } from "react-icons/hi";

export default function Page() {
  const [url, setUrl] = useState("");
  const [sslInfo, setSslInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleCheckSsl = async (event) => {
    event.preventDefault();
    if (!url) return;

    setLoading(true);
    //console.log(url);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/check-ssl/`,
        { url },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //console.log(response.data);
      setSslInfo(response.data);
    } catch (error) {
      console.error("Error checking SSL certificate:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 container">
      <div className="text-left">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <HiOutlineShieldCheck />
          <h2 className="text-gray-900">SSL Certificate Checker</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Check the SSL certificate of a website by entering its URL.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form onSubmit={handleCheckSsl}>
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
            {loading ? "Checking..." : "Check SSL"}
          </button>
        </form>
        {sslInfo && (
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-900">
              URL: {sslInfo.url}
            </p>
            {sslInfo.status === "success" ? (
              <div className="mt-4">
                <h3 className="text-xl font-bold py-3">
                  SSL Certificate Details
                </h3>
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Field
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.keys(sslInfo.data).map((key, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{key}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {key === "subject" || key === "issuer" ? (
                                <pre className="text-sm text-gray-900 whitespace-pre-wrap">
                                  {sslInfo.data[key]}
                                </pre>
                              ) : (
                                sslInfo.data[key]
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-red-600">Error: {sslInfo.message}</p>
            )}
          </div>
        )}
        {!sslInfo && (
          <p className="mt-4 text-sm text-muted-foreground">
            Results will be shown here once you check a website URL.
          </p>
        )}
      </div>
    </div>
  );
}
