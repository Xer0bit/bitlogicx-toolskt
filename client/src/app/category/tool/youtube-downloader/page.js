"use client";
import { useState } from "react";
import axios from "axios";
import { HiOutlineCalendar } from "react-icons/hi";

export default function Page() {
  const [videoUrl, setVideoUrl] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [videoError, setVideoError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleSearchVideo = async (event) => {
    event.preventDefault();
    if (!videoUrl) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/tools/youtube-downloader/",
        { url: videoUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: "blob", // Set response type to blob to handle file downloads
        }
      );

      const blob = new Blob([response.data], { type: "video/mp4" });
      const url = window.URL.createObjectURL(blob);
      const filename = response.headers["content-disposition"]
        ? response.headers["content-disposition"]
            .split("filename=")[1]
            .replace(/"/g, "")
        : "download.mp4";

      setDownloadUrl(url);
      setVideoError(null);
    } catch (error) {
      console.error("Error searching video:", error);
      setVideoError("Error searching video. Please try again later.");
      setDownloadUrl(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 container">
      <div className="text-left">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <HiOutlineCalendar />
          <h2 className="text-gray-900">YouTube Video Downloader</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Enter a YouTube video URL to download the video.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <form onSubmit={handleSearchVideo}>
          <div className="mb-4">
            <label
              htmlFor="videoUrl"
              className="block mb-1 text-sm font-medium"
            >
              Enter YouTube Video URL
            </label>
            <input
              type="text"
              id="videoUrl"
              value={videoUrl}
              onChange={handleVideoUrlChange}
              className="block w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            disabled={loading}
          >
            {loading ? "Loading..." : "Download Video"}
          </button>
        </form>
        {videoError && (
          <div className="mt-4">
            <p className="text-red-600">{videoError}</p>
          </div>
        )}
        {downloadUrl && (
          <div className="mt-4">
            <a
              href={downloadUrl}
              download
              className="inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Download Video
            </a>
          </div>
        )}
        {!downloadUrl && !videoError && (
          <p className="mt-4 text-sm text-muted-foreground">
            Results will be shown here once you search for a video.
          </p>
        )}
      </div>
    </div>
  );
}
