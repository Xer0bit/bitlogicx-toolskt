import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { Search, MoreVertical } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CreateTool from "./create-tool";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

export default function Tools() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [tools, setTools] = useState([]);
  const [showCreateTool, setShowCreateTool] = useState(false);
  const [editTool, setEditTool] = useState(null);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await axios.get("http://localhost:5000/tools/getall/");
      if (response.status === 200) {
        setTools(response.data);
      }
    } catch (error) {
      console.error("Error fetching tools:", error);
    }
  };

  const handleToolCreated = () => {
    fetchTools();
    setShowCreateTool(false); // Hide the form after creation
    setEditTool(null); // Clear the editTool state
  };

  const handleEditTool = (tool) => {
    setEditTool(tool);
    setShowCreateTool(true);
  };

  const deleteTool = async (tool) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/tools/delete/${tool.id}`
      );
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Tool deleted successfully",
          status: "success",
        });
        setTools((prevTools) => prevTools.filter((t) => t.id !== tool.id));
        fetchTools();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error deleting the tool",
        status: "error",
      });
    }
  };

  const toggleToolStatus = async (tool) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/tools/patch/${tool.id}`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        setTools((prevTools) =>
          prevTools.map((t) =>
            t.id === tool.id ? { ...t, is_enabled: !t.is_enabled } : t
          )
        );
        toast({
          title: "Success",
          description: `Tool ${
            response.data.is_enabled ? "activated" : "deactivated"
          } successfully`,
          status: "success",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error toggling the tool status",
        status: "error",
      });
    }
  };

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

  // Pagination logic
  const totalPages = Math.ceil(filteredTools.length / pageSize);
  const paginatedTools = filteredTools.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

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
        <Button
          className="bg-indigo-500 hover:bg-indigo-600 duration-300"
          onClick={() => setShowCreateTool(true)} // Show the Create Tool form
        >
          Create Tool
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Tools</CardTitle>
          <CardDescription>
            Here are the tools available on our website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTools.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell className="font-medium">{tool.name}</TableCell>
                  <TableCell>{tool.desc}</TableCell>
                  <TableCell>{tool.usage_count}</TableCell>
                  <TableCell
                    className={`${tool.is_enabled ? "" : "text-red-500"}`}
                  >
                    {tool.is_enabled ? "Active" : "Inactive"}
                  </TableCell>
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
                        <DropdownMenuItem onClick={() => handleEditTool(tool)}>
                          Edit Tool
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => toggleToolStatus(tool)}
                        >
                          {tool.is_enabled
                            ? "Deactivate Tool"
                            : "Activate Tool"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => deleteTool(tool)}>
                          Delete Permanently
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        {!search && (
          <CardFooter className="flex items-center justify-between">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      className={`border ${
                        page === i + 1 ? "bg-indigo-500 text-white" : ""
                      }`}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        )}
      </Card>
      {showCreateTool && (
        <CreateTool
          tool={editTool} // Pass the editTool state here
          onCancel={() => {
            setShowCreateTool(false);
            setEditTool(null); // Clear the editTool state when canceling
          }}
          onSuccess={handleToolCreated}
        />
      )}
    </div>
  );
}
