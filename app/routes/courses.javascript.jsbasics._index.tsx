import { useState } from "react";
import { Link, Outlet } from "@remix-run/react";
import JavaScriptSidebar from "~/components/JavaScriptSidebar";

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
    },
    {
      title: "Control Flow & Loops",
      description: "Master JavaScript control structures and loops",
      topics: [
        "Conditional statements (if/else)",
        "Switch statements",
        "For loops and while loops",
        "Break and continue"
      ],
      videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
      duration: "45 minutes",
      path: "control-flow-and-loops"
    },
    {
      title: "DOM Manipulation",
      description: "Learn to interact with the Document Object Model",
      topics: [
        "Selecting DOM elements",
        "Modifying element content",
        "Event handling",
        "Creating and removing elements"
      ],
      videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
      duration: "60 minutes",
      path: "dom-manipulation"
    },
    {
      title: "Asynchronous JavaScript",
      description: "Understanding async programming in JavaScript",
      topics: [
        "Callbacks and Promises",
        "Async/Await syntax",
        "Fetch API",
        "Error handling"
      ],
      videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
      duration: "65 minutes",
      path: "async-javascript"
    },
    {
      title: "Error Handling & Debugging",
      description: "Learn to handle errors and debug JavaScript code",
      topics: [
        "Try-catch statements",
        "Error types",
        "Debugging techniques",
        "Browser developer tools"
      ],
      videoUrl: "https://www.youtube.com/embed/PkZNo7MFNFg",
      duration: "40 minutes",
      path: "error-handling"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <JavaScriptSidebar />
      <div className="flex-1 ml-64">
        <Outlet />
        <div className="max-w-7xl mx-auto px-4 py-8">
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
      </div>
    </div>
  );
} 