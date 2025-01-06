"use client";
import { useState } from "react";
import axios from "axios";
import { XmlBeautify } from "xml-beautify";

export default function Page() {
  const [jsonText, setJsonText] = useState("");
  const [xmlText, setXmlText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJsonChange = (e) => {
    setJsonText(e.target.value);
    setError(""); // Clear the error message when the user starts typing
  };

  const handleConvert = async (event) => {
    event.preventDefault();
    if (!jsonText) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/json-to-xml/`,
        { json: jsonText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setXmlText(response.data); // Format XML output
      setError(""); // Clear any previous error
    } catch (error) {
      console.error("Error converting JSON to XML:", error);
      if (error.response && error.response.status === 400) {
        setError("Please enter correct JSON.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="text-left w-full">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <h2 className="text-gray-900">JSON to XML Converter</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Convert JSON data to XML format using our tool.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form className="space-y-4" onSubmit={handleConvert}>
          <div>
            <label htmlFor="json" className="block mb-1 text-sm font-medium">
              Enter JSON
            </label>
            <textarea
              id="json"
              value={jsonText}
              onChange={handleJsonChange}
              className="block w-full h-56 rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              rows="6"
            />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
            disabled={loading}
          >
            {loading ? "Processing..." : "Convert to XML"}
          </button>
          <div className="mt-4">
            <label htmlFor="xml" className="block mb-1 text-sm font-medium">
              XML Output
            </label>
            <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded-md border border-gray-300">
              <code>{xmlText}</code>
            </pre>
          </div>
        </form>
        {!xmlText && (
          <p className="mt-4 text-sm text-muted-foreground">
            The converted XML will be displayed here once the conversion is
            complete.
          </p>
        )}
      </div>
    </div>
  );
}
