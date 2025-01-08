import { useState } from "react";
import { useUser } from "@clerk/remix";
import { Link } from "@remix-run/react";

export default function CppCourses() {
  const { user } = useUser();
  const [activeModule, setActiveModule] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const modules = [
    {
      id: 1,
      title: "Introduction to C++",
      lessons: [
        {
          id: "1.1",
          title: "Getting Started with C++",
          duration: "45 mins",
          topics: ["What is C++?", "Setting up your development environment", "Your first C++ program"],
          completed: true
        },
        {
          id: "1.2",
          title: "Basic Syntax and Structure",
          duration: "60 mins",
          topics: ["Basic syntax", "Variables and data types", "Input and output"],
          completed: true
        },
        {
          id: "1.3",
          title: "Control Flow",
          duration: "90 mins",
          topics: ["If statements", "Loops", "Switch statements"],
          completed: false
        }
      ]
    },
    {
      id: 2,
      title: "Object-Oriented Programming",
      lessons: [
        {
          id: "2.1",
          title: "Classes and Objects",
          duration: "75 mins",
          topics: ["Class definition", "Objects creation", "Access specifiers"],
          completed: false
        },
        {
          id: "2.2",
          title: "Inheritance",
          duration: "60 mins",
          topics: ["Base and derived classes", "Types of inheritance", "Virtual functions"],
          completed: false
        },
        {
          id: "2.3",
          title: "Polymorphism",
          duration: "90 mins",
          topics: ["Function overloading", "Operator overloading", "Virtual functions"],
          completed: false
        }
      ]
    },
    {
      id: 3,
      title: "Advanced C++ Concepts",
      lessons: [
        {
          id: "3.1",
          title: "Templates",
          duration: "60 mins",
          topics: ["Function templates", "Class templates", "Template specialization"],
          completed: false
        },
        {
          id: "3.2",
          title: "Exception Handling",
          duration: "45 mins",
          topics: ["Try-catch blocks", "Throwing exceptions", "Custom exceptions"],
          completed: false
        },
        {
          id: "3.3",
          title: "STL",
          duration: "120 mins",
          topics: ["Containers", "Iterators", "Algorithms"],
          completed: false
        }
      ]
    }
  ];

  const resources = [
    {
      title: "Development Tools",
      items: [
        { name: "Visual Studio Code", link: "https://code.visualstudio.com/" },
        { name: "CodeBlocks", link: "http://www.codeblocks.org/" },
        { name: "Dev-C++", link: "https://www.bloodshed.net/" }
      ]
    },
    {
      title: "Additional Learning",
      items: [
        { name: "C++ Reference", link: "https://en.cppreference.com/" },
        { name: "C++ Tutorial", link: "https://www.learncpp.com/" },
        { name: "Practice Problems", link: "https://www.hackerrank.com/domains/cpp" }
      ]
    }
  ];

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Course Header */}
      <div className={`py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                C++ Programming Course
              </h1>
              <p className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Master modern C++ programming from basics to advanced concepts
              </p>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {isDarkMode ? '🌞' : '🌙'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2 space-y-6">
            {modules.map((module) => (
              <div
                key={module.id}
                className={`rounded-lg shadow-lg overflow-hidden ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div
                  className={`p-4 cursor-pointer ${
                    activeModule === module.id
                      ? isDarkMode
                        ? 'bg-blue-900'
                        : 'bg-blue-50'
                      : ''
                  }`}
                  onClick={() => setActiveModule(module.id)}
                >
                  <h2 className={`text-xl font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Module {module.id}: {module.title}
                  </h2>
                </div>
                
                {activeModule === module.id && (
                  <div className="p-4 space-y-4">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className={`p-4 rounded-lg ${
                          isDarkMode
                            ? 'bg-gray-700 hover:bg-gray-600'
                            : 'bg-gray-50 hover:bg-gray-100'
                        } transition-colors duration-200`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">
                            {lesson.id} {lesson.title}
                          </h3>
                          <span className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {lesson.duration}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {lesson.topics.map((topic, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <span className="text-blue-500">•</span>
                              <span className={`text-sm ${
                                isDarkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}>
                                {topic}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <span className={`text-sm ${
                            lesson.completed
                              ? 'text-green-500'
                              : isDarkMode
                              ? 'text-gray-400'
                              : 'text-gray-500'
                          }`}>
                            {lesson.completed ? 'Completed' : 'Not started'}
                          </span>
                          <button
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                              isDarkMode
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-blue-500 hover:bg-blue-600 text-white'
                            }`}
                          >
                            {lesson.completed ? 'Review' : 'Start'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className={`rounded-lg shadow-lg p-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h2 className={`text-xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Your Progress
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                      Course Completion
                    </span>
                    <span className="text-blue-500 font-medium">25%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: '25%' }}
                    ></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      2/9
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Lessons Completed
                    </div>
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      4.5
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Hours Spent
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className={`rounded-lg shadow-lg p-6 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h2 className={`text-xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Resources
              </h2>
              <div className="space-y-6">
                {resources.map((section, index) => (
                  <div key={index}>
                    <h3 className={`font-medium mb-2 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm hover:underline ${
                              isDarkMode
                                ? 'text-blue-400 hover:text-blue-300'
                                : 'text-blue-600 hover:text-blue-700'
                            }`}
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Section */}
            <div className={`rounded-lg shadow-lg p-6 ${
              isDarkMode ? 'bg-blue-900' : 'bg-blue-50'
            }`}>
              <h2 className={`text-xl font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Need Help?
              </h2>
              <p className={`text-sm mb-4 ${
                isDarkMode ? 'text-blue-100' : 'text-blue-600'
              }`}>
                Get support from our C++ experts
              </p>
              <Link
                to="/contact"
                className={`block text-center px-4 py-2 rounded-lg text-sm font-medium ${
                  isDarkMode
                    ? 'bg-white text-blue-900 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 