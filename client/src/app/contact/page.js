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
      {/* Modern gradient background */}
      <div className="fixed top- z-[-2] h-screen w-screen bg-gray-900 bg-[radial-gradient(ellipse_at_top,rgba(0,163,255,0.15),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(255,217,0,0.1),transparent_50%)]" />
      <Navbar pathname={"/contact"} />
      
      <div className="bg-transparent min-h-screen text-white">
        {/* Hero Section */}
        <div className="text-center py-20 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="container mx-auto max-w-6xl px-4 pb-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Contact Information Cards */}
            <div className="md:w-1/3 space-y-4">
              {[
                { icon: TbMail, title: "Email", content: "support@scriptro.com" },
                { icon: TbPhone, title: "Phone", content: "+1 (555) 123-4567" },
                { icon: TbMapPin, title: "Address", content: "123 Tools Street, Utility City, 12345" }
              ].map((item, index) => (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:bg-gray-800/70 transition-all duration-300">
                  <item.icon className="text-yellow-300 text-3xl mb-3" />
                  <h3 className="text-lg font-semibold text-yellow-300 mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.content}</p>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="md:w-2/3">
              <form onSubmit={handleSubmit} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition-all duration-300"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-xl hover:from-yellow-400 hover:to-yellow-600 transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Send Message
                  </button>
                </div>
                {submitStatus === "success" && (
                  <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-xl text-green-400">
                    Message sent successfully!
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-400">
                    Error sending message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Updated CTA Section */}
        <section className="bg-gray-800/50 backdrop-blur-sm py-20 mt-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Ready to Transform Your Productivity?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users and start optimizing your workflow today with our comprehensive suite of tools.
            </p>
            <Link
              href="/category"
              className="inline-block bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-900 font-semibold py-4 px-8 rounded-xl hover:from-yellow-400 hover:to-yellow-600 transform hover:scale-[1.02] transition-all duration-300"
            >
              Explore Tools
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
