"use client";
import React, { useState } from "react";
import { TbMail, TbPhone, TbMapPin } from "react-icons/tb";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Signup from "@/components/Signup";
import Login from "@/components/Login";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  return (
    <>
      <Signup />
      <Login />
      <div className="fixed top-0 z-[-2] h-screen w-screen bg-gray-900 bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]" />
      <Navbar pathname={"/contact"} />
      <div className="bg-gray-900 min-h-screen text-white">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3 flex">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col w-full">
                <h2 className="text-2xl font-semibold mb-6 text-yellow-300">
                  Contact Information
                </h2>
                <div className="space-y-6 flex-grow">
                  <div className="flex items-center">
                    <TbMail className="text-yellow-300 text-2xl mr-4" />
                    <span>support@scriptro.com</span>
                  </div>
                  <div className="flex items-center">
                    <TbPhone className="text-yellow-300 text-2xl mr-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <TbMapPin className="text-yellow-300 text-2xl mr-4" />
                    <span>123 Tools Street, Utility City, 12345</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3 flex">
              <form
                className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col w-full"
                onSubmit={handleSubmit}
              >
                <h2 className="text-2xl font-semibold mb-6 text-yellow-300">
                  Get in Touch
                </h2>
                <div className="space-y-4 flex-grow">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-1 text-sm font-medium"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-300"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-1 text-sm font-medium"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-300"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-1 text-sm font-medium"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-300"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-300 text-gray-900 font-semibold py-2 px-6 rounded-lg hover:bg-yellow-400 transition duration-300"
                  >
                    Send Message
                  </button>
                </div>
                {submitStatus === "success" && (
                  <p className="mt-4 text-green-500">
                    Message sent successfully!
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="mt-4 text-red-500">
                    Error sending message. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        <section className="bg-gray-800 py-16 mt-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8 text-yellow-300">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users and start optimizing your
              workflow today with our comprehensive suite of tools.
            </p>
            <Link
              href="/category"
              className="inline-block bg-yellow-300 text-gray-900 font-semibold py-3 px-8 rounded-lg hover:bg-yellow-400 transition duration-300"
            >
              Explore Tools
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
