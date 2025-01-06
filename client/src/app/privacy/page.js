"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Login from '@/components/Login';
import Signup from '@/components/Signup';

export default function Privacy() {
  const sections = [
    {
      title: "Information Collection",
      content: [
        "We collect information that you voluntarily provide when using our services, including:",
        [
          "Email address (for newsletter subscription)",
          "Usage data and preferences",
          "Uploaded files for processing",
          "Browser type and version",
          "Operating system information"
        ]
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "Your information is used for the following purposes:",
        [
          "To provide and maintain our services",
          "To notify you about changes to our services",
          "To provide customer support",
          "To gather analysis or valuable information to improve our services",
          "To monitor the usage of our services"
        ]
      ]
    },
    {
      title: "Data Security",
      content: [
        "We implement robust security measures to protect your data:",
        [
          "Automatic file deletion after processing",
          "Encrypted data transmission",
          "Regular security assessments",
          "Limited access to personal information",
          "Continuous monitoring for potential vulnerabilities"
        ]
      ]
    },
    {
      title: "Cookie Policy",
      content: [
        "We use cookies and similar tracking technologies to enhance your experience. These may include:",
        [
          "Essential cookies for site functionality",
          "Analytics cookies to understand usage",
          "Preference cookies to remember your settings",
          "Marketing cookies for relevant advertisements"
        ]
      ]
    }
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
          {/* Header Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-500">
                Privacy Policy
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Your privacy is important to us. This policy outlines how we collect, use, and protect your data when you use Scriptro.
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-yellow-300 to-amber-500 mx-auto"></div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">
              {sections.map((section, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8"
                >
                  <h2 className="text-2xl font-semibold text-yellow-300 mb-6">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-300">
                      {section.content[0]}
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-400 ml-4">
                      {section.content[1].map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* Contact Section */}
              <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold text-yellow-300 mb-6">
                  Contact Us
                </h2>
                <p className="text-gray-300 mb-4">
                  If you have any questions about our Privacy Policy, please contact us:
                </p>
                <div className="space-y-2 text-gray-400">
                  <p>Email: privacy@scriptro.com</p>
                  <p>Last updated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
