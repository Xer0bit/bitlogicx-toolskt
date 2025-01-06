"use client";
import Categories from "@/components/Categories";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Signup from "@/components/Signup";
import Login from "@/components/Login";
import HomeTools from "@/components/HomeTools";
import { TbFileTypePdf } from "react-icons/tb";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  return (
    <div className="text-white bg-slate-950">
      <Signup />
      <Login />
      <Navbar pathname={"/"} />

      <div className="bg-gray-800 py-12 md:py-16 lg:py-20 ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-300 mb-4">
                Scriptro
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
                Your Toolkit for Digital Success
              </h2>
              <p className="text-base sm:text-lg text-gray-300 mb-6">
                Scriptro is a comprehensive collection of useful tools designed
                to enhance productivity and simplify various tasks. It offers a
                range of utilities from image processing to text manipulation,
                catering to diverse user needs.
              </p>
              <Link
                href={"/category"}
                className={`inline-block bg-transparent hover:bg-yellow-300 text-yellow-300 hover:text-black font-semibold py-2 px-6 border border-yellow-300 hover:border-transparent rounded-lg transition duration-300`}
              >
                Explore Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-gray-900 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-yellow-300 mb-8">
            Popular Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/tools/pdf-editor"
              className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-colors duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                PDF Editor
              </h3>
              <p className="text-gray-300">
                Edit and manipulate PDF files easily
              </p>
            </Link>
            <Link
              href="/tools/image-background-remover"
              className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-colors duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                Background Remover
              </h3>
              <p className="text-gray-300">Remove image backgrounds with AI</p>
            </Link>
            <Link
              href="/tools/text-to-speech"
              className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-colors duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                Text to Speech
              </h3>
              <p className="text-gray-300">
                Convert text to natural-sounding audio
              </p>
            </Link>
            <Link
              href="/tools/qr-code-generator"
              className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-colors duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                QR Code Generator
              </h3>
              <p className="text-gray-300">Create custom QR codes quickly</p>
            </Link>
            <Link
              href="/tools/file-converter"
              className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-colors duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                File Converter
              </h3>
              <p className="text-gray-300">
                Convert files between various formats
              </p>
            </Link>
            <Link
              href="/tools/password-generator"
              className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-colors duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                Password Generator
              </h3>
              <p className="text-gray-300">Generate strong, secure passwords</p>
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-gray-800 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-yellow-300 mb-8">
            Our Featured Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg">
              <TbFileTypePdf className="w-12 h-12 text-yellow-300 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Rich PDF Editor
              </h3>
              <p className="text-gray-300">
                Edit, annotate, and manipulate PDF files with ease.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <svg
                className="w-12 h-12 text-yellow-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">
                Image Background Remover
              </h3>
              <p className="text-gray-300">
                Remove backgrounds from images with AI-powered precision.
              </p>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg">
              <svg
                className="w-12 h-12 text-yellow-300 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-white mb-2">
                Text to Audio
              </h3>
              <p className="text-gray-300">
                Convert written text into natural-sounding audio files.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-yellow-300 mb-8">
            Why Choose scriptro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">
                75+ Digital Tools
              </h3>
              <p className="text-gray-300">
                Access a comprehensive suite of over 75 digital tools to boost
                your productivity.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">
                User-Friendly Interface
              </h3>
              <p className="text-gray-300">
                Navigate our intuitive platform with ease, designed for both
                beginners and professionals.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-2">
                Constantly Updating
              </h3>
              <p className="text-gray-300">
                We regularly add new tools and improve existing ones to meet
                evolving digital needs.
              </p>
            </div>
          </div>
        </div>
      </section>
      

      <section className="bg-gray-800 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-6">
            Ready to Supercharge Your Workflow?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of satisfied users who have transformed their digital
            tasks with scriptro.
          </p>
          <Link
            href="/category"
            className="inline-block bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-3 px-8 rounded-lg transition duration-300"
          >
            Explore All Tools
          </Link>
        </div>
      </section>
    </div>
  );
}
