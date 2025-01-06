"use client";
import React from "react";
import Link from "next/link";
import {
  LayoutDashboardIcon,
  PackageIcon,
  UsersIcon,
  PenToolIcon,
  ListEndIcon,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveComponent, toggleDropdown } from "@/redux/slice/sidebarSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const {
    activeComponent,
    isPagesOpen,
    isUsersOpen,
    isToolsOpen,
    isPlansOpen,
    isSubscriptionsOpen,
  } = useSelector((state) => state.sidebar);

  const handleClick = (component, dropdown) => {
    if (dropdown) {
      dispatch(toggleDropdown(dropdown));
    } else {
      dispatch(setActiveComponent(component));
    }
  };

  return (
    <div className="flex fixed flex-col h-screen p-3 bg-indigo-500 text-white shadow w-60">
      <div className="space-y-3">
        <div className="flex items-center">
          <h2 className="text-xl font-bold">Toolskt</h2>
        </div>
        <div className="flex-1">
          <ul className="pt-2 pb-4 space-y-1 text-sm">
            <li className="rounded-sm">
              <button
                onClick={() => handleClick("Dashboard", null)}
                className={`flex items-center justify-between ${
                  activeComponent === "Dashboard" ? "bg-gray-700" : ""
                } hover:bg-gray-700 duration-300 p-2 space-x-3 rounded-md w-full text-left`}
              >
                <div className="flex items-center space-x-3">
                  <LayoutDashboardIcon />
                  <span>Dashboard</span>
                </div>
              </button>
            </li>
            <li className="rounded-sm">
              <button
                onClick={() => handleClick("Pages", "pages")}
                className={`flex items-center justify-between ${
                  isPagesOpen ? "bg-gray-700" : ""
                } hover:bg-gray-700 duration-300 p-2 space-x-3 rounded-md w-full text-left`}
              >
                <div className="flex items-center space-x-3">
                  <PackageIcon />
                  <span>Pages</span>
                </div>
                {isPagesOpen ? <ChevronUp /> : <ChevronDown />}
              </button>
              {isPagesOpen && (
                <ul className="space-y-1 mt-2">
                  <li className="hover:bg-gray-500 duration-300">
                    <Link
                      href="#"
                      onClick={() => handleClick("Pages / Create page", null)}
                      className={`flex items-center p-2 space-x-3 ${
                        activeComponent === "Pages / Create page"
                          ? "bg-gray-600"
                          : ""
                      }`}
                    >
                      <ChevronRight />
                      <span>Create Page</span>
                    </Link>
                  </li>
                  <li className="hover:bg-gray-500 duration-300">
                    <Link
                      href="#"
                      onClick={() => handleClick("Pages / Manage page", null)}
                      className={`flex items-center p-2 space-x-3 ${
                        activeComponent === "Pages / Manage page"
                          ? "bg-gray-600"
                          : ""
                      }`}
                    >
                      <ChevronRight />
                      <span>Manage Page</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="rounded-sm">
              <button
                onClick={() => handleClick("Users", "users")}
                className={`flex items-center justify-between ${
                  isUsersOpen ? "bg-gray-700" : ""
                } hover:bg-gray-700 duration-300 p-2 space-x-3 rounded-md w-full text-left`}
              >
                <div className="flex items-center space-x-3">
                  <UsersIcon />
                  <span>Users</span>
                </div>
                {isUsersOpen ? <ChevronUp /> : <ChevronDown />}
              </button>
              {isUsersOpen && (
                <ul className="space-y-1 mt-2">
                  <li className="hover:bg-gray-500 duration-300">
                    <Link
                      href="#"
                      onClick={() => handleClick("Users / Manage users", null)}
                      className={`flex items-center p-2 space-x-3 ${
                        activeComponent === "Users / Manage users"
                          ? "bg-gray-600"
                          : ""
                      }`}
                    >
                      <ChevronRight />
                      <span>Manage Users</span>
                    </Link>
                  </li>
                  <li className="hover:bg-gray-500 duration-300">
                    <Link
                      href="#"
                      onClick={() => handleClick("Users / Banned users", null)}
                      className={`flex items-center p-2 space-x-3 ${
                        activeComponent === "Users / Banned users"
                          ? "bg-gray-600"
                          : ""
                      }`}
                    >
                      <ChevronRight />
                      <span>Banned Users</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="rounded-sm">
              <button
                onClick={() => handleClick("Tools", "tools")}
                className={`flex items-center justify-between ${
                  isToolsOpen ? "bg-gray-700" : ""
                } hover:bg-gray-700 duration-300 p-2 space-x-3 rounded-md w-full text-left`}
              >
                <div className="flex items-center space-x-3">
                  <PenToolIcon />
                  <span>Tools</span>
                </div>
                {isToolsOpen ? <ChevronUp /> : <ChevronDown />}
              </button>
              {isToolsOpen && (
                <ul className="space-y-1 mt-2">
                  <li className="hover:bg-gray-500 duration-300">
                    <Link
                      href="#"
                      onClick={() => handleClick("Tools / Tools", null)}
                      className={`flex items-center p-2 space-x-3 ${
                        activeComponent === "Tools / Tools" ? "bg-gray-600" : ""
                      }`}
                    >
                      <ChevronRight />
                      <span>Tools</span>
                    </Link>
                  </li>
                  {/* <li className="hover:bg-gray-500 duration-300">
                    <Link
                      href="#"
                      onClick={() => handleClick("Tools / Manage tools", null)}
                      className={`flex items-center p-2 space-x-3 ${
                        activeComponent === "Tools / Manage tools"
                          ? "bg-gray-600"
                          : ""
                      }`}
                    >
                      <ChevronRight />
                      <span>Manage Tools</span>
                    </Link>
                  </li> */}
                  <li className="hover:bg-gray-500 duration-300">
                    <Link
                      href="#"
                      onClick={() => handleClick("Tools / Categories", null)}
                      className={`flex items-center p-2 space-x-3 ${
                        activeComponent === "Tools / Categories"
                          ? "bg-gray-600"
                          : ""
                      }`}
                    >
                      <ChevronRight />
                      <span>Categories</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="rounded-sm">
              <button
                onClick={() => handleClick("Plans / Manage plans", null)}
                className={`flex items-center justify-between ${
                  activeComponent === "Plans / Manage plans"
                    ? "bg-gray-700"
                    : ""
                } hover:bg-gray-700 duration-300 p-2 space-x-3 rounded-md w-full text-left`}
              >
                <div className="flex items-center space-x-3">
                  <ListEndIcon />
                  <span>Manage Plans</span>
                </div>
              </button>
            </li>
            <li className="rounded-sm">
              <button
                onClick={() => handleClick("Subscriptions", null)}
                className={`flex items-center justify-between ${
                  activeComponent === "Subscriptions" ? "bg-gray-700" : ""
                } hover:bg-gray-700 duration-300 p-2 space-x-3 rounded-md w-full text-left`}
              >
                <div className="flex items-center space-x-3">
                  <ListEndIcon />
                  <span>Subscriptions</span>
                </div>
              </button>
            </li>
            <li className="rounded-sm">
              <button
                onClick={() => handleClick("Settings", null)}
                className={`flex items-center justify-between ${
                  activeComponent === "Settings" ? "bg-gray-700" : ""
                } hover:bg-gray-700 duration-300 p-2 space-x-3 rounded-md w-full text-left`}
              >
                <div className="flex items-center space-x-3">
                  <SettingsIcon />
                  <span>Settings</span>
                </div>
              </button>
            </li>
            <li className="rounded-sm">
              <button
                onClick={() => handleClick("Logout", null)}
                className={`flex items-center justify-between ${
                  activeComponent === "Logout" ? "bg-gray-700" : ""
                } hover:bg-gray-700 duration-300 p-2 space-x-3 rounded-md w-full text-left`}
              >
                <div className="flex items-center space-x-3">
                  <LogOutIcon />
                  <span>Logout</span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
