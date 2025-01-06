"use client";
import { useState } from "react";
import { IoGlobeOutline } from "react-icons/io5";
import axios from "axios";

export default function Page() {
  const [url, setUrl] = useState("");
  const [deviceType, setDeviceType] = useState("desktop");
  const [pageType, setPageType] = useState("landingpage");
  const [screenshot, setScreenshot] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!url) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/website-screenshot-generator/`,
        {
          url,
          device_type: deviceType,
          page_type: pageType,
        }
      );
      setScreenshot(`data:image/png;base64,${response.data.screenshot}`);
    } catch (error) {
      console.error("Error generating screenshot:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="text-left">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <IoGlobeOutline />
          <h2 className="text-gray-900">Website Screenshot Generator</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Generate screenshots of websites with options for mobile/desktop and
          full page/landing page.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="url" className="block mb-1 text-sm font-medium">
              Website URL
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Device Type
            </label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Page Type</label>
            <select
              value={pageType}
              onChange={(e) => setPageType(e.target.value)}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="landingpage">Landing Page</option>
              <option value="fullpage">Full Page</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
            disabled={loading}
          >
            {loading ? "Processing..." : "Generate Screenshot"}
          </button>
        </form>
        {screenshot && (
          <div className="mt-4 flex items-center">
            <img
              src={screenshot}
              alt="Screenshot"
              className="w-1/2 h-auto rounded-md"
            />
            <a
              href={screenshot}
              download="screenshot.png"
              className="inline-flex self-start justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Download Screenshot
            </a>
          </div>
        )}
        {!screenshot && (
          <p className="mt-4 text-sm text-muted-foreground">
            The screenshot will be available for download once it's generated.
          </p>
        )}
      </div>
    </div>
  );
}
