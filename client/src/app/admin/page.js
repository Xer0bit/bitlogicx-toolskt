"use client";
import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "@/components/admin-panel/sidebar";
import Header from "@/components/admin-panel/header";
import Dashboard from "@/components/admin-panel/dashboard";
import ManageUsers from "@/components/admin-panel/users/manage-users";
import BannedUsers from "@/components/admin-panel/users/banned-users";
import Tools from "@/components/admin-panel/tools/tools";
import HomePageTools from "@/components/admin-panel/tools/homepage-tools";
import Categories from "@/components/admin-panel/tools/categories";
import ManagePlans from "@/components/admin-panel/plans/manage-plan";
import ManageSubscriptions from "@/components/admin-panel/subscriptions/manage-subscriptions";
import Settings from "@/components/admin-panel/settings/settings";
import withAuth from "@/components/WithAuth";
const Admin = () => {
  const { activeComponent } = useSelector((state) => state.sidebar);

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Users / Manage users":
        return <ManageUsers />;
      case "Users / Banned users":
        return <BannedUsers />;
      case "Tools / Tools":
        return <Tools />;
      case "Tools / Homepage tools":
        return <HomePageTools />;
      case "Tools / Categories":
        return <Categories />;
      case "Plans / Manage plans":
        return <ManagePlans />;
      case "Subscriptions":
        return <ManageSubscriptions />;
      case "Settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex relative">
      <div className="fixed top-0 z-[-2] h-screen w-screen bg-gray-100 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
      <Sidebar />
      <div className="container ml-60 mx-auto relative">
        <Header currentPath={activeComponent} />
        <div className="py-28">{renderComponent()}</div>
      </div>
    </div>
  );
};

export default withAuth(Admin);
