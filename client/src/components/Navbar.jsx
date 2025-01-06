"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toggleLoginPage } from "@/redux/slice/webSlice";
import { logoutUser } from "@/redux/slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector((data) => data.user.isAuthenticated);
  const user = useSelector((data) => data.user.user);
  const token = useSelector((data) => data.user.token);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavLink = ({ href, children }) => (
    <Link
      href={href}
      className={`relative px-3 py-2 transition-all duration-300 ${
        pathname === href
          ? "text-yellow-300"
          : "text-white hover:text-yellow-300"
      } before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-yellow-300 before:transition-all before:duration-300 hover:before:w-full`}
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <div className="relative backdrop-blur-md bg-slate-950/80 border-b border-slate-800">
      <div className="container mx-auto">
        <div className="py-4 flex items-center justify-between text-white px-4 md:px-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            Scriptro
          </div>
          
          {/* Desktop menu */}
          <div className="md:flex justify-between items-center gap-8 hidden">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/category">Tools</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
          
          {/* Login/Logout buttons for desktop */}
          <div className="hidden md:flex gap-4">
            <button
              onClick={() => dispatch(toggleLoginPage())}
              className={`px-6 py-2 ${
                isAuthenticated ? "hidden" : "flex"
              } rounded-full transition-all duration-300 bg-gradient-to-r from-yellow-300 to-yellow-500 text-black hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-105`}
            >
              Login
            </button>
            <button
              onClick={() => dispatch(logoutUser())}
              className={`px-6 py-2 ${
                isAuthenticated ? "flex" : "hidden"
              } rounded-full transition-all duration-300 border border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black hover:shadow-lg hover:shadow-yellow-500/25 hover:scale-105`}
            >
              Logout
            </button>
          </div>

          {/* Hamburger menu button */}
          <button
            onClick={toggleMenu}
            className="w-10 h-10 md:hidden relative focus:outline-none bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full"
          >
            <span className={`block absolute h-0.5 w-6 bg-black transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'} left-2`}></span>
            <span className={`block absolute h-0.5 w-6 bg-black transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : 'opacity-100'} left-2`}></span>
            <span className={`block absolute h-0.5 w-6 bg-black transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'} left-2`}></span>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64' : 'max-h-0'}`}>
          <div className="flex flex-col items-center text-white gap-6 py-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/category">Tools</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <button
              onClick={() => {
                isAuthenticated ? dispatch(logoutUser()) : dispatch(toggleLoginPage());
                setIsMenuOpen(false);
              }}
              className="px-6 py-2 rounded-full transition-all duration-300 bg-gradient-to-r from-yellow-300 to-yellow-500 text-black hover:shadow-lg hover:shadow-yellow-500/25"
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
