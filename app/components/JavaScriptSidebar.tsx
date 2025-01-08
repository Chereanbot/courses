import { Link, useLocation } from "@remix-run/react";

export default function JavaScriptSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const modules = [
    {
      title: "Introduction to JavaScript",
      path: "/courses/javascript/jsbasics/variables-and-datatypes",
      icon: "📝"
    },
    {
      title: "Objects and Arrays",
      path: "/courses/javascript/jsbasics/objects-and-arrays",
      icon: "🔄"
    },
    {
      title: "Functions & Scope",
      path: "/courses/javascript/jsbasics/functions-and-scope",
      icon: "🎯"
    },
    {
      title: "Control Flow & Loops",
      path: "/courses/javascript/jsbasics/control-flow-and-loops",
      icon: "🔄"
    },
    {
      title: "DOM Manipulation",
      path: "/courses/javascript/jsbasics/dom-manipulation",
      icon: "🌐"
    },
    {
      title: "Asynchronous JavaScript",
      path: "/courses/javascript/jsbasics/async-javascript",
      icon: "⚡"
    },
    {
      title: "Error Handling & Debugging",
      path: "/courses/javascript/jsbasics/error-handling",
      icon: "🐛"
    }
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4">
        <Link 
          to="/courses/javascript"
          className="flex items-center space-x-2 mb-8"
        >
          <span className="text-2xl">📚</span>
          <span className="font-bold text-gray-800">JavaScript Course</span>
        </Link>

        <nav className="space-y-2">
          {modules.map((module, index) => (
            <Link
              key={index}
              to={module.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-150 ${
                currentPath === module.path
                  ? "bg-yellow-50 text-yellow-700 border-2 border-yellow-500"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="text-xl">{module.icon}</span>
              <span className="text-sm font-medium">{module.title}</span>
            </Link>
          ))}
        </nav>

        {/* Progress Section */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Course Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">45% Complete</p>
        </div>

        {/* Resources Section */}
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Additional Resources</h3>
          <div className="space-y-2">
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-yellow-600"
            >
              <span>📚</span>
              <span>MDN Documentation</span>
            </a>
            <a
              href="https://javascript.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm text-gray-600 hover:text-yellow-600"
            >
              <span>📖</span>
              <span>JavaScript.info</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 