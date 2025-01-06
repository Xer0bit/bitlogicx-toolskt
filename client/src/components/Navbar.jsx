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
      className={`${
        pathname === href
          ? "text-yellow-300 border-b"
          : "hover:text-yellow-300 hover:border-b"
      } cursor-pointer border-yellow-300`}
      onClick={() => setIsMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <div className="bg-slate-950">
      <div className="py-8 flex items-center justify-between text-white px-4">
        <div className="text-2xl font-bold text-yellow-300">TOOLSKT</div>
        
        {/* Desktop menu */}
        <div className="md:flex justify-between items-center gap-10 hidden">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/category">Tools</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
        
        {/* Login/Logout buttons for desktop */}
        <button
          onClick={() => {
            dispatch(toggleLoginPage());
          }}
          className={`px-4 py-2 ${
            isAuthenticated ? "" : "md:flex"
          } hidden rounded shadow hover:shadow-lg bg-transparent cursor-pointer hover:bg-yellow-300 text-yellow-300 hover:text-black border border-yellow-300 hover:border-transparent`}
        >
          Login
        </button>
        <button
          onClick={() => {
            dispatch(logoutUser());
          }}
          className={`px-4 py-2 hidden ${
            isAuthenticated ? "md:flex" : ""
          } rounded shadow hover:shadow-lg bg-transparent cursor-pointer hover:bg-yellow-300 text-yellow-300 hover:text-black border border-yellow-300 hover:border-transparent`}
        >
          Logout
        </button>

        {/* Hamburger menu button */}
        <div
          onClick={toggleMenu}
          className="w-10 h-10 md:hidden cursor-pointer mt-2 inline-flex items-center justify-center rounded-full bg-yellow-300 text-black mb-4"
        >
          {isMenuOpen ? (
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-6 h-6"
              viewBox="0 0 24 24"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden py-4">
          <div className="flex flex-col items-center text-white gap-4">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/category">Tools</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  dispatch(logoutUser());
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 rounded shadow hover:shadow-lg bg-transparent cursor-pointer hover:bg-yellow-300 text-yellow-300 hover:text-black border border-yellow-300 hover:border-transparent"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch(toggleLoginPage());
                  setIsMenuOpen(false);
                }}
                className="px-4 py-2 rounded shadow hover:shadow-lg bg-transparent cursor-pointer hover:bg-yellow-300 text-yellow-300 hover:text-black border border-yellow-300 hover:border-transparent"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
