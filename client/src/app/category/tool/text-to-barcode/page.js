"use client";
import { useState } from "react";
import { IoBarcodeOutline } from "react-icons/io5";
import axios from "axios";

export default function Page() {
  const [text, setText] = useState("");
  const [barcodeImage, setBarcodeImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleConvert = async (event) => {
    event.preventDefault();
    if (!text) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/text-to-barcode/`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setBarcodeImage(response.data.barcode_image);
    } catch (error) {
      console.error("Error generating barcode:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="text-left">
          <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
            <IoBarcodeOutline />
            <h2 className="text-gray-900">Text To Barcode Generator</h2>
          </div>
          <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
            Easily generate a barcode from your text.
          </p>
        </div>
        <div className="bg-background rounded-lg border p-6 w-full mt-5">
          <form className="space-y-4" onSubmit={handleConvert}>
            <div>
              <label htmlFor="text" className="block mb-1 text-sm font-medium">
                Enter Text
              </label>
              <textarea
                id="text"
                value={text}
                onChange={handleTextChange}
                className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows="4"
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Barcode"}
            </button>
          </form>
          {barcodeImage && (
            <div className="mt-4">
              <img
                src={`data:image/png;base64,${barcodeImage}`}
                alt="Barcode"
                className="w-1/5"
              />
              <a
                href={`data:image/png;base64,${barcodeImage}`}
                download="barcode.png"
                className="inline-flex justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Download Barcode
              </a>
            </div>
          )}
          {!barcodeImage && (
            <p className="mt-4 text-sm text-muted-foreground">
              The generated barcode will be available for download once the
              generation is complete.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
