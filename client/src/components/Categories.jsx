import React, { useState } from "react";
import Link from "next/link";

const Tools = ({ categories }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="min-h-screen bg-[#0A0F1C] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="text-yellow-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
            Developer Toolkit
          </span>
          <h1 className="text-6xl font-extrabold mb-6 text-white">
            Development <span className="text-yellow-400">Tools</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Supercharge your development workflow with our carefully curated collection of powerful tools
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
          {categories?.map((category, index) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className={`transform transition-all duration-300 hover:-translate-y-2 ${
                index % 3 === 1 ? 'md:translate-y-12' : ''
              }`}
            >
              <div
                className="relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-xl"
                onMouseEnter={() => setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Card Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative p-8">
                  {/* Category Icon */}
                  <div className="mb-6 inline-block">
                    <div className="relative">
                      <div className="absolute inset-0 blur-xl bg-yellow-400/20" />
                      <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-yellow-400 to-yellow-600 p-[2px]">
                        <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                          <svg
                            className="w-7 h-7 text-yellow-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            {/* ...existing svg path... */}
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-slate-400 line-clamp-2">
                      {category.desc}
                    </p>
                    
                    {/* Interactive Button */}
                    <div className="pt-4 flex items-center space-x-2 text-yellow-400 font-medium">
                      <span>Explore Tools</span>
                      <svg
                        className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Hover Effects */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 ${
                      hoveredId === category.id ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
