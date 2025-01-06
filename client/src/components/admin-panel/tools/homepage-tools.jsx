"use client";

import { useState, useMemo } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

export default function HomePageTools() {
  const [search, setSearch] = useState("");

  // Example tools data
  const tools = useMemo(
    () => [
      {
        id: 1,
        icon: "🖼️",
        name: "Image to Text",
        title: "Convert images to text",
        views: 100,
        status: "Active",
      },
      {
        id: 2,
        icon: "✏️",
        name: "Text to Image",
        title: "Convert text to images",
        views: 150,
        status: "Active",
      },
      {
        id: 3,
        icon: "🖼️",
        name: "PNG to JPG",
        title: "Convert PNG images to JPG",
        views: 90,
        status: "Inactive",
      },
      {
        id: 4,
        icon: "🖼️",
        name: "Background Remover",
        title: "Remove image backgrounds",
        views: 200,
        status: "Active",
      },
      {
        id: 5,
        icon: "🖼️",
        name: "HTML Viewer",
        title: "View HTML content",
        views: 120,
        status: "Active",
      },
      {
        id: 6,
        icon: "🖼️",
        name: "JSON to XML",
        title: "Convert JSON to XML format",
        views: 110,
        status: "Inactive",
      },
      {
        id: 7,
        icon: "🖼️",
        name: "PDF Converter",
        title: "Convert documents to PDF",
        views: 140,
        status: "Active",
      },
      {
        id: 8,
        icon: "🖼️",
        name: "URL Shortener",
        title: "Shorten long URLs",
        views: 95,
        status: "Inactive",
      },
      {
        id: 9,
        icon: "🖼️",
        name: "QR Code Generator",
        title: "Generate QR codes",
        views: 180,
        status: "Active",
      },
      {
        id: 10,
        icon: "🖼️",
        name: "Color Picker",
        title: "Pick colors from images",
        views: 130,
        status: "Inactive",
      },
    ],
    []
  );

  // Initialize Fuse.js with configuration
  const fuse = new Fuse(tools, {
    keys: ["name"], // Search only by name
    includeScore: true,
    threshold: 0.2, // Adjust for fuzziness; lower value means more precise
  });

  // Search and filter tools
  const filteredTools = useMemo(() => {
    if (!search) return tools;
    return fuse.search(search).map((result) => result.item);
  }, [search, tools]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm"
          />
          <Button className="bg-indigo-500 hover:bg-indigo-600 duration-300">
            Search
          </Button>
        </div>
        {!search && (
          <Button
            size=""
            className="bg-indigo-500 hover:bg-indigo-600 duration-300"
          >
            Add Tool
          </Button>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Homepage Tools</CardTitle>
          <CardDescription>
            Here are the homepage tools on our website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTools.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell>{tool.icon}</TableCell>
                  <TableCell className="font-medium">{tool.name}</TableCell>
                  <TableCell>{tool.title}</TableCell>
                  <TableCell>{tool.views}</TableCell>
                  <TableCell>{tool.status}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm">Use</Button>
                      <Button size="sm" variant="destructive">
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
