"use client";
import { useState } from "react";
import axios from "axios";
import { IoImagesOutline } from "react-icons/io5";

export default function page() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [editedImage, setEditedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const maxSize = 1024 * 1024 * 10; // 10 MB

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > maxSize) {
      // alert("File size exceeds 10 MB limit");
      return;
    }
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBackground = async () => {
    if (!selectedFile) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/remove-background/`,
        formData
      );

      setEditedImage(`data:image/png;base64,${response.data}`);
    } catch (error) {
      console.error("Error removing background:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col">
        <div className="text-left">
          <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
            <IoImagesOutline />
            <h2 className="text-gray-900">Background Remover</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Easily remove the background from your images with our powerful
            tool.
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <div className="bg-white pb-6 lg:pb-0 border border-gray-300 rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 h-5/6 pb-10">
                <div className="flex h-full">
                  <div className="flex-1">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Upload Image
                    </label>
                    <div className="mt-1 flex justify-center items-center h-full px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Uploaded Preview"
                            className="mx-auto h-48 w-auto"
                          />
                        ) : (
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        <div className="flex text-sm text-gray-600 pt-2">
                          <label
                            htmlFor="image"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="image"
                              name="image"
                              type="file"
                              className="sr-only"
                              onChange={handleFileChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-left">
                <button
                  type="button"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  onClick={handleRemoveBackground}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Remove Background"}
                </button>
              </div>
            </div>
            <div className="bg-white border border-gray-300 rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Result Image
                </h3>
                <div className="mt-2">
                  {editedImage ? (
                    <div className="p-12">
                      <img
                        src={editedImage}
                        alt="Edited image"
                        className="w-full h-auto rounded-md border"
                      />
                      <a
                        href={editedImage}
                        download="edited-image.png"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
                      >
                        Download
                      </a>
                    </div>
                  ) : (
                    <img
                      src="/placeholder.svg"
                      alt="Edited image"
                      className="w-full h-auto rounded-md"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
