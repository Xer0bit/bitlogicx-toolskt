"use client";
import { useState } from "react";
import axios from "axios";

export default function Page() {
  const [markdownText, setMarkdownText] = useState("");
  const [htmlText, setHtmlText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMarkdownChange = (e) => {
    setMarkdownText(e.target.value);
    setError(""); // Clear the error message when the user starts typing
  };

  const handleConvert = async (event) => {
    event.preventDefault();
    if (!markdownText) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/markdown-to-html/`,
        { markdown: markdownText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setHtmlText(response.data.html); // Expecting the response to include HTML field
      setError(""); // Clear any previous error
    } catch (error) {
      console.error("Error converting Markdown to HTML:", error);
      if (error.response && error.response.status === 400) {
        setError("Please enter correct Markdown.");
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
          <h2 className="text-gray-900">Markdown to HTML Converter</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Convert Markdown content to HTML format using our tool.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form className="space-y-4" onSubmit={handleConvert}>
          <div>
            <label
              htmlFor="markdown"
              className="block mb-1 text-sm font-medium"
            >
              Enter Markdown
            </label>
            <textarea
              id="markdown"
              value={markdownText}
              onChange={handleMarkdownChange}
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
            {loading ? "Processing..." : "Convert to HTML"}
          </button>
          <div className="mt-4">
            <label htmlFor="html" className="block mb-1 text-sm font-medium">
              HTML Output
            </label>

            <iframe
              className="p-4 prose h-[500px] w-full"
              src=""
              srcDoc={htmlText}
              frameborder="0"
            ></iframe>
          </div>
        </form>
        {!htmlText && (
          <p className="mt-4 text-sm text-muted-foreground">
            The converted HTML will be displayed here once the conversion is
            complete.
          </p>
        )}
      </div>
    </div>
  );
}
