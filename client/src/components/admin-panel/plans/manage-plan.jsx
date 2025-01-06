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
import CreatePlan from "./create-plan";

export default function ManagePlans() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showCreatePlanForm, setShowCreatePlanForm] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:5000/subscription/plans/getall/"
      );
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setError("Failed to fetch plans. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (plan) => {
    try {
      await axios.delete(
        `http://localhost:5000/subscription/plan/delete/${plan.id}`
      );
      fetchPlans();
    } catch (error) {
      console.error("Error deleting plan:", error);
      setError("Failed to delete plan. Please try again.");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const fuse = new Fuse(plans, {
    keys: ["name", "description"],
    includeScore: true,
    threshold: 0.2,
  });

  const filteredPlans = useMemo(() => {
    if (!search) return plans;
    return fuse.search(search).map((result) => result.item);
  }, [search, plans]);

  const totalPages = Math.ceil(filteredPlans.length / pageSize);
  const paginatedPlans = filteredPlans.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

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

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setShowCreatePlanForm(true);
  };

  return (
    <div className="container mx-auto p-4">
      {showCreatePlanForm && (
        <CreatePlan
          plan={selectedPlan}
          onCancel={() => {
            setShowCreatePlanForm(false);
            setSelectedPlan(null);
          }}
          onPlanCreated={fetchPlans}
        />
      )}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Search by name or description..."
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
              setShowCreatePlanForm(true);
              setSelectedPlan(null);
            }}
            className="bg-indigo-500 hover:bg-indigo-600 duration-300"
          >
            Create Plan
          </Button>
        )}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Plans</CardTitle>
          <CardDescription>Here are the plans of our website.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : paginatedPlans.length === 0 ? (
            <p>No plans to show</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Duration (days)</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPlans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>{plan.description}</TableCell>
                    <TableCell>{plan.price}</TableCell>
                    <TableCell>{plan.features}</TableCell>
                    <TableCell>{plan.duration}</TableCell>
                    <TableCell>{formatDate(plan.created_at)}</TableCell>

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
                            onClick={() => handleEditPlan(plan)}
                          >
                            Edit Plan
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => deletePlan(plan)}>
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
