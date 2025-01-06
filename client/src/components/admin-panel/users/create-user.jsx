"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SquareX } from "lucide-react";

export default function CreateUser({ user, onCancel, onUserCreated }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setIsAdmin(user.is_admin || false);
      setPassword(""); // Password is not pre-filled for security reasons
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username,
        email,
        password: user ? undefined : password, // Do not send password if editing an existing user
        is_admin: isAdmin,
      };

      let response;
      if (user) {
        // Update user
        response = await axios.put(
          `http://localhost:5000/users/update/`,
          userData
        );
      } else {
        // Create user
        response = await axios.post(
          "http://localhost:5000/users/create/",
          userData
        );
      }

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Success",
          description: `User ${user ? "updated" : "created"} successfully`,
          status: "success",
        });
        setShowForm(false);
        onCancel();
        onUserCreated();
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast({
          title: "Error",
          description: "User already exists",
          status: "error",
        });
      } else {
        toast({
          title: "Error",
          description: "There was an error creating/updating the user",
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
          <Card className="relative w-full px-10 py-6 max-w-md mx-auto">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-indigo-500">
                {user ? "Edit User" : "Create User"}
              </CardTitle>
              <Button
                className="absolute top-2 right-2"
                variant="ghost"
                onClick={onCancel}
              >
                <SquareX />
              </Button>
            </CardHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={!!user} // Disable email input if editing a user
                />
              </div>
              {!user && (
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!user} // Password is required only for new users
                  />
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isAdmin"
                  checked={isAdmin}
                  onCheckedChange={(checked) => setIsAdmin(checked)}
                />
                <Label htmlFor="isAdmin">Super Admin</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isUser"
                  checked={!isAdmin}
                  onCheckedChange={(checked) => setIsAdmin(!checked)}
                />
                <Label htmlFor="isUser">User</Label>
              </div>
              <Button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 duration-300"
              >
                {user ? "Update User" : "Create User"}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
