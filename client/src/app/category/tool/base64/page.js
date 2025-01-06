"use client";

import { useState } from "react";
import { FaFileCode } from "react-icons/fa";

export default function Base64EncoderDecoderTool() {
  const [inputText, setInputText] = useState(`Hello, World!`);
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (file) {
      setFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setInputText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const encodeBase64 = (text) => {
    return btoa(text);
  };

  const decodeBase64 = (text) => {
    try {
      return atob(text);
    } catch (e) {
      return "Invalid Base64 string.";
    }
  };

  const handleEncode = () => {
    setInputText(encodeBase64(inputText));
  };

  const handleDecode = () => {
    setInputText(decodeBase64(inputText));
  };

  const handleDownload = () => {
    const blob = new Blob([inputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "output.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-10">
        <div className="text-left">
          <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
            <FaFileCode className="text-4xl text-[#4CAF50]" />
            <h2 className="text-gray-900">Base64 Encoder/Decoder</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Base64 Encoder/Decoder is a tool to encode your text to Base64
            format or decode Base64 formatted text back to its original form.
          </p>
        </div>
        <div className="">
          <div className="bg-background border border-gray-300 rounded-lg">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-black">Text Editor</h2>
            </div>
            <div className="p-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full h-[400px] outline-none font-mono text-sm bg-muted rounded-md border-0 focus:ring-0"
                placeholder="Enter your text..."
                spellCheck={false}
              />
            </div>
            <div className="p-4 border-t flex flex-col">
              <div>
                <label
                  htmlFor="file-upload"
                  className="block mb-1 text-sm font-medium"
                >
                  Upload Text File
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt"
                  onChange={handleFileUpload}
                  className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <button
                onClick={handleEncode}
                className="inline-flex justify-center py-2 px-4 h-fit border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
              >
                Encode
              </button>
              <button
                onClick={handleDecode}
                className="inline-flex justify-center py-2 px-4 h-fit border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
              >
                Decode
              </button>
              <button
                onClick={() => {
                  setInputText("");
                  setFile("");
                }}
                className="inline-flex justify-center py-2 px-4 h-fit border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
              >
                Clear
              </button>
              <button
                onClick={handleDownload}
                className="inline-flex justify-center py-2 px-4 h-fit border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
