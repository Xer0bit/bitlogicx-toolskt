import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex-1 p-6 md:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>
        <form className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
              <CardDescription>
                Update your basic account and site information.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your password"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logo">Site Logo</Label>
                <div className="flex items-center gap-4">
                  <img
                    src="/placeholder.svg"
                    width="64"
                    height="64"
                    alt="Site Logo"
                    className="rounded-md"
                  />
                  <Button variant="outline">Change Logo</Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" placeholder="Your site name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  placeholder="Describe your site"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-primary text-primary-foreground">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect your account to third-party services.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="github">GitHub</Label>
                <Input id="github" placeholder="Your GitHub username" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input id="twitter" placeholder="Your Twitter handle" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slack">Slack</Label>
                <Input id="slack" placeholder="Your Slack workspace URL" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-primary text-primary-foreground">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage your notification preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch id="email-notifications" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch id="push-notifications" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sms-notifications">SMS Notifications</Label>
                <Switch id="sms-notifications" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-primary text-primary-foreground">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>
                Update your billing information.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="4111 1111 1111 1111" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input id="expiry-date" placeholder="MM/YY" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="plan">Plan</Label>
                <Select id="plan">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-primary text-primary-foreground">
                Update Billing
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
