"use client";
import { useState } from "react";
import { FaRegFilePdf, FaFilePdf } from "react-icons/fa";
import axios from "axios";

export default function Page() {
  const [files, setFiles] = useState([]);
  const [resultFile, setResultFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const filteredFiles = selectedFiles.filter(file => file.size <= 20 * 1024 * 1024); // 20 MB in bytes
    if (filteredFiles.length < selectedFiles.length) {
      alert("Some files were too large and have been excluded.");
    }
    setFiles(filteredFiles);
  };

  const handleConvert = async (event) => {
    event.preventDefault();
    if (files.length === 0) return;

    setLoading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/merge-pdfs/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );
      const blob = new Blob([response.data], {
        type: "application/pdf",
      });
      const url = window.URL.createObjectURL(blob);
      setResultFile(url);
    } catch (error) {
      console.error("Error processing files:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="text-left">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <FaRegFilePdf className="text-[#FA0F00]" />
          <h2 className="text-gray-900">Merge PDFs</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Merge multiple PDF files into a single PDF document.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form className="space-y-4" onSubmit={handleConvert}>
          <div>
            <label htmlFor="files" className="block mb-1 text-sm font-medium">
              Upload Files
            </label>
            <input
              id="files"
              type="file"
              accept=".pdf"
              multiple
              onChange={handleFilesChange}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
            disabled={loading}
          >
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
        {resultFile && (
          <div className="mt-4">
            <div className="flex items-center border w-fit p-1 gap-1 rounded-md">
              <FaFilePdf className="text-blue-500" />
              <span className="opacity-70 text-sm">merged-document</span>
            </div>
            <a
              href={resultFile}
              download="merged-document.pdf"
              className="inline-flex justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Download File
            </a>
          </div>
        )}
        {!resultFile && (
          <p className="mt-4 text-sm text-muted-foreground">
            The merged file will be available for download once the operation is
            complete.
          </p>
        )}
      </div>
    </div>
  );
}
