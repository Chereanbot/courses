import { useState } from "react";
import { Link, Outlet } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";

export default function JavaScriptBasics() {
  const [currentModule, setCurrentModule] = useState(0);

  const modules = [
    {
      title: "Introduction to JavaScript",
      description: "Learn the fundamentals of JavaScript programming language",
      topics: [
        "What is JavaScript?",
        "Setting up your development environment",
        "Basic syntax and data types",
        "Variables and constants"
      ],
      videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
      duration: "45 minutes",
      path: "variables-and-datatypes"
    },
    {
      title: "Objects and Arrays",
      description: "Master JavaScript objects and arrays",
      topics: [
        "Working with Arrays",
        "Array Methods",
        "Object Creation",
        "Object Properties"
      ],
      videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
      duration: "50 minutes",
      path: "objects-and-arrays"
    },
    {
      title: "Functions & Scope",
      description: "Understanding functions and variable scope in JavaScript",
      topics: [
        "Function declarations",
        "Arrow functions",
        "Function parameters",
        "Variable scope and closures"
      ],
      videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
      duration: "55 minutes",
      path: "functions-and-scope"
    }
  ];

  return (
    <SharedLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link
                  to=".."
                  className="text-yellow-600 hover:text-yellow-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">JavaScript Fundamentals</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Course Modules */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Course Modules</h2>
                  <div className="space-y-4">
                    {modules.map((module, index) => (
                      <Link
                        key={index}
                        to={module.path}
                        className={`block w-full text-left p-4 rounded-lg transition-all duration-300 ${
                          currentModule === index
                            ? "bg-yellow-50 border-2 border-yellow-500"
                            : "bg-white border-2 border-gray-100 hover:border-yellow-200"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-3">
                            <span className="w-5 h-5 rounded-full border-2 border-gray-300" />
                            <h3 className="font-semibold text-gray-900">{module.title}</h3>
                          </div>
                          <span className="text-sm text-gray-500">{module.duration}</span>
                        </div>
                        <p className="text-gray-600 mt-1 ml-8">{module.description}</p>
                        <div className="mt-3 ml-8 space-y-1">
                          {module.topics.map((topic, topicIndex) => (
                            <div key={topicIndex} className="flex items-center text-sm text-gray-600">
                              <svg className="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              {topic}
                            </div>
                          ))}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
} 