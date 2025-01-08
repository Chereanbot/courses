import { useState } from "react";
import { Link } from "@remix-run/react";
import JavaScriptSidebar from "~/components/JavaScriptSidebar";

export default function FunctionsAndScope() {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState("");

  const codeExamples = {
    functions: `// Function Declarations
function greet(name) {
  return "Hello, " + name + "!";
}

// Function Expression
const add = function(a, b) {
  return a + b;
};

// Arrow Function
const multiply = (a, b) => a * b;

// Default Parameters
const greetUser = (name = "Guest") => {
  return "Hello, " + name + "!";
};`,
    scope: `// Global Scope
let globalVar = "I'm global";

function scopeExample() {
  // Function Scope
  let functionVar = "I'm function-scoped";
  
  if (true) {
    // Block Scope
    let blockVar = "I'm block-scoped";
    var varVariable = "I'm function-scoped (var)";
    console.log(blockVar); // Works
  }
  
  console.log(functionVar); // Works
  console.log(varVariable); // Works
  // console.log(blockVar); // Error!
}

console.log(globalVar); // Works
// console.log(functionVar); // Error!`,
    closures: `// Closures Example
function createCounter() {
  let count = 0;  // Private variable
  
  return {
    increment: () => {
      count++;
      return count;
    },
    decrement: () => {
      count--;
      return count;
    },
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1`
  };

  const exercises = [
    {
      title: "Function Creation",
      description: "Create a function that takes two numbers and returns their sum.",
      template: "// Create a function named 'sum' that adds two numbers\n",
      solution: "function sum(a, b) {\n  return a + b;\n}",
      hint: "Use the function keyword or arrow syntax to create your function."
    },
    {
      title: "Closure Practice",
      description: "Create a function that generates a greeting function for a specific name.",
      template: "// Create a function that returns a greeting function\n",
      solution: `function createGreeter(name) {
  return () => {
    return "Hello, " + name + "!";
  };
}`,
      hint: "Use a closure to remember the name parameter."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <JavaScriptSidebar />
      <div className="flex-1 ml-64">
        <div className="bg-white shadow mb-8">
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
              <h1 className="text-2xl font-bold text-gray-900">Functions and Scope</h1>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('learn')}
              className={`${
                activeTab === 'learn'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Learn
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`${
                activeTab === 'practice'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
            >
              Practice
            </button>
          </nav>
        </div>

        {/* Content Sections */}
        <div className="mt-6">
          {/* Learn Section */}
          {activeTab === 'learn' && (
            <div className="space-y-8">
              {/* Introduction */}
              <div className="prose max-w-none">
                <h2 className="text-xl font-bold text-gray-900">Understanding Functions and Scope</h2>
                <p className="text-gray-600">
                  Functions are one of the fundamental building blocks in JavaScript. They allow you to write
                  reusable code and create powerful abstractions. Understanding scope is crucial for managing
                  variable accessibility and creating maintainable code.
                </p>
              </div>

              {/* Code Examples */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Function Types</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.functions}</code>
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Variable Scope</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.scope}</code>
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Closures</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.closures}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Practice Section */}
          {activeTab === 'practice' && (
            <div className="space-y-8">
              {exercises.map((exercise, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{exercise.title}</h3>
                    <p className="text-gray-600 mb-4">{exercise.description}</p>
                    <div className="space-y-4">
                      <div className="relative">
                        <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                          <code>{exercise.template}</code>
                        </pre>
                        <button
                          onClick={() => setOutput(exercise.solution)}
                          className="absolute top-2 right-2 px-3 py-1 text-sm text-gray-400 hover:text-white bg-gray-700 rounded"
                        >
                          Show Solution
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-gray-600">{exercise.hint}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 