"use client";

import { useState } from "react";
import { FaJsSquare } from "react-icons/fa";

export default function JsMinifierTool() {
  const [jsCode, setJsCode] = useState(`function helloWorld() {
  //console.log("Hello, World!"); // This is a comment
}`);

  const [jsFile, setJsFile] = useState(null);

  const handleConvert = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (file) {
      setJsFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setJsCode(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const minifyJs = (js) => {
    return js
      .replace(/\/\*.*?\*\//gs, "") // Remove block comments
      .replace(/\/\/.*(?=[\n\r])/g, "") // Remove line comments
      .replace(/\s+/g, " ") // Replace multiple spaces with single space
      .replace(/\s*([{};,:])\s*/g, "$1") // Remove space around {},;:
      .replace(/;}/g, "}"); // Remove unnecessary semicolons
  };

  const handleMinify = () => {
    setJsCode(minifyJs(jsCode));
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <div className="text-left">
          <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
            <FaJsSquare className="text-4xl text-[#f7df1e]" />
            <h2 className="text-gray-900">JavaScript Minifier</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            JavaScript Minifier is a tool to minify your JavaScript code by
            removing unnecessary whitespace, comments, and redundant semicolons.
          </p>
        </div>
        <div className="">
          <div className="bg-background border border-gray-300 rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-black">Code Editor</h2>
            </div>
            <div className="p-4">
              <textarea
                value={jsCode}
                onChange={(e) => setJsCode(e.target.value)}
                className="w-full h-[400px] outline-none font-mono text-sm bg-muted rounded-md border-0 focus:ring-0"
                placeholder="Enter your JavaScript code..."
                spellCheck={false}
              />
            </div>
            <div className="p-4 border-t flex flex-col">
              <div>
                <label
                  htmlFor="js-file"
                  className="block mb-1 text-sm font-medium"
                >
                  Upload JavaScript File
                </label>
                <input
                  id="js-file"
                  type="file"
                  accept=".js"
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
                  setJsCode("");
                  setJsFile("");
                }}
                className="inline-flex justify-center py-2 px-4 h-fit border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
              >
                Clear
              </button>
            </div>
          </div>
          {/* <div className="bg-background border border-gray-300 rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-black">Preview</h2>
            </div>
            <div className="p-4 prose max-w-none">
              <pre className="p-4 prose h-[500px] w-full bg-muted rounded-md overflow-auto">
                {jsCode}
              </pre>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
