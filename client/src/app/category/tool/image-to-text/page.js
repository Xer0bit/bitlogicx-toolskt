"use client";
import { useState, useEffect } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import axios from "axios";

export default function Page() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // New state for error messages

  useEffect(() => {
    // Clean up the preview URL when the component unmounts or selectedFile changes
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setExtractedText(""); // Clear previous extracted text
    setError(""); // Clear previous error message

    // Create a preview URL for the selected image
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl("");
    }
  };

  const handleConvert = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setError("Please select an image file to extract text.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous error message

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/image-to-text/`, // Update with correct endpoint
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setExtractedText(response.data); // Assuming response contains a text field
    } catch (error) {
      console.error("Error extracting text from image:", error);
      setExtractedText("Error extracting text from image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="text-left w-full">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <AiOutlineFileImage />
          <h2 className="text-gray-900">Image to Text Converter</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Extract text from images using our tool.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form className="space-y-4" onSubmit={handleConvert}>
          <div>
            <label htmlFor="image" className="block mb-1 text-sm font-medium">
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              accept=".jpg,.jpeg,.png" // Accept common image formats
              onChange={handleFileChange}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          {previewUrl && (
            <div className="mt-4 flex flex-col items-center">
              <img
                src={previewUrl}
                alt="Selected"
                className="w-1/2 h-auto rounded-md border border-gray-300"
              />
            </div>
          )}
          {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}

          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
            disabled={loading}
          >
            {loading ? "Processing..." : "Extract Text"}
          </button>
        </form>
        {extractedText && (
          <div className="mt-4">
            <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-4 rounded-md border border-gray-300">
              {extractedText}
            </pre>
          </div>
        )}
        {!extractedText && !loading && !error && (
          <p className="mt-4 text-sm text-muted-foreground">
            The extracted text will be displayed here once the processing is
            complete.
          </p>
        )}
      </div>
    </div>
  );
}
