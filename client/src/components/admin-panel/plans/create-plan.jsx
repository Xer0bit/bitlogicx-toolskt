"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SquareX } from "lucide-react";

export default function CreatePlan({ plan, onCancel, onPlanCreated }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [duration, setDuration] = useState("");
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (plan) {
      setName(plan.name || "");
      setPrice(plan.price || "");
      setDescription(plan.description || "");
      setFeatures(plan.features || "");
      setDuration(plan.duration || "");
    }
  }, [plan]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const planData = {
        name,
        price,
        description,
        features,
        duration,
      };

      let response;
      if (plan) {
        // Update plan
        response = await axios.put(
          `http://localhost:5000/subscription/plan/update/${plan.id}`,
          planData
        );
      } else {
        // Create plan
        response = await axios.post(
          "http://localhost:5000/subscription/plan/post/",
          planData
        );
      }

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Success",
          description: `Plan ${plan ? "updated" : "created"} successfully`,
          status: "success",
        });
        setShowForm(false);
        onCancel();
        onPlanCreated();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating/updating the plan",
        status: "error",
      });
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
                {plan ? "Edit Plan" : "Create Plan"}
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
                <Label htmlFor="name">Plan Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Plan Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="features">Features</Label>
                <Textarea
                  id="features"
                  placeholder="Features"
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  type="text"
                  id="duration"
                  placeholder="Duration (e.g., 1 day, 1 month)"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 duration-300"
              >
                {plan ? "Update Plan" : "Create Plan"}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
