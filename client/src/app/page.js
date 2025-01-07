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
    <div className="flex flex-col min-h-screen text-white bg-gradient-to-b from-slate-950 to-slate-900">
      <Signup />
      <Login />
      <Navbar pathname={"/"} />

      <main className="flex-grow">
        {/* Enhanced Hero Section */}
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>

          <div className="container mx-auto px-4 py-32 sm:px-6 lg:px-8 relative">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="w-full lg:w-1/2 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 animate-gradient">
                      Scriptro
                    </span>
                  </h1>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 leading-tight">
                    Elevate Your Digital Experience
                  </h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-yellow-300 to-amber-500"></div>
                </div>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Experience premium digital tools crafted for excellence. Transform your workflow with our sophisticated suite of utilities designed for modern professionals.
                </p>
                <div className="flex gap-6">
                  <Link
                    href="/category"
                    className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition duration-300 ease-out border-2 border-yellow-400 rounded-full shadow-md text-xl"
                  >
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-gradient-to-r from-yellow-300 to-amber-400 group-hover:translate-x-0 ease">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-yellow-300 transition-all duration-300 transform group-hover:translate-x-full ease">
                      Explore Tools
                    </span>
                    <span className="relative invisible">Explore Tools</span>
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-300 hover:text-yellow-300 transition-colors duration-300"
                  >
                    Learn More
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="w-full lg:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 to-amber-500/20 rounded-lg blur-3xl"></div>
                <div className="relative glass-card p-8 rounded-lg border border-yellow-500/20 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="p-4 bg-white/5 rounded-lg border border-yellow-500/10 hover:border-yellow-500/30 transition-colors duration-300">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-300 to-amber-500 mb-4"></div>
                        <div className="h-4 w-3/4 bg-white/10 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Tools Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                Popular Tools
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Tool cards with enhanced styling */}
              {[
                /* Replace existing tool cards with enhanced versions */
                {
                  title: "QR Code Generator",
                  description: "Get QR codes for your text quickly",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm8 0h8v4h-4v4h-4V4zm2 2v2h2V6h-2zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm8 0h2v2h-2v-2zm2 0h2v2h2v2h-2v2h-2v-2h-2v-2h2v-2zm2 2v2h-2v-2h2z" />
                    </svg>
                  ),
                  href: "category/tool/text-to-qr"
                },
                {
                  title: "Image Background Remover",
                  description: "Remove image backgrounds with AI",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path d="M19 6h-3V5a3 3 0 1 0-6 0v1H7a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3zM10 5a1 1 0 1 1 2 0v1h-2V5zm10 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v10z" />
                    </svg>
                  ),
                  href: "category/tool/image-background-remover"
                },
                {
                  title: "Text to Audio",
                  description: "Convert text to natural-sounding audio",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path d="M3 5v14h2V5H3zm14 0v14h2V5h-2zm-4 1v12h2V6h-2zm4 0v10h2V6h-2zm-8 1v10h2V7H9zm4 1v8h2V8h-2z" />
                    </svg>
                  ),
                  href: "category/tool/text-to-audio"
                },
                {
                  title: "PDF TO Word Converter",
                  description: "Convert PDF files to Word documents",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16h-4v-1.5h4V18zm0-3h-4v-1.5h4V15zm0-3h-4v-1.5h4V12zm-5.5 6h-1l-1.72-4.24h-.05L6.5 18h-1.05l2.14-6h1.27l2.14 6h-1.05zm.5-7.5h-4V8h4v1.5z" />
                    </svg>
                  ),
                  href: "category/tool/pdf-to-word"
                },
                {
                  title: "JPG to PNG Converter",
                  description: "Convert image formats in seconds",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 18H8v-2h8v2zm0-4H8v-2h8v2zm-2-8V3.5L18.5 10H14z" />
                    </svg>
                  ),
                  href: "category/tool/jpg-to-png"
                },
                {
                  title: "Password Generator",
                  description: "Generate strong, secure passwords",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path d="M12 2a6 6 0 0 0-6 6v4H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1V8a6 6 0 0 0-6-6zm0 2a4 4 0 0 1 4 4v4H8V8a4 4 0 0 1 4-4zm-4 10h8v6H8v-6z" />
                    </svg>
                  ),
                  href: "/category/tool/password-generator"
                }
              ].map((tool, index) => (
                <Link
                  key={index}
                  href={tool.href}
                  className="group p-6 bg-slate-800/50 rounded-xl hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-slate-700/50"
                >
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-semibold text-yellow-300 mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-100 transition-colors">
                    {tool.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
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

        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-yellow-300/10 to-transparent"></div>
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-4xl font-bold text-yellow-300 mb-6">
              Ready to Transform Your Workflow?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust Scriptro for their daily digital needs.
            </p>
            <Link
              href="/category"
              className="inline-flex items-center px-8 py-3 text-lg font-semibold text-black bg-yellow-300 rounded-full hover:bg-yellow-400 transition-colors duration-300"
            >
              Explore All Tools
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
