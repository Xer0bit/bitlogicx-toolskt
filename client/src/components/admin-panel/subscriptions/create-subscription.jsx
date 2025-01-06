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
import Select from "react-select";

export default function CreateSubscription({
  subscription,
  onCancel,
  onSubscriptionCreated,
}) {
  const [user, setUser] = useState("");
  const [plan, setPlan] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    if (subscription) {
      setUser(subscription.user || "");
      setPlan(subscription.plan || "");
      setEndDate(subscription.end_date || "");
      setIsActive(subscription.is_active || true);
      setSelectedUser({
        value: subscription.user.id,
        label: subscription.user.email,
      });
      setSelectedPlan({
        value: subscription.plan.id,
        label: subscription.plan.name,
      });
    }
    fetchUsers();
    fetchPlans();
  }, [subscription]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users/getall/");
      const userOptions = response.data.map((user) => ({
        value: user.id,
        label: user.email,
      }));
      setUsers(userOptions);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/subscription/plans/getall/"
      );
      const planOptions = response.data.map((plan) => ({
        value: plan.id,
        label: plan.name,
      }));
      setPlans(planOptions);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const subscriptionData = {
        user: selectedUser ? selectedUser.value : user,
        plan: selectedPlan ? selectedPlan.value : plan,
        end_date: endDate,
        is_active: isActive,
      };

      let response;
      if (subscription) {
        // Update subscription
        response = await axios.put(
          `http://localhost:5000/subscription/update/${subscription.id}`,
          subscriptionData
        );
      } else {
        // Create subscription
        response = await axios.post(
          "http://localhost:5000/subscription/post/",
          subscriptionData
        );
      }

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Success",
          description: `Subscription ${
            subscription ? "updated" : "created"
          } successfully`,
          status: "success",
        });
        setShowForm(false);
        onCancel();
        onSubscriptionCreated();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating/updating the subscription",
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
                {subscription ? "Edit Subscription" : "Create Subscription"}
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
                <Label htmlFor="user">User</Label>
                <Select
                  id="user"
                  options={users}
                  value={selectedUser}
                  onChange={(option) => setSelectedUser(option)}
                  placeholder="Select a user"
                  isClearable
                  isDisabled={!!subscription} // Disable the user field if updating
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="plan">Plan</Label>
                <Select
                  id="plan"
                  options={plans}
                  value={selectedPlan}
                  onChange={(option) => setSelectedPlan(option)}
                  placeholder="Select a plan"
                  isClearable
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  type="datetime-local"
                  id="end_date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isActive"
                  checked={isActive}
                  onCheckedChange={(checked) => setIsActive(checked)}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
              <Button
                type="submit"
                className="bg-indigo-500 hover:bg-indigo-600 duration-300"
              >
                {subscription ? "Update Subscription" : "Create Subscription"}
              </Button>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
