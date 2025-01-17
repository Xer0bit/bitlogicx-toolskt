"use client";
import { FaTools, FaRegFilePdf, FaFileWord } from 'react-icons/fa';
import Link from 'next/link';

export default function PdfEditorPage() {
  const plannedFeatures = [
    { title: "Text Editing", description: "Edit text directly within PDF files" },
    { title: "Image Manipulation", description: "Add, remove, or modify images" },
    { title: "Page Management", description: "Add, delete, or rearrange pages" },
    { title: "Form Filling", description: "Fill and edit PDF forms easily" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800/50 backdrop-blur-xl">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaRegFilePdf className="text-5xl text-red-500" />
              <FaTools className="text-3xl text-yellow-400" />
            </div>
            <h1 className="text-3xl font-bold text-yellow-400 mb-4">
              PDF Editor - Coming Soon
            </h1>
            <p className="text-slate-400">
              We're building a powerful PDF editor to help you modify your documents with ease.
            </p>
          </div>

          {/* Alternative Tool Section */}
          <div className="bg-slate-800/50 p-6 rounded-lg mb-8">
            <h2 className="text-white text-xl font-semibold mb-4">
              Try Our PDF to Word Converter
            </h2>
            <p className="text-slate-400 mb-4">
              While we're building the PDF editor, you can convert your PDF to Word,
              make your changes, and convert it back to PDF.
            </p>
            <Link 
              href="/category/tool/pdf-to-word"
              className="inline-flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-medium rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
            >
              <FaFileWord />
              Go to PDF to Word Converter
            </Link>
          </div>

          {/* Features Preview */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">
              Planned Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {plannedFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50"
                >
                  <h3 className="text-yellow-400 font-medium mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-8 text-center">
            <p className="text-slate-300">
              Expected Release: Coming Soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
