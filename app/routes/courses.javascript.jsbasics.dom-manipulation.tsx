import { useState } from "react";
import { Link } from "@remix-run/react";
import JavaScriptSidebar from "~/components/JavaScriptSidebar";

export default function DOMManipulation() {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState("");

  const codeExamples = {
    selecting: `// Selecting Elements
// By ID
const element = document.getElementById('myId');

// By Class Name
const elements = document.getElementsByClassName('myClass');

// By Tag Name
const divs = document.getElementsByTagName('div');

// Using Query Selector
const firstMatch = document.querySelector('.myClass');
const allMatches = document.querySelectorAll('.myClass');`,
    modifying: `// Modifying Elements
// Changing Text Content
element.textContent = 'New Text';
element.innerHTML = '<span>HTML Content</span>';

// Modifying Attributes
element.setAttribute('class', 'newClass');
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('visible');

// Changing Styles
element.style.color = 'blue';
element.style.backgroundColor = '#f0f0f0';
element.style.display = 'none';`,
    events: `// Event Handling
// Click Event
element.addEventListener('click', function(event) {
  console.log('Element clicked!');
  event.preventDefault(); // Prevent default behavior
});

// Form Events
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(form);
  console.log(formData.get('username'));
});

// Keyboard Events
document.addEventListener('keydown', function(event) {
  console.log(\`Key pressed: \${event.key}\`);
});`,
    creating: `// Creating and Removing Elements
// Create Element
const newDiv = document.createElement('div');
newDiv.textContent = 'New Element';
newDiv.classList.add('new-class');

// Append Element
parentElement.appendChild(newDiv);

// Insert Before
parentElement.insertBefore(newDiv, referenceElement);

// Remove Element
element.remove();
// Or
parentElement.removeChild(element);`
  };

  const exercises = [
    {
      title: "DOM Selection",
      description: "Write code to select all paragraphs with class 'highlight' and change their text color to red.",
      template: `// Select all paragraphs with class 'highlight'
// and change their color to red
`,
      solution: `const highlights = document.querySelectorAll('p.highlight');
highlights.forEach(element => {
  element.style.color = 'red';
});`,
      hint: "Use querySelectorAll and forEach to modify multiple elements."
    },
    {
      title: "Event Handling",
      description: "Create a button click handler that toggles a 'dark-mode' class on the body element.",
      template: `// Add click event listener to button
// that toggles 'dark-mode' class on body
`,
      solution: `const button = document.querySelector('#themeButton');
button.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});`,
      hint: "Use addEventListener for the click event and classList.toggle for the class."
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
              <h1 className="text-2xl font-bold text-gray-900">DOM Manipulation</h1>
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
                <h2 className="text-xl font-bold text-gray-900">Understanding DOM Manipulation</h2>
                <p className="text-gray-600">
                  The Document Object Model (DOM) is a programming interface for HTML documents. It represents the
                  page as a tree of objects that you can modify with JavaScript. Learning DOM manipulation is
                  essential for creating interactive web applications.
                </p>
              </div>

              {/* Code Examples */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Selecting Elements</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.selecting}</code>
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Modifying Elements</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.modifying}</code>
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Handling</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.events}</code>
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Creating and Removing Elements</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.creating}</code>
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