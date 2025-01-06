"use client";
import { useState, useEffect } from "react";
import { HiMiniVideoCamera } from "react-icons/hi2";
import axios from "axios";
import Cookies from "js-cookie";

export default function Page() {
  const [videoFile, setVideoFile] = useState(null);
  const [compressedVideoUrl, setCompressedVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleCompress = async (event) => {
    event.preventDefault();
    if (!videoFile) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", videoFile);

    try {
      const csrfToken = Cookies.get("csrftoken");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/video-compress/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-CSRFToken": csrfToken,
          },
        }
      );

      setCompressedVideoUrl(response.data.compressed_video_url);
      setFileName(videoFile.name);
    } catch (error) {
      console.error("Error compressing video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="text-left">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <HiMiniVideoCamera />
          <h2 className="text-gray-900">Video Compressor</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Easily compress video files with our powerful tool.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form className="space-y-4" onSubmit={handleCompress}>
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
            {loading ? "Processing..." : "Compress Video"}
          </button>
        </form>
        {compressedVideoUrl && (
          <div className="mt-4">
            <p className="mt-4 text-sm text-muted-foreground">
              Compressed video is available for download.
            </p>
            <a
              href={`http://127.0.0.1:5000/${compressedVideoUrl}`}
              download="compressed-video.mp4"
              className="inline-flex justify-center mt-4 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Download Video
            </a>
          </div>
        )}
        {!compressedVideoUrl && (
          <p className="mt-4 text-sm text-muted-foreground">
            The compressed video file will be available for download once the
            compression is complete.
          </p>
        )}
      </div>
    </div>
  );
}
