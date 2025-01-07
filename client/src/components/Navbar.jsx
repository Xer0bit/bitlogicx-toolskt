"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { toggleLoginPage } from "@/redux/slice/webSlice";
import { logoutUser } from "@/redux/slice/userSlice";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector((data) => data.user.isAuthenticated);
  const dispatch = useDispatch();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLink = ({ href, children }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className="relative group px-4 py-2"
        onClick={() => setIsMenuOpen(false)}
      >
        <span
          className={`relative z-10 ${
            isActive ? "text-yellow-300" : "text-gray-200"
          } group-hover:text-yellow-300 transition-colors duration-300`}
        >
          {children}
        </span>
        {isActive && (
          <motion.span
            layoutId="underline"
            className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300"
            initial={false}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    );
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/95 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Scriptro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/category">Tools</NavLink>
            <NavLink href="/about">About</NavLink>
            
            <NavLink href="/contact">Contact</NavLink>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <button
                onClick={() => dispatch(toggleLoginPage())}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-medium transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => dispatch(logoutUser())}
                className="px-6 py-2 rounded-full border-2 border-yellow-400 text-yellow-400 font-medium hover:bg-yellow-400 hover:text-black transform hover:scale-105 transition-all duration-300"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 focus:outline-none"
          >
            <span
              className={`block w-5 h-0.5 bg-black transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-black transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-black transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="py-4 space-y-4 px-4">
            <Link
              href="/"
              className="block text-gray-200 hover:text-yellow-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-gray-200 hover:text-yellow-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/category"
              className="block text-gray-200 hover:text-yellow-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Tools
            </Link>
            <Link
              href="/contact"
              className="block text-gray-200 hover:text-yellow-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <button
              onClick={() => {
                isAuthenticated
                  ? dispatch(logoutUser())
                  : dispatch(toggleLoginPage());
                setIsMenuOpen(false);
              }}
              className="w-full px-6 py-2 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-medium transform hover:scale-105 transition-all duration-300"
            >
              {isAuthenticated ? "Logout" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
