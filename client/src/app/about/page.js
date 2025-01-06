"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Login from '@/components/Login';
import Signup from '@/components/Signup';

export default function About() {
  const features = [
    {
      title: "Lightning Fast",
      description: "Experience instant results with our optimized tools designed for maximum efficiency.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Privacy Focused",
      description: "Your files and data are automatically deleted after processing, ensuring complete privacy.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: "User Friendly",
      description: "Intuitive interfaces that make complex tasks simple and accessible to everyone.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const stats = [
    { number: "75+", label: "Digital Tools" },
    { number: "500K+", label: "Monthly Users" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <Signup />
      <Login />
      <Navbar />

      <main className="relative pt-16 pb-20 lg:pb-32">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative">
          {/* Hero Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-500">
                Empowering Digital Workflows
              </h1>
              <p className="text-lg text-gray-300 mb-12 leading-relaxed">
                Scriptro is on a mission to simplify digital tasks and enhance productivity through intuitive, powerful, and accessible online tools.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50">
                  <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 rounded-2xl bg-slate-800/30 backdrop-blur-sm border border-slate-700/50">
                  <div className="w-12 h-12 rounded-xl bg-yellow-400/20 flex items-center justify-center mb-6 text-yellow-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission Statement */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                We believe that powerful digital tools should be accessible to everyone. Our platform is built on the principles of simplicity, efficiency, and reliability, enabling users to accomplish their tasks quickly and effectively.
              </p>
              <div className="flex justify-center">
                <a
                  href="/category"
                  className="inline-flex items-center px-8 py-3 text-lg font-semibold text-black bg-yellow-400 rounded-full hover:bg-yellow-300 transition-colors duration-300"
                >
                  Explore Our Tools
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
