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
import CreateSubscription from "./create-subscription";

export default function ManageSubscriptions() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [showCreateSubscriptionForm, setShowCreateSubscriptionForm] =
    useState(false);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/subscription/getall/"
      );
      setSubscriptions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      setLoading(false);
    }
  };

  const deleteSubscription = async (subscription) => {
    try {
      await axios.delete(
        `http://localhost:5000/subscription/delete/${subscription.id}`
      );
      fetchSubscriptions();
    } catch (error) {
      console.error("Error deleting subscription:", error);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Initialize Fuse.js with configuration
  const fuse = new Fuse(subscriptions, {
    keys: ["user_email", "plan_name"], // Search by user email and plan name
    includeScore: true,
    threshold: 0.2, // Adjust for fuzziness; lower value means more precise
  });

  // Search and filter subscriptions
  const filteredSubscriptions = useMemo(() => {
    if (!search) return subscriptions;
    return fuse.search(search).map((result) => result.item);
  }, [search, subscriptions]);

  // Pagination logic
  const totalPages = Math.ceil(filteredSubscriptions.length / pageSize);
  const paginatedSubscriptions = filteredSubscriptions.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Handle edit subscription
  const handleEditSubscription = (subscription) => {
    setSelectedSubscription(subscription);
    setShowCreateSubscriptionForm(true);
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {showCreateSubscriptionForm && (
        <CreateSubscription
          subscription={selectedSubscription}
          onCancel={() => {
            setShowCreateSubscriptionForm(false);
            setSelectedSubscription(null);
          }}
          onSubscriptionCreated={fetchSubscriptions}
        />
      )}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search by user email or plan name..."
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
            onClick={() => {
              setShowCreateSubscriptionForm(true);
              setSelectedSubscription(null);
            }}
            className="bg-indigo-500 hover:bg-indigo-600 duration-300"
          >
            Create Subscription
          </Button>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Subscriptions</CardTitle>
          <CardDescription>
            Here are the subscriptions of our website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : paginatedSubscriptions.length === 0 ? (
            <p>No subscriptions to show</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium">
                      {subscription.user_email}
                    </TableCell>
                    <TableCell>{subscription.plan_name}</TableCell>
                    <TableCell>
                      {new Date(subscription.end_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {subscription.is_active ? "Active" : "Inactive"}
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
                          <DropdownMenuItem
                            onClick={() => handleEditSubscription(subscription)}
                          >
                            Edit Subscription
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => deleteSubscription(subscription)}
                          >
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
