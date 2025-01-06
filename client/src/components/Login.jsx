"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toggleLoginPage, toggleSignupPage } from "@/redux/slice/webSlice";
import { loginUser } from "@/redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isLoginPage = useSelector((data) => data.web.isLoginPage);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToast = toast.loading("Logging in...");

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      toast.success("Logged in successfully!");
      dispatch(toggleLoginPage());
    } catch (err) {
      toast.error(err.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return (
    <>
      {isLoginPage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="relative bg-gray-800 p-8 rounded-md shadow-lg w-full max-w-md">
            <button
              className="absolute top-3 right-3 text-yellow-300 hover:text-yellow-500"
              onClick={() => dispatch(toggleLoginPage())}
            >
              <AiOutlineClose size={24} />
            </button>

            <h2 className="text-3xl font-bold text-yellow-300 mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-yellow-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 text-white bg-transparent rounded border border-yellow-300 focus:outline-none focus:border-yellow-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-yellow-300 mb-2">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 text-white bg-transparent rounded border border-yellow-300 focus:outline-none focus:border-yellow-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-300 text-black py-2 px-4 rounded hover:bg-yellow-400 transition"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p className="mt-4 text-gray-50">
              Don't have an account?{" "}
              <span
                onClick={() => {
                  dispatch(toggleLoginPage());
                  dispatch(toggleSignupPage());
                }}
                className="text-yellow-300 cursor-pointer hover:underline"
              >
                Sign up here
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
