"use client";
import { useState } from "react";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import axios from "axios";

export default function Page() {
  const [text, setText] = useState("");
  const [shape, setShape] = useState("circle");
  const [icon, setIcon] = useState("none");
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleShapeChange = (e) => {
    setShape(e.target.value);
  };

  const handleIconChange = (e) => {
    setIcon(e.target.value);
  };

  const handleGenerateLogo = async (event) => {
    event.preventDefault();
    if (!text) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/logo-maker/`,
        { text, shape, icon },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //console.log(response.data);
      setLogo(`data:image/png;base64,${response.data}`);
    } catch (error) {
      console.error("Error generating logo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="text-left">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <HiOutlineViewGridAdd />
          <h2 className="text-gray-900">Logo Maker</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Create simple logos using text, shapes, and icons.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form className="space-y-4" onSubmit={handleGenerateLogo}>
          <div>
            <label htmlFor="text" className="block mb-1 text-sm font-medium">
              Enter Text
            </label>
            <input
              id="text"
              value={text}
              onChange={handleTextChange}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div>
            <label htmlFor="shape" className="block mb-1 text-sm font-medium">
              Select Shape
            </label>
            <select
              id="shape"
              value={shape}
              onChange={handleShapeChange}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="circle">Circle</option>
              <option value="square">Square</option>
              <option value="triangle">Triangle</option>
            </select>
          </div>
          <div>
            <label htmlFor="icon" className="block mb-1 text-sm font-medium">
              Select Icon
            </label>
            <select
              id="icon"
              value={icon}
              onChange={handleIconChange}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="none">None</option>
              <option value="star">Star</option>
              <option value="heart">Heart</option>
              <option value="bolt">Bolt</option>
            </select>
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Logo"}
          </button>
        </form>
        {logo && (
          <div className="mt-4">
            <img
              src={logo}
              alt="Generated Logo"
              className="w-full h-auto rounded-md border border-gray-200"
            />
            <a
              href={logo}
              download="logo.png"
              className="inline-flex justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Download Logo
            </a>
          </div>
        )}
        {!logo && (
          <p className="mt-4 text-sm text-muted-foreground">
            The generated logo will be available for download once the
            generation is complete.
          </p>
        )}
      </div>
    </div>
  );
}
