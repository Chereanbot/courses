import { useState } from "react";
import { Link } from "@remix-run/react";
import JavaScriptSidebar from "~/components/JavaScriptSidebar";

export default function VariablesAndDatatypes() {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'challenge'>('learn');
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState("");

  const codeExamples = {
    variables: `// Variable declarations
let name = "John";           // String
const age = 25;             // Number
var isStudent = true;       // Boolean
let scores = [85, 92, 78];  // Array
let person = {              // Object
  name: "John",
  age: 25
};`,
    datatypes: `// JavaScript Data Types
let string = "Hello";       // String
let number = 42;           // Number
let boolean = true;        // Boolean
let array = [1, 2, 3];     // Array
let object = {};          // Object
let nullValue = null;     // Null
let undefinedValue;       // Undefined`,
    modern: `// Modern JavaScript Features
const PI = 3.14;           // Constants
let [x, y] = [1, 2];      // Array Destructuring
let { name, age } = person; // Object Destructuring
let sum = (...nums) => nums.reduce((a, b) => a + b); // Rest Parameters`
  };

  const exercises = [
    {
      title: "Variable Declaration",
      description: "Create a variable named 'greeting' and assign it a string value.",
      template: "// Write your code here\n",
      solution: "let greeting = 'Hello, World!';",
      hint: "Use 'let' or 'const' to declare variables in modern JavaScript."
    },
    {
      title: "Working with Numbers",
      description: "Create two number variables and add them together.",
      template: "// Declare two numbers and add them\n",
      solution: "let num1 = 10;\nlet num2 = 20;\nlet sum = num1 + num2;",
      hint: "Numbers in JavaScript can be integers or decimals."
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
              <h1 className="text-2xl font-bold text-gray-900">Variables and Data Types</h1>
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
                <h2 className="text-xl font-bold text-gray-900">Understanding Variables and Data Types</h2>
                <p className="text-gray-600">
                  Variables are containers for storing data values. JavaScript provides several ways to declare
                  variables and supports various data types to handle different kinds of information.
                </p>
              </div>

              {/* Code Examples */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Variable Declarations</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.variables}</code>
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Types</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.datatypes}</code>
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Modern JavaScript Features</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.modern}</code>
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