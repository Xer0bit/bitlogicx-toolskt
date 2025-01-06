"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchTools = async (category) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tools/${
          category === "all" ? "getall/active" : `getall/${category.id}`
        }`
      );
      console.log(response.data);
      setTools(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tools/categories/getall/`
        );
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
    fetchTools("all");
  }, []);

  // Add search filter function
  useEffect(() => {
    const filtered = tools.filter((tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTools(filtered);
  }, [searchQuery, tools]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <div className="max-w-8xl mx-auto p-4 lg:p-8">
        {/* Header Section */}
        <div className="text-center py-12 mb-8">
          
          {/* <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full mb-6" /> */}
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Find the perfect tools to enhance your development workflow
          </p>
          
          {/* Add Search Bar */}
          <div className="max-w-2xl mx-auto mt-8 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300 opacity-75" />
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search for tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-slate-800/50 border border-slate-700/50 rounded-lg 
                          text-white placeholder-slate-400 focus:outline-none focus:ring-2 
                          focus:ring-yellow-400/50 focus:border-transparent backdrop-blur-xl"
              />
              <svg
                className="absolute right-4 w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar - Making it more compact and sticky */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 shadow-xl">
              <h2 className="text-xl font-semibold mb-6 text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                Categories
              </h2>
              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    fetchTools("all");
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 
                    ${selectedCategory === "all" 
                      ? "bg-yellow-400/20 text-yellow-300 border-l-4 border-yellow-400" 
                      : "hover:bg-gray-700/50 text-gray-300 hover:text-yellow-300"
                    }`}
                >
                  All Tools
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.name);
                      fetchTools(category);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300
                      ${selectedCategory === category.name 
                        ? "bg-yellow-400/20 text-yellow-300 border-l-4 border-yellow-400" 
                        : "hover:bg-gray-700/50 text-gray-300 hover:text-yellow-300"
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tools Grid - Improved layout and spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
            {filteredTools.length > 0 ? (
              filteredTools?.map((tool, index) => (
                <Link
                  key={tool.id}
                  href={`/category/tool/${tool.slug}/`}
                  className={`group ${index % 3 === 1 ? 'sm:translate-y-4' : ''}`}
                >
                  <div className="relative bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-yellow-500/10">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative p-6">
                      {/* Icon and Title Section */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center">
                            <div className="absolute inset-0 blur-md bg-yellow-400/20" />
                            <svg className="w-6 h-6 text-yellow-400 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white group-hover:text-yellow-300 transition-colors">
                            {tool.name}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                        {tool.desc}
                      </p>

                      {/* Action Button */}
                      <div className="pt-4 border-t border-slate-700/50">
                        <Button className="w-full bg-slate-700/50 hover:bg-yellow-400 text-yellow-300 hover:text-slate-900 transition-all duration-300">
                          <span className="mr-2">Try it now</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="inline-block p-4 rounded-full bg-yellow-400/10 mb-4">
                  <svg
                    className="w-8 h-8 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No tools found</h3>
                <p className="text-slate-400">Try adjusting your search query</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
