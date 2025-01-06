"use client";
import axios from "axios";
import { useEffect, useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategoryName.trim() !== "" && newCategoryDescription.trim() !== "") {
      if (editingCategoryId) {
        updateCategory({
          id: editingCategoryId,
          name: newCategoryName,
          desc: newCategoryDescription,
        });
      } else {
        createCategory();
      }
    }
  };

  const fetchCategories = async () => {
    const response = await axios.get(
      "http://localhost:5000/tools/categories/getall/"
    );
    setCategories(response.data);
  };

  const createCategory = async () => {
    await axios.post("http://localhost:5000/tools/category/post/", {
      name: newCategoryName,
      desc: newCategoryDescription,
    });
    setNewCategoryName("");
    setNewCategoryDescription("");
    fetchCategories();
  };

  const deleteCategory = async (category) => {
    try {
      await axios.delete(
        `http://localhost:5000/tools/category/delete/${category.id}`
      );
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const updateCategory = async (category) => {
    try {
      await axios.put(
        `http://localhost:5000/tools/category/update/${category.id}`,
        {
          name: category.name,
          desc: category.desc,
        }
      );
      setEditingCategoryId(null);
      setNewCategoryName("");
      setNewCategoryDescription("");
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategoryId(category.id);
    setNewCategoryName(category.name);
    setNewCategoryDescription(category.desc);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4">
        <Card className="w-1/2 h-fit">
          <CardHeader>
            <CardTitle>
              {editingCategoryId ? "Edit Category" : "Add New Category"}
            </CardTitle>
            <CardDescription>
              {editingCategoryId
                ? "Update the details of the selected category."
                : "Use the form below to add a new category."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddCategory}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Category Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-3"
                >
                  Category Description
                </label>
                <Input
                  id="description"
                  type="text"
                  placeholder="Enter category description"
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="mt-2 bg-indigo-500 hover:bg-indigo-600 duration-300"
              >
                {editingCategoryId ? "Update Category" : "Add Category"}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="w-1/2">
          <CardHeader>
            <CardTitle>Manage Categories</CardTitle>
            <CardDescription>
              Here are all the categories available.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories?.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell className="line-clamp-1">
                      {category.desc}
                    </TableCell>
                    <TableCell>{category.tools_count}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => handleEditCategory(category)}
                          >
                            Edit Category
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => deleteCategory(category)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
