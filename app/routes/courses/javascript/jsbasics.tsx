import { useState } from "react";
import { Link } from "@remix-run/react";
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
      duration: "45 minutes"
    },
    {
      title: "Control Flow",
      description: "Master JavaScript control flow statements and loops",
      topics: [
        "If statements",
        "Switch statements",
        "For loops",
        "While loops"
      ],
      videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
      duration: "50 minutes"
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
      duration: "55 minutes"
    }
  ];

  return (
    <SharedLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Header */}
        <div className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6">
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

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Course Content */}
            <div className="space-y-8">
              {/* Progress Bar */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Course Progress</h2>
                  <div className="mt-2 relative">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-yellow-500 rounded-full transition-all duration-300"
                        style={{ width: `${((currentModule + 1) / modules.length) * 100}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {currentModule + 1} of {modules.length} modules completed
                    </p>
                  </div>
                </div>
              </div>

              {/* Module List */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Course Modules</h2>
                  <div className="space-y-4">
                    {modules.map((module, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentModule(index)}
                        className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                          currentModule === index
                            ? "bg-yellow-50 border-2 border-yellow-500"
                            : "bg-white border-2 border-gray-100 hover:border-yellow-200"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold text-gray-900">{module.title}</h3>
                          <span className="text-sm text-gray-500">{module.duration}</span>
                        </div>
                        <p className="text-gray-600 mt-1">{module.description}</p>
                        <div className="mt-3 space-y-1">
                          {module.topics.map((topic, topicIndex) => (
                            <div key={topicIndex} className="flex items-center text-sm text-gray-600">
                              <svg className="w-4 h-4 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              {topic}
                            </div>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Video Content */}
            <div className="lg:sticky lg:top-8 space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={modules[currentModule].videoUrl}
                    title={modules[currentModule].title}
                    className="w-full h-[400px] rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {modules[currentModule].title}
                  </h2>
                  <p className="text-gray-600">
                    {modules[currentModule].description}
                  </p>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentModule(Math.max(0, currentModule - 1))}
                    disabled={currentModule === 0}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous Module
                  </button>
                  <button
                    onClick={() => setCurrentModule(Math.min(modules.length - 1, currentModule + 1))}
                    disabled={currentModule === modules.length - 1}
                    className="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next Module
                  </button>
                </div>
              </div>

              {/* Resources Section */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-yellow-600 hover:text-yellow-700"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download Course Materials
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-yellow-600 hover:text-yellow-700"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      View Exercise Files
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center text-yellow-600 hover:text-yellow-700"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Schedule 1:1 Mentoring
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
} 