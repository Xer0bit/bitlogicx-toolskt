import React from "react";
import { Eye } from "lucide-react";
import { ListCollapse } from "lucide-react";
import { Users } from "lucide-react";
import { AreaChart } from "lucide-react";
import Chart from "./dashboard/chart";
import DataTable from "./dashboard/data-table";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Dashboard = () => {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="flex flex-col gap-10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye color="indigo" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Total views this week
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col gap-10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <ListCollapse color="indigo" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Total subscriptions this week
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col gap-10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users color="indigo" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-muted-foreground">
              New accounts this week
            </p>
          </CardContent>
        </Card>
        <Card className="flex flex-col gap-10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tools Usage</CardTitle>
            <AreaChart color="red" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Total tools usage this week
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex gap-5 w-full py-10">
        <Chart />
        <div>
          <Card className="">
            <CardHeader>
              <CardTitle>New User</CardTitle>
              <CardDescription>
                Here are the recently registered users of our website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable />
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        </div>
      </div>
      <div>
        <Card className="">
          <CardHeader>
            <CardTitle>Mostly used tools</CardTitle>
            <CardDescription>
              Here are some of the most famous tools of our website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable />
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
