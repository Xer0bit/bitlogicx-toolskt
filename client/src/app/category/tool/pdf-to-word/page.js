"use client";
import { useState } from "react";
import { FaRegFilePdf } from "react-icons/fa";
import { FaFileWord } from "react-icons/fa";
import axios from "axios";

export default function Page() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleConvert = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/pdf-to-word/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // Ensure response is treated as a blob
        }
      );
      //console.log(response.data);
      const blob = new Blob([response.data], { type: "application/msword" });
      const url = window.URL.createObjectURL(blob);
      setConvertedFile(url);
    } catch (error) {
      console.error("Error converting PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="text-left">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <FaRegFilePdf className="text-[#FA0F00]" />
          <h2 className="text-gray-900">PDF To WORD Converter</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Easily convert PDF files to WORD documents with our powerful tool.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form className="space-y-4" onSubmit={handleConvert}>
          <div>
            <label htmlFor="pdf" className="block mb-1 text-sm font-medium">
              Upload PDF File
            </label>
            <input
              id="pdf"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
            disabled={loading}
          >
            {loading ? "Processing..." : "Convert to WORD"}
          </button>
        </form>
        {convertedFile && (
          <div className="mt-4">
            <div className="flex items-center border w-fit p-1 gap-1 rounded-md">
              <FaFileWord className="text-blue-500" />
              <span className="opacity-70 text-sm">
                converted-document.docx
              </span>
            </div>
            <a
              href={convertedFile}
              download="converted-document.docx"
              className="inline-flex justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Download WORD
            </a>
          </div>
        )}
        {!convertedFile && (
          <p className="mt-4 text-sm text-muted-foreground">
            The converted WORD file will be available for download once the
            conversion is complete.
          </p>
        )}
      </div>
    </div>
  );
}
