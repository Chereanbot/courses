import { useState } from "react";
import { Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";

export default function ObjectsAndArrays() {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'challenge'>('learn');
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState("");

  const codeExamples = {
    arrays: `// Array Creation and Methods
let fruits = ['apple', 'banana', 'orange'];
let numbers = [1, 2, 3, 4, 5];

// Array Methods
fruits.push('grape');           // Add to end
fruits.pop();                   // Remove from end
fruits.unshift('mango');        // Add to start
fruits.shift();                 // Remove from start
fruits.slice(1, 3);            // Get subset
fruits.splice(1, 1, 'kiwi');   // Replace elements`,
    objects: `// Object Creation and Properties
let person = {
  name: 'John',
  age: 25,
  hobbies: ['reading', 'music'],
  address: {
    street: '123 Main St',
    city: 'Boston'
  }
};

// Accessing and Modifying
person.name = 'Jane';           // Dot notation
person['age'] = 26;            // Bracket notation
delete person.hobbies;         // Remove property`,
    modern: `// Modern Array and Object Features
// Array Destructuring
let [first, second, ...rest] = numbers;

// Object Destructuring
let { name, age } = person;

// Spread Operator
let newFruits = [...fruits, 'pear'];
let updatedPerson = { ...person, age: 27 };

// Array Methods
let doubled = numbers.map(n => n * 2);
let evens = numbers.filter(n => n % 2 === 0);
let sum = numbers.reduce((a, b) => a + b, 0);`
  };

  const exercises = [
    {
      title: "Array Manipulation",
      description: "Create an array of colors and add a new color to it.",
      template: "// Create an array named 'colors' with three colors\n// Then add a new color to the end\n",
      solution: "let colors = ['red', 'blue', 'green'];\ncolors.push('yellow');",
      hint: "Use array methods like push() to add elements."
    },
    {
      title: "Object Creation",
      description: "Create an object representing a book with title, author, and year properties.",
      template: "// Create a book object with appropriate properties\n",
      solution: "let book = {\n  title: 'JavaScript Guide',\n  author: 'John Doe',\n  year: 2023\n};",
      hint: "Use curly braces {} to create objects and define properties with key-value pairs."
    }
  ];

  const challenges = [
    {
      title: "Array and Object Challenge",
      description: "Create a function that finds all books by a specific author in an array of book objects.",
      code: `const books = [
  { title: 'Book 1', author: 'John Doe' },
  { title: 'Book 2', author: 'Jane Smith' },
  { title: 'Book 3', author: 'John Doe' }
];

// Create a function findBooksByAuthor that takes
// the books array and author name as parameters
// and returns an array of books by that author`,
      solution: `function findBooksByAuthor(books, author) {
  return books.filter(book => book.author === author);
}`,
      test: (code: string) => {
        try {
          const books = [
            { title: 'Book 1', author: 'John Doe' },
            { title: 'Book 2', author: 'Jane Smith' },
            { title: 'Book 3', author: 'John Doe' }
          ];
          eval(code);
          // @ts-ignore
          const result = findBooksByAuthor(books, 'John Doe');
          return result.length === 2 && result.every((book: any) => book.author === 'John Doe');
        } catch (e) {
          return false;
        }
      }
    }
  ];

  return (
    <SharedLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Header */}
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
                <h1 className="text-2xl font-bold text-gray-900">Objects and Arrays</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 py-6">
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
              <button
                onClick={() => setActiveTab('challenge')}
                className={`${
                  activeTab === 'challenge'
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium`}
              >
                Challenge
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
                  <h2 className="text-xl font-bold text-gray-900">Understanding Objects and Arrays</h2>
                  <p className="text-gray-600">
                    Objects and Arrays are fundamental data structures in JavaScript. Arrays are ordered collections
                    of values, while objects are collections of key-value pairs. Understanding how to work with
                    these structures is crucial for effective JavaScript programming.
                  </p>
                </div>

                {/* Code Examples */}
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Working with Arrays</h3>
                      <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                        <code>{codeExamples.arrays}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Working with Objects</h3>
                      <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                        <code>{codeExamples.objects}</code>
                      </pre>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Modern Features</h3>
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

            {/* Challenge Section */}
            {activeTab === 'challenge' && (
              <div className="space-y-8">
                {challenges.map((challenge, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm">
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{challenge.title}</h3>
                      <p className="text-gray-600 mb-4">{challenge.description}</p>
                      <div className="space-y-4">
                        <div className="relative">
                          <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                            <code>{challenge.code}</code>
                          </pre>
                          <button
                            onClick={() => {
                              setOutput(challenge.solution);
                              setShowOutput(true);
                            }}
                            className="absolute top-2 right-2 px-3 py-1 text-sm text-gray-400 hover:text-white bg-gray-700 rounded"
                          >
                            Show Solution
                          </button>
                        </div>
                        {showOutput && (
                          <div className="mt-4">
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Solution:</h4>
                            <pre className="bg-gray-100 text-gray-800 rounded-lg p-4 overflow-x-auto">
                              <code>{output}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <Link
              to="../variables-and-datatypes"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Previous Lesson
            </Link>
            <Link
              to="../functions-and-scope"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
            >
              Next Lesson
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
} 