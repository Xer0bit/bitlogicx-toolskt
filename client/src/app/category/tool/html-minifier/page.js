"use client";

import { useState } from "react";
import { FaHtml5 } from "react-icons/fa";

export default function HtmlMinifierTool() {
  const [htmlCode, setHtmlCode] = useState('<div class="">Hello, World!</div>');
  const [htmlFile, setHtmlFile] = useState(null);

  const handleConvert = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (file) {
      setHtmlFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setHtmlCode(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const minifyHtml = (html) => {
    return html
      .replace(/>\s+</g, "><") // Remove whitespace between tags
      .replace(/<!--.*?-->/gs, ""); // Remove comments
  };

  const handleMinify = () => {
    setHtmlCode(minifyHtml(htmlCode));
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <div className="text-left">
          <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
            <FaHtml5 className="text-4xl text-[#ff6347]" />
            <h2 className="text-gray-900">HTML Minifier</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            HTML Minifier is a tool to minify your HTML code by removing
            unnecessary whitespace and comments.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 ">
          <div className="bg-background border border-gray-300 rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-black">Code Editor</h2>
            </div>
            <div className="p-4">
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                className="w-full h-[400px] outline-none font-mono text-sm bg-muted rounded-md border-0 focus:ring-0"
                placeholder="Enter your HTML code..."
                spellCheck={false}
              />
            </div>
            <div className="p-4 border-t flex flex-col">
              <div>
                <label
                  htmlFor="html-file"
                  className="block mb-1 text-sm font-medium"
                >
                  Upload HTML File
                </label>
                <input
                  id="html-file"
                  type="file"
                  accept=".html"
                  onChange={handleConvert}
                  className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <button
                onClick={handleMinify}
                className="inline-flex justify-center py-2 px-4 h-fit border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
              >
                Minify
              </button>
              <button
                onClick={() => {
                  setHtmlCode("");
                  setHtmlFile("");
                }}
                className="inline-flex justify-center py-2 px-4 h-fit border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="bg-background border border-gray-300 rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-black">Preview</h2>
            </div>
            <div className="p-4 prose max-w-none">
              <iframe
                className="p-4 prose h-[500px] w-full"
                src=""
                srcDoc={htmlCode}
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
