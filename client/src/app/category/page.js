"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
    fetchTools("all");
  }, []);

  useEffect(() => {
    const filtered = tools.filter((tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTools(filtered);
  }, [searchQuery, tools]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header Section */}
        <div className="relative text-center py-16 mb-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl opacity-30" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
              Developer Tools
            </span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
            Find the perfect tools to enhance your development workflow
          </p>

          {/* Category Filter Menu */}
          <div className="relative mb-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    fetchTools("all");
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300
                    ${selectedCategory === "all"
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 font-semibold shadow-lg shadow-yellow-500/25"
                      : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-yellow-400"
                    }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  All Tools
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.name);
                      fetchTools(category);
                    }}
                    className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all duration-300
                      ${selectedCategory === category.name
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-slate-900 font-semibold shadow-lg shadow-yellow-500/25"
                        : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-yellow-400"
                      }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-900 to-transparent" />
          </div>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 to-yellow-600/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-75" />
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Search for tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-8 py-5 bg-slate-800/60 border border-slate-700/50 rounded-2xl 
                          text-white placeholder-slate-400 focus:outline-none focus:ring-2 
                          focus:ring-yellow-400/50 focus:border-transparent backdrop-blur-xl
                          transition-all duration-300"
              />
              <div className="absolute right-4 p-2 bg-yellow-400/20 rounded-xl">
                <svg
                  className="w-6 h-6 text-yellow-400"
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
        </div>

        {/* Enhanced Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.length > 0 ? (
            filteredTools?.map((tool) => (
              <Link
                key={tool.id}
                href={`/category/tool/${tool.slug}/`}
                className="group transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="h-full relative bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-yellow-500/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative p-6">
                    {/* Tool Content */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <div className="absolute inset-0 blur-md bg-yellow-400/20" />
                          <svg className="w-7 h-7 text-yellow-400 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white group-hover:text-yellow-300 transition-colors duration-300">
                          {tool.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {tool.desc}
                    </p>

                    <div className="pt-4 border-t border-slate-700/50">
                      <Button className="w-full bg-slate-700/50 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 text-yellow-300 hover:text-slate-900 transition-all duration-500">
                        <span className="mr-2">Explore Tool</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  );
}
