"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SquareX } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateTool({ tool, onCancel, onToolCreated }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const [slug, setSlug] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [freeLimit, setFreeLimit] = useState("");
  const [freeMbLimit, setFreeMbLimit] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/tools/categories/getall/"
        );
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "There was an error fetching categories",
          status: "error",
        });
      }
    };

    fetchCategories();

    if (tool) {
      setName(tool.name || "");
      setName(tool.desc || "");
      setSlug(tool.slug || "");
      setIsEnabled(tool.is_enabled || false);
      setFreeLimit(tool.free_limit || "");
      setFreeMbLimit(tool.free_mb_limit || "");
      setCategory(tool.category || "");
      // Optionally set image preview if needed
    }
  }, [tool]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("slug", slug);
      formData.append("is_enabled", isEnabled);
      formData.append("free_limit", freeLimit);
      formData.append("free_mb_limit", freeMbLimit);
      formData.append("category", category);
      if (image) {
        formData.append("image", image);
      }

      let response;
      if (tool) {
        response = await axios.put(
          `http://localhost:5000/tools/update/${tool.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/tools/post/",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Success",
          description: `Tool ${tool ? "updated" : "created"} successfully`,
          status: "success",
        });
        setShowForm(false);
        onCancel();
        onToolCreated();
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast({
          title: "Error",
          description: "Tool already exists",
          status: "error",
        });
      } else {
        toast({
          title: "Error",
          description: "There was an error creating/updating the tool",
          status: "error",
        });
      }
    }
  };

  return (
    <>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <Toaster />
          <Card className="relative w-full px-10 py-6 max-w-lg mx-auto">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-indigo-500">
                {tool ? "Edit Tool" : "Create Tool"}
              </CardTitle>
              <Button
                className="absolute top-2 right-2"
                variant="ghost"
                onClick={onCancel}
              >
                <SquareX />
              </Button>
            </CardHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Description</Label>
                <Textarea
                  type="text"
                  id="desc"
                  placeholder="Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  type="text"
                  id="slug"
                  placeholder="Slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories</SelectLabel>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isEnabled"
                  checked={isEnabled}
                  onCheckedChange={(checked) => setIsEnabled(checked)}
                />
                <Label htmlFor="isEnabled">Is Enabled</Label>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="freeLimit">Free Limit</Label>
                <Input
                  type="text"
                  id="freeLimit"
                  placeholder="Free Limit"
                  value={freeLimit}
                  onChange={(e) => setFreeLimit(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="freeMbLimit">Free MB Limit</Label>
                <Input
                  type="text"
                  id="freeMbLimit"
                  placeholder="Free MB Limit"
                  value={freeMbLimit}
                  onChange={(e) => setFreeMbLimit(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="image">Image</Label>
                <Input
                  type="file"
                  id="image"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
              <Button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 duration-300"
              >
                {tool ? "Update Tool" : "Create Tool"}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
