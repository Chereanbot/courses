import { useState, useEffect } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/remix";
import SharedLayout from "~/components/SharedLayout";

export default function PythonCourse() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      image: "/course-images/python/hero1.jpg",
      title: "Learn Python Programming",
      description: "Master the fundamentals of Python programming language"
    },
    {
      image: "/course-images/python/hero2.jpg",
      title: "Build Real Projects",
      description: "Create practical applications and solve real-world problems"
    },
    {
      image: "/course-images/python/hero3.jpg",
      title: "Data Science & AI",
      description: "Explore data analysis, machine learning, and artificial intelligence"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const courseContent = [
    {
      title: "Python Fundamentals",
      topics: ["Variables & Data Types", "Control Flow", "Functions", "Object-Oriented Programming"],
      duration: "4 weeks",
      icon: "🐍"
    },
    {
      title: "Advanced Python",
      topics: ["Decorators", "Generators", "Context Managers", "Metaclasses"],
      duration: "4 weeks",
      icon: "⚡"
    },
    {
      title: "Python Libraries",
      topics: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
      duration: "4 weeks",
      icon: "📚"
    },
    {
      title: "Projects & Applications",
      topics: ["Web Scraping", "API Development", "Data Analysis", "Machine Learning"],
      duration: "4 weeks",
      icon: "🚀"
    }
  ];

  return (
    <SignedIn>
      <SharedLayout>
        {/* Hero Section with Slideshow */}
        <div className="relative h-[600px] overflow-hidden">
          {/* Slideshow */}
          <div className="absolute inset-0">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white space-y-6 max-w-4xl px-4">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slideshow Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Course Overview */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Course Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master Python programming through our comprehensive curriculum designed
              for both beginners and advanced developers.
            </p>
          </div>

          {/* Course Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courseContent.map((section, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="p-6">
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{section.duration}</p>
                  <ul className="space-y-2">
                    {section.topics.map((topic, topicIndex) => (
                      <li
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
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:from-blue-700 hover:to-purple-700 transition duration-300 transform hover:scale-105">
              Start Learning Python
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Interactive Learning */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">👩‍💻</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Interactive Learning
                </h3>
                <p className="text-gray-600">
                  Practice with real-time code execution and instant feedback
                </p>
              </div>

              {/* Expert Support */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">👨‍🏫</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Expert Support
                </h3>
                <p className="text-gray-600">
                  Get help from experienced Python developers and mentors
                </p>
              </div>

              {/* Project-Based */}
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Project-Based
                </h3>
                <p className="text-gray-600">
                  Build real-world applications to strengthen your portfolio
                </p>
              </div>
            </div>
          </div>
        </div>
      </SharedLayout>
    </SignedIn>
  );
} 