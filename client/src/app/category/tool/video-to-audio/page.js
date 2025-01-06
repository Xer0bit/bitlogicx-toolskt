"use client";
import { useState } from "react";
import { HiMiniVideoCamera } from "react-icons/hi2";
import axios from "axios";

export default function Page() {
  const [videoFile, setVideoFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleConvert = async (event) => {
    event.preventDefault();
    if (!videoFile) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", videoFile);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/video-to-audio/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "arraybuffer",
        }
      );
      const audioData = Buffer.from(response.data, "binary").toString("base64");
      const audioBase64 = `data:audio/mp3;base64,${audioData}`;
      setAudioFile(audioBase64);
    } catch (error) {
      console.error("Error converting video to audio:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="text-left">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <HiMiniVideoCamera />
          <h2 className="text-gray-900">Video To Audio Converter</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Easily convert video to audio with our powerful tool.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form className="space-y-4" onSubmit={handleConvert}>
          <div>
            <label htmlFor="video" className="block mb-1 text-sm font-medium">
              Upload Video
            </label>
            <input
              type="file"
              id="video"
              accept="video/*"
              onChange={handleVideoChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4"
            disabled={loading}
          >
            {loading ? "Processing..." : "Convert to Audio"}
          </button>
        </form>
        {audioFile && (
          <div className="mt-4">
            <audio controls src={audioFile} className="w-full"></audio>
            <a
              href={audioFile}
              download="converted-audio.mp3"
              className="inline-flex justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Download Audio
            </a>
          </div>
        )}
        {!audioFile && (
          <p className="mt-4 text-sm text-muted-foreground">
            The converted audio file will be available for download once the
            conversion is complete.
          </p>
        )}
      </div>
    </div>
  );
}
