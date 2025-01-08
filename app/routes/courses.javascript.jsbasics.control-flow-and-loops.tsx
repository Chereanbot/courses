import { useState } from "react";
import { Link } from "@remix-run/react";
import JavaScriptSidebar from "~/components/JavaScriptSidebar";

export default function ControlFlowAndLoops() {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState("");

  const codeExamples = {
    conditionals: `// If-Else Statements
let age = 18;
if (age >= 18) {
  console.log("You can vote!");
} else {
  console.log("Too young to vote.");
}

// Switch Statement
let day = "Monday";
switch (day) {
  case "Monday":
    console.log("Start of the week");
    break;
  case "Friday":
    console.log("Weekend is near!");
    break;
  default:
    console.log("Regular day");
}`,
    loops: `// For Loop
for (let i = 0; i < 5; i++) {
  console.log(\`Count: \${i}\`);
}

// While Loop
let count = 0;
while (count < 3) {
  console.log(\`While count: \${count}\`);
  count++;
}

// For...of Loop (Arrays)
let colors = ['red', 'green', 'blue'];
for (let color of colors) {
  console.log(color);
}`,
    advanced: `// Break and Continue
for (let i = 0; i < 5; i++) {
  if (i === 2) continue; // Skip 2
  if (i === 4) break;    // Stop at 4
  console.log(i);
}

// Nested Loops
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 2; j++) {
    console.log(\`i: \${i}, j: \${j}\`);
  }
}`
  };

  const exercises = [
    {
      title: "Conditional Logic",
      description: "Write a function that checks if a number is positive, negative, or zero.",
      template: "// Write your function here\nfunction checkNumber(num) {\n  // Add your code\n}",
      solution: `function checkNumber(num) {
  if (num > 0) {
    return "Positive";
  } else if (num < 0) {
    return "Negative";
  } else {
    return "Zero";
  }
}`,
      hint: "Use if-else statements to check the number's value."
    },
    {
      title: "Loop Practice",
      description: "Create a function that sums all numbers from 1 to n using a loop.",
      template: "// Write your function here\nfunction sumToN(n) {\n  // Add your code\n}",
      solution: `function sumToN(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}`,
      hint: "Use a for loop to iterate from 1 to n and keep track of the sum."
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
              <h1 className="text-2xl font-bold text-gray-900">Control Flow and Loops</h1>
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
                <h2 className="text-xl font-bold text-gray-900">Understanding Control Flow and Loops</h2>
                <p className="text-gray-600">
                  Control flow statements and loops are essential for creating dynamic and efficient programs.
                  They allow you to make decisions in your code and repeat actions without writing redundant code.
                </p>
              </div>

              {/* Code Examples */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Conditional Statements</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.conditionals}</code>
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Loop Types</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.loops}</code>
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Control Flow</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.advanced}</code>
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