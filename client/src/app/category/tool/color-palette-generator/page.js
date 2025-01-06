"use client";
import { useState } from "react";
import axios from "axios";
import { IoIosColorPalette } from "react-icons/io";
export default function Page() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); // New state for image preview
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // Set preview URL
    setError(""); // Clear any previous errors
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/color-palette/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setColors(response.data.colors);
      setError(""); // Clear any previous error
    } catch (error) {
      console.error("Error fetching color palette:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="text-left w-full">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <IoIosColorPalette className="text-indigo-500 text-5xl" />
          <h2 className="text-gray-900">Color Palette Generator</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Upload an image to extract colors and get their color codes.
        </p>
      </div>
      <div className="bg-white rounded-md p-6 w-full mt-5">
        <div className="p-6 border border-dashed w-full mt-5">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-4"
          />
          <button
            onClick={handleUpload}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            disabled={loading}
          >
            {loading ? "Processing..." : "Generate Palette"}
          </button>
        </div>

        {/* Display image preview */}
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-1/4 h-1/4 rounded-md border border-gray-200"
            />
          </div>
        )}

        {error && <div className="text-sm text-red-600 mt-4">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-5">
          {colors.map((color, index) => (
            <div
              key={index}
              className="p-4 rounded-md border border-gray-200"
              style={{
                backgroundColor: color,
                color: color === "#ffffff" ? "#000000" : "#ffffff",
              }}
            >
              <p className="text-sm">{color}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
