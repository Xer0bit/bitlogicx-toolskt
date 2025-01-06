"use client";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toggleLoginPage, toggleSignupPage } from "@/redux/slice/webSlice";
import { signupUser } from "@/redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isSignupPage = useSelector((data) => data.web.isSignupPage);
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    const loadingToast = toast.loading("Signing up...");

    try {
      await dispatch(signupUser({ username: name, email, password })).unwrap();
      toast.success("Signed up successfully!");
      dispatch(toggleSignupPage());
    } catch (err) {
      toast.error(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return (
    <>
      {isSignupPage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="relative bg-gray-800 p-8 rounded-md shadow-lg w-full max-w-md">
            <button
              className="absolute top-3 right-3 text-yellow-300 hover:text-yellow-500"
              onClick={() => dispatch(toggleSignupPage())}
            >
              <AiOutlineClose size={24} />
            </button>

            <h2 className="text-3xl font-bold text-yellow-300 mb-4">Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="block text-yellow-300 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 text-white bg-transparent rounded border border-yellow-300 focus:outline-none focus:border-yellow-500"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
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
              <div className="mb-4">
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
              <div className="mb-6">
                <label className="block text-yellow-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 text-white bg-transparent rounded border border-yellow-300 focus:outline-none focus:border-yellow-500"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-300 text-black py-2 px-4 rounded hover:bg-yellow-400 transition"
                disabled={isLoading}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
            <p className="mt-4 text-gray-50">
              Already have an account?{" "}
              <span
                onClick={() => {
                  dispatch(toggleSignupPage());
                  dispatch(toggleLoginPage());
                }}
                className="text-yellow-300 cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
