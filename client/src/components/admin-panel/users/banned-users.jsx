"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Fuse from "fuse.js";
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import CreateUser from "./create-user";

export default function BannedUsers() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showCreateUserForm, setShowCreateUserForm] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/getall");
      // Filter users to include only those with is_active: false
      const inactiveUsers = response.data.filter((user) => !user.is_active);
      setUsers(inactiveUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (user) => {
    //console.log(user.email);
    try {
      const response = await axios.delete(
        `http://localhost:5000/users/delete/${user.email}`
      );
      //console.log(response.data);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  const isActiveUser = async (user) => {
    //console.log(user.email);
    try {
      const response = await axios.post(
        `http://localhost:5000/users/is_active/${user.email}`
      );
      //console.log(response.data);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  useEffect(() => {
    // Fetch users from Django API
    axios
      .get("http://localhost:5000/users/getall/")
      .then((response) => {
        //console.log(response.data);
        const inactiveUsers = response.data.filter((user) => !user.is_active);

        setUsers(inactiveUsers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the users!", error);
        setLoading(false);
      });
  }, []);

  // Initialize Fuse.js with configuration
  const fuse = new Fuse(users, {
    keys: ["username", "email"], // Search by username and email
    includeScore: true,
    threshold: 0.2, // Adjust for fuzziness; lower value means more precise
  });

  // Search and filter users
  const filteredUsers = useMemo(() => {
    if (!search) return users;
    return fuse.search(search).map((result) => result.item);
  }, [search, users]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  // Determine role class and status class
  const getRoleClass = (isAdmin) => (isAdmin ? "text-indigo-500" : "");
  const getStatusClass = (status) =>
    status === "active" ? "text-green-500" : "text-red-500";

  // Handle edit user
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowCreateUserForm(true);
  };

  return (
    <div className="container mx-auto p-4">
      {showCreateUserForm && (
        <CreateUser
          user={selectedUser}
          onCancel={() => {
            setShowCreateUserForm(false);
            setSelectedUser(null);
          }}
          onUserCreated={fetchUsers}
        />
      )}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search by name or email..."
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
            onClick={() => {
              setShowCreateUserForm(true);
              setSelectedUser(null);
            }}
            className="bg-indigo-500 hover:bg-indigo-600 duration-300"
          >
            Create User
          </Button>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Banned Users</CardTitle>
          <CardDescription>
            Here are the banned users of our website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : paginatedUsers.length === 0 ? (
            <p>No users to show</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead> {/* New header for actions */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.username}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell
                      className={`${getRoleClass(user.is_admin)} px-4 py-2`}
                    >
                      {user.is_admin ? "Super Admin" : ""}
                    </TableCell>
                    <TableCell
                      className={`${getStatusClass(
                        user.is_active ? "active" : "inactive"
                      )} px-4 py-2`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell>{formatDate(user.date_joined)}</TableCell>
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
                            onClick={() => handleEditUser(user)}
                          >
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => isActiveUser(user)}>
                            {user.is_active
                              ? "Deactivate User"
                              : "Activate User"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => deleteUser(user)}>
                            Delete Permanently
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {totalPages > 1 && (
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
    </div>
  );
}
