"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [tools, setTools] = useState([]);
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

  return (
    <div className="mx-auto min-h-screen p-4 sm:p-6 bg-gray-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
        <div className="bg-gray-800 rounded-lg shadow-sm p-4 border border-yellow-300 lg:sticky lg:top-4 lg:h-fit">
          <h2 className="text-xl font-bold mb-4 text-yellow-300">Categories</h2>
          <nav className="flex flex-wrap lg:grid gap-2">
            <button
              className={`px-4 py-2 rounded-md transition-colors duration-300 mb-2 lg:mb-0 w-full lg:w-auto ${
                selectedCategory === "all"
                  ? "bg-yellow-300 text-black"
                  : "text-white hover:bg-yellow-300 hover:text-black"
              } ${
                selectedCategory === "all"
                  ? ""
                  : "border-b border-gray-600 lg:border-b-0"
              }`}
              onClick={() => {
                setSelectedCategory("all");
                fetchTools("all");
              }}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-md transition-colors duration-300 w-full lg:w-auto ${
                  selectedCategory === category.name
                    ? "bg-yellow-300 text-black"
                    : "text-white hover:bg-yellow-300 hover:text-black"
                } ${
                  selectedCategory === category.name
                    ? ""
                    : "border-b border-gray-600 lg:border-b-0"
                }`}
                onClick={() => {
                  setSelectedCategory(category.name);
                  fetchTools(category);
                }}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {tools?.map((tool) => (
            <Link
              key={tool.id}
              href={`/category/tool/${tool.slug}/`}
              className="rounded-lg hover:border-yellow-300 border border-gray-700 cursor-pointer duration-300 shadow-sm overflow-hidden bg-gray-800 flex flex-col h-full"
            >
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold mb-2 text-yellow-300">
                  {tool.name}
                </h3>
                <p className="text-sm line-clamp-3 text-gray-300 mb-4 flex-grow">
                  {tool.desc}
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:bg-yellow-300 hover:text-black duration-300 border-yellow-300 text-yellow-300 mt-auto"
                >
                  Use Now
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
