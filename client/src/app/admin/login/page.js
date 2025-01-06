// pages/admin-login.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/slice/adminSlice";
import { useRouter } from "next/navigation";
import { VscDebugBreakpointData } from "react-icons/vsc";
import Image from "next/image";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/users/admin/login/",
        {
          email,
          password,
        }
      );

      if (response.data.isSuperUser) {
        // Dispatch login success action
        dispatch(loginSuccess());
        // Redirect to admin dashboard
        router.push("/admin");
      } else {
        setError("Invalid credentials or not a superuser.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed z-50 top-0 left-0 bg-white/5 backdrop-blur-sm w-screen h-screen p-5 flex justify-center items-center">
        <div className="relative w-auto h-auto border rounded-md p-10 flex bg-white/5 backdrop-blur-md">
          <div className="flex flex-col w-80 sm:w-96 items-center gap-5 py-1 lg:py-5 lg:w-1/2 text-gray-900">
            <h2 className="text-3xl text-indigo-500 font-bold">Admin Login</h2>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex flex-col lg:w-3/4">
              <label htmlFor="email" className="opacity-50">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="border border-gray-300 h-10 rounded-md bg-transparent focus:text-indigo-500 focus:border-indigo-500 outline-none px-3 py-1"
              />
            </div>
            <div className="flex flex-col lg:w-3/4">
              <label htmlFor="password" className="opacity-50">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="border h-10 border-gray-300 rounded-md bg-transparent focus:text-indigo-500 focus:border-indigo-500 outline-none px-3 py-1"
              />
            </div>

            <button
              onClick={handleLogin}
              className="px-4 py-2 mt-5 mb-1 rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 backdrop-blur-md"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <div className="w-1/2 flex-col p-5 gap-5 border-l hidden lg:flex">
            <div className="">
              <Image src={"/icons/scriptro.png"} width={150} height={150} />
            </div>
            <p className="text-gray-900">
              We are serving with the best online tools to make your daily work
              easy.
            </p>
            <ul className="opacity-90 flex flex-col gap-1 p-10">
              <li className="flex items-center gap-3">
                <VscDebugBreakpointData className="text-indigo-500" /> Website
                Management Tools
              </li>
              <li className="flex items-center gap-3">
                <VscDebugBreakpointData className="text-indigo-500" /> Image
                Tools
              </li>
              <li className="flex items-center gap-3">
                <VscDebugBreakpointData className="text-indigo-500" /> Text
                Analysis Tools
              </li>
              <li className="flex items-center gap-3">
                <VscDebugBreakpointData className="text-indigo-500" /> Domain
                Tools
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Second login section */}
      <div className="fixed z-40 top-0 left-0 w-screen h-screen p-5 flex justify-center items-center">
        <div className="relative w-auto h-auto border border-gray-900 rounded-md p-10 flex bg-white/5 backdrop-blur-md">
          <div className="flex flex-col w-80 sm:w-96 items-center gap-5 py-1 lg:py-5 lg:w-1/2 text-gray-900">
            <h2 className="text-3xl text-indigo-500 mt-2 font-bold">
              Admin Login
            </h2>

            <div className="flex flex-col lg:w-3/4">
              <label htmlFor="email-alt" className="opacity-50">
                Email
              </label>
              <input
                type="email"
                id="email-alt"
                className="border border-gray-900 h-10 rounded-md bg-transparent focus:text-indigo-500 focus:border-indigo-500 outline-none px-3 py-1"
              />
            </div>
            <div className="flex flex-col lg:w-3/4">
              <label htmlFor="password-alt" className="opacity-50">
                Password
              </label>
              <input
                type="password"
                id="password-alt"
                className="border h-10 border-gray-900 rounded-md bg-transparent focus:text-indigo-500 focus:border-indigo-500 outline-none px-3 py-1"
              />
            </div>

            <button className="px-4 py-2 mt-5 mb-1 rounded-md text-white bg-indigo-500 hover:bg-indigo-600 duration-300 backdrop-blur-md">
              Login
            </button>
          </div>
          <div className="w-1/2 flex-col p-5 gap-5 mt-2 border-l border-gray-900 hidden lg:flex">
            <div className="">
              <Image src={"/icons/scriptro.png"} width={150} height={150} />
            </div>
            <p className="text-gray-900">
              We are serving with the best online tools to make your daily work
              easy.
            </p>
            <ul className="opacity-90 flex flex-col gap-1 p-10">
              <li className="flex items-center gap-3">
                <VscDebugBreakpointData className="text-indigo-500" /> Website
                Management Tools
              </li>
              <li className="flex items-center gap-3">
                <VscDebugBreakpointData className="text-indigo-500" /> Image
                Tools
              </li>
              <li className="flex items-center gap-3">
                <VscDebugBreakpointData className="text-indigo-500" /> Text
                Analysis Tools
              </li>
              <li className="flex items-center gap-3">
                <VscDebugBreakpointData className="text-indigo-500" /> Domain
                Tools
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLoginPage;
