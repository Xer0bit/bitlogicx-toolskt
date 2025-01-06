"use client";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomeTools() {
  const [tools, setTools] = useState([]);

  const fetchRandomTools = async () => {
    try {
      const response = await axios.get(`${apiUrl}tools/getall/`);
      const three = response.data;
      setTools(three.slice(0, 3));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRandomTools();
  }, []);

  return (
    <div className="mx-auto mt-16 min-h-screen py-32 px-4 md:px-28">
      <h2 className="text-3xl font-bold mb-4">Featured Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {tools?.map((tool) => (
          <Link
            key={tool.id}
            href={`/category/tool/${tool.slug}/`}
            className="rounded-lg hover:border-indigo-500 border cursor-pointer duration-300 h-fit shadow-sm overflow-hidden"
          >
            <img
              src={`http://127.0.0.1:5000${tool.image}`}
              alt={tool.name}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white">
              <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
              <p className="text-sm line-clamp-1 text-muted-foreground mb-4">
                {tool.desc}
              </p>
              <Link href={`/category/tool/${tool.slug}/`}>
                <Button
                  variant="outline"
                  className="w-full hover:bg-indigo-300 hover:text-background duration-300"
                >
                  Use Now
                </Button>
              </Link>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
