import { SignedIn } from "@clerk/remix";
import { Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";

export default function PythonProjects() {
  const projects = [
    {
      title: "Task Manager",
      difficulty: "Beginner",
      duration: "1-2 weeks",
      description: "Build a command-line task manager using Python's built-in modules",
      topics: ["File I/O", "Data Structures", "Command Line Interface"],
      icon: "📋"
    },
    {
      title: "Weather App",
      difficulty: "Intermediate",
      duration: "2-3 weeks",
      description: "Create a weather application that fetches real-time data from an API",
      topics: ["API Integration", "JSON Parsing", "Data Visualization"],
      icon: "🌤️"
    },
    {
      title: "Web Scraper",
      difficulty: "Intermediate",
      duration: "2-3 weeks",
      description: "Develop a web scraper to collect and analyze data from websites",
      topics: ["BeautifulSoup", "Requests", "Data Analysis"],
      icon: "🕷️"
    },
    {
      title: "Chat Application",
      difficulty: "Advanced",
      duration: "3-4 weeks",
      description: "Build a real-time chat application using Python and WebSocket",
      topics: ["WebSocket", "Asyncio", "Database Integration"],
      icon: "💬"
    }
  ];

  const categories = [
    "All Projects",
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Automation"
  ];

  return (
    <SignedIn>
      <SharedLayout>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Python Projects
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl">
              Apply your Python skills to real-world projects. Build your portfolio
              and gain practical experience.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex space-x-4 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <div className="flex space-x-4 mb-4">
                    <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {project.difficulty}
                    </span>
                    <span className="text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      {project.duration}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="space-y-2">
                    {project.topics.map((topic, topicIndex) => (
                      <div
                        key={topicIndex}
                        className="flex items-center text-gray-700"
                      >
                        <svg
                          className="w-4 h-4 mr-2 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {topic}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link
                      to={`/courses/python/projects/${index + 1}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700"
                    >
                      View Project Details
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Choose a project that matches your skill level and start coding.
              Our mentors are here to help you succeed.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition duration-300 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </SharedLayout>
    </SignedIn>
  );
} 