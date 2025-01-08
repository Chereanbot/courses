import { useState } from "react";
import { Link } from "@remix-run/react";
import JavaScriptSidebar from "~/components/JavaScriptSidebar";

export default function AsyncJavaScript() {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [showOutput, setShowOutput] = useState(false);
  const [output, setOutput] = useState("");

  const codeExamples = {
    callbacks: `// Callback Example
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: 'John' };
    callback(data);
  }, 1000);
}

fetchData((result) => {
  console.log(result); // { id: 1, name: 'John' }
});

// Callback Hell Example (What to Avoid)
fetchUser(userId, (user) => {
  fetchPosts(user.id, (posts) => {
    fetchComments(posts[0].id, (comments) => {
      console.log(comments);
    });
  });
});`,
    promises: `// Promise Example
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = { id: id, name: 'John' };
      resolve(user);
      // If error: reject(new Error('User not found'));
    }, 1000);
  });
}

// Using Promises
fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error(error));

// Promise Chaining
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(error => console.error(error));`,
    asyncAwait: `// Async/Await Example
async function getUserData(id) {
  try {
    const user = await fetchUser(id);
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    return { user, posts, comments };
  } catch (error) {
    console.error('Error:', error);
  }
}

// Using Async Function
async function init() {
  const data = await getUserData(1);
  console.log(data);
}

// Parallel Requests
async function getMultipleUsers() {
  const userPromises = [
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
  ];
  const users = await Promise.all(userPromises);
  return users;
}`,
    fetch: `// Fetch API Example
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Async/Await with Fetch
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}`
  };

  const exercises = [
    {
      title: "Promise Creation",
      description: "Create a promise that resolves after a specified delay with a given value.",
      template: `// Create a function that returns a promise
// which resolves after 'delay' milliseconds
function delay(ms, value) {
  // Add your code here
}`,
      solution: `function delay(ms, value) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

// Usage:
// delay(1000, "Hello").then(result => console.log(result));`,
      hint: "Use the Promise constructor with setTimeout."
    },
    {
      title: "Async Data Fetching",
      description: "Write an async function that fetches user data and their posts.",
      template: `// Create an async function that fetches
// user data and their posts
async function getUserWithPosts(userId) {
  // Add your code here
}`,
      solution: `async function getUserWithPosts(userId) {
  try {
    const user = await fetch(\`https://api.example.com/users/\${userId}\`);
    const userData = await user.json();
    
    const posts = await fetch(\`https://api.example.com/users/\${userId}/posts\`);
    const postsData = await posts.json();
    
    return {
      user: userData,
      posts: postsData
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}`,
      hint: "Use try/catch with await for each fetch call."
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
              <h1 className="text-2xl font-bold text-gray-900">Asynchronous JavaScript</h1>
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
                <h2 className="text-xl font-bold text-gray-900">Understanding Asynchronous JavaScript</h2>
                <p className="text-gray-600">
                  Asynchronous programming is crucial for handling operations that might take some time to complete,
                  such as fetching data from a server or reading files. JavaScript provides several ways to work
                  with asynchronous code, from callbacks to modern async/await syntax.
                </p>
              </div>

              {/* Code Examples */}
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Callbacks</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.callbacks}</code>
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Promises</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.promises}</code>
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Async/Await</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.asyncAwait}</code>
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Fetch API</h3>
                    <pre className="bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{codeExamples.fetch}</code>
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