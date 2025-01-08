import { useState } from "react";
import { Link } from "@remix-run/react";
import JavaScriptSidebar from "~/components/JavaScriptSidebar";

export default function ErrorHandling() {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState("");

  const codeExamples = {
    tryCatch: `// Basic Try-Catch
try {
  // Code that might throw an error
  const result = someUndefinedVariable + 1;
} catch (error) {
  console.error('An error occurred:', error.message);
}

// Try-Catch-Finally
try {
  // Attempt to parse JSON
  const data = JSON.parse('{"invalid": json}');
} catch (error) {
  console.error('Parsing failed:', error);
} finally {
  console.log('This runs regardless of success or failure');
}`,
    errorTypes: `// Common Error Types
// ReferenceError
try {
  console.log(undefinedVariable);
} catch (error) {
  console.log(error instanceof ReferenceError); // true
}

// TypeError
try {
  null.toString();
} catch (error) {
  console.log(error instanceof TypeError); // true
}

// SyntaxError
try {
  eval('if (true) {');
} catch (error) {
  console.log(error instanceof SyntaxError); // true
}`,
    customErrors: `// Custom Error Class
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Using Custom Error
function validateUser(user) {
  if (!user.name) {
    throw new ValidationError('Name is required');
  }
  if (!user.email) {
    throw new ValidationError('Email is required');
  }
}

try {
  validateUser({ name: '', email: '' });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Validation failed:', error.message);
  } else {
    console.log('Unknown error:', error);
  }
}`,
    debugging: `// Debugging Techniques
// Console Methods
console.log('Basic logging');
console.info('Information');
console.warn('Warning message');
console.error('Error message');
console.table([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);

// Debugger Statement
function complexCalculation(x, y) {
  debugger; // Code execution will pause here in dev tools
  const result = x * y / (x - y);
  return result;
}

// Performance Measurement
console.time('loop');
for (let i = 0; i < 1000000; i++) {
  // Some operation
}
console.timeEnd('loop');`
  };

  const exercises = [
    {
      title: "Error Handling Implementation",
      description: "Create a function that safely parses JSON and handles potential errors.",
      template: `// Create a function that safely parses JSON
function safeJSONParse(jsonString) {
  // Add your code here
}`,
      solution: `function safeJSONParse(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    return {
      success: true,
      data: data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Usage:
// const result = safeJSONParse('{"name": "John"}');
// const invalid = safeJSONParse('{invalid}');`,
      hint: "Use try-catch to handle JSON.parse errors and return an object with success status."
    },
    {
      title: "Custom Error Handler",
      description: "Implement a function that validates an email address and throws a custom error if invalid.",
      template: `// Create an email validator with custom error
class EmailValidationError extends Error {
  // Add constructor
}

function validateEmail(email) {
  // Add validation logic
}`,
      solution: `class EmailValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'EmailValidationError';
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  
  if (!email) {
    throw new EmailValidationError('Email is required');
  }
  
  if (!emailRegex.test(email)) {
    throw new EmailValidationError('Invalid email format');
  }
  
  return true;
}`,
      hint: "Create a custom error class and use regex for email validation."
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
            <h1 className="text-2xl font-bold text-gray-900">Error Handling & Debugging</h1>
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
              <h2 className="text-xl font-bold text-gray-900">Understanding Error Handling & Debugging</h2>
              <p className="text-gray-600">
                Error handling is crucial for writing robust JavaScript applications. Learning how to properly
                catch and handle errors, along with effective debugging techniques, will help you create more
                reliable code and solve problems more efficiently.
              </p>
            </div>

            {/* Code Examples */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Try-Catch Statements</h3>
                  <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                    <code>{codeExamples.tryCatch}</code>
                  </pre>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Types</h3>
                  <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                    <code>{codeExamples.errorTypes}</code>
                  </pre>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Errors</h3>
                  <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                    <code>{codeExamples.customErrors}</code>
                  </pre>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Debugging Techniques</h3>
                  <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                    <code>{codeExamples.debugging}</code>
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