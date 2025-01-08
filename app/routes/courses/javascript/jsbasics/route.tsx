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
        <Outlet />
        {/* Rest of your existing JSX */}
      </div>
    </SharedLayout>
  );
} 