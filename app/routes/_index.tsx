import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/remix";

export const meta: MetaFunction = () => {
  return [
    { title: "Welcome to Our Course Platform" },
    { name: "description", content: "Discover and learn with our amazing courses" },
  ];
};

export default function Index() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Stats counter animation
  const [stats] = useState({
    students: 15000,
    courses: 150,
    instructors: 50,
    rating: 4.8
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      {/* Navigation Bar - Update the nav classes */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition duration-300">
                CourseHub
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <a href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">Home</a>
              
              {/* Courses Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                  className="text-gray-700 group-hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center transition duration-150 ease-in-out"
                >
                  Courses
                  <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition duration-150 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-[800px] rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out">
                  <div className="p-6 grid grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Programming Fundamentals</h3>
                      <div className="space-y-2">
                        <a href="/courses/python" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">🐍</span>
                          Python Programming
                        </a>
                        <a href="/courses/java" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">☕</span>
                          Java Development
                        </a>
                        <a href="/courses/javascript" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">📱</span>
                          JavaScript & Node.js
                        </a>
                        <a href="/courses/cpp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">⚡</span>
                          C/C++ Programming
                        </a>
                        <a href="/courses/csharp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">#</span>
                          C# and .NET
                        </a>
                        <a href="/courses/rust" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">🦀</span>
                          Rust Programming
                        </a>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Advanced Computing</h3>
                      <div className="space-y-2">
                        <a href="/courses/algorithms" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">🧮</span>
                          Data Structures & Algorithms
                        </a>
                        <a href="/courses/machine-learning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">🤖</span>
                          Machine Learning & AI
                        </a>
                        <a href="/courses/deep-learning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">🧠</span>
                          Deep Learning
                        </a>
                        <a href="/courses/computer-vision" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">👁️</span>
                          Computer Vision
                        </a>
                        <a href="/courses/nlp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">💬</span>
                          Natural Language Processing
                        </a>
                        <a href="/courses/robotics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">🤖</span>
                          Robotics
                        </a>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">Specialized Tracks</h3>
                      <div className="space-y-2">
                        <a href="/courses/web-dev" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">🌐</span>
                          Full-Stack Web Development
                        </a>
                        <a href="/courses/mobile-dev" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">📱</span>
                          Mobile App Development
                        </a>
                        <a href="/courses/data-science" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">📊</span>
                          Data Science & Analytics
                        </a>
                        <a href="/courses/cloud" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">☁️</span>
                          Cloud Computing
                        </a>
                        <a href="/courses/cybersecurity" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">🔒</span>
                          Cybersecurity
                        </a>
                        <a href="/courses/devops" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">⚙️</span>
                          DevOps & Infrastructure
                        </a>
                      </div>
                    </div>

                    <div className="col-span-3 mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">New & Trending Courses</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <a href="/courses/blockchain" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition duration-300">
                          <span className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center mr-3">⛓️</span>
                          <div>
                            <div className="font-medium text-sm">Blockchain Development</div>
                            <div className="text-xs text-gray-500">Web3 & Smart Contracts</div>
                          </div>
                        </a>
                        <a href="/courses/ar-vr" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition duration-300">
                          <span className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center mr-3">🥽</span>
                          <div>
                            <div className="font-medium text-sm">AR/VR Development</div>
                            <div className="text-xs text-gray-500">Metaverse & Gaming</div>
                          </div>
                        </a>
                        <a href="/courses/quantum" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition duration-300">
                          <span className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center mr-3">⚛️</span>
                          <div>
                            <div className="font-medium text-sm">Quantum Computing</div>
                            <div className="text-xs text-gray-500">Future of Computing</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Projects Dropdown */}
              <div className="relative group">
                <button
                  className="text-gray-700 group-hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center transition duration-150 ease-in-out"
                >
                  Projects
                  <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition duration-150 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-[600px] rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out">
                  <div className="p-6 grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Programming Projects</h3>
                      <div className="space-y-2">
                        <a href="/projects/cpp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">⚡</span>
                          C++ Projects
                        </a>
                        <a href="/projects/java" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">☕</span>
                          Java Projects
                        </a>
                        <a href="/projects/dbms" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">🗄️</span>
                          DBMS Projects
                        </a>
                        <a href="/projects/oop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">🎯</span>
                          OOP Projects
                        </a>
                        <a href="/projects/python" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">🐍</span>
                          Python Projects
                        </a>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Advanced Projects</h3>
                      <div className="space-y-2">
                        <a href="/projects/ai-ml" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">🤖</span>
                          AI & ML Projects
                        </a>
                        <a href="/projects/web" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">🌐</span>
                          Web Development
                        </a>
                        <a href="/projects/mobile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">📱</span>
                          Mobile Development
                        </a>
                        <a href="/projects/blockchain" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">⛓️</span>
                          Blockchain Projects
                        </a>
                        <a href="/projects/cloud" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                          <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">☁️</span>
                          Cloud Computing
                        </a>
                      </div>
                    </div>

                    <div className="col-span-2 mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Featured Projects</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <a href="/projects/featured/iot" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition duration-300">
                          <span className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center mr-3">🔌</span>
                          <div>
                            <div className="font-medium text-sm">IoT Systems</div>
                            <div className="text-xs text-gray-500">Smart Home & Automation</div>
                          </div>
                        </a>
                        <a href="/projects/featured/security" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition duration-300">
                          <span className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center mr-3">🔒</span>
                          <div>
                            <div className="font-medium text-sm">Cybersecurity</div>
                            <div className="text-xs text-gray-500">Security & Cryptography</div>
                          </div>
                        </a>
                        <a href="/projects/featured/data-science" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition duration-300">
                          <span className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center mr-3">📊</span>
                          <div>
                            <div className="font-medium text-sm">Data Science</div>
                            <div className="text-xs text-gray-500">Analytics & Visualization</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resources Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  className="text-gray-700 group-hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center transition duration-150 ease-in-out"
                >
                  Resources
                  <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition duration-150 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out">
                  <div className="p-4">
                    <div className="space-y-2">
                      <a href="/resources/blog" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg">
                        <span className="text-blue-500 mr-2">📝</span>
                        Blog & Articles
                      </a>
                      <a href="/resources/tutorials" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg">
                        <span className="text-blue-500 mr-2">📚</span>
                        Tutorials
                      </a>
                      <a href="/resources/community" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg">
                        <span className="text-blue-500 mr-2">👥</span>
                        Community Forum
                      </a>
                      <a href="/resources/events" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg">
                        <span className="text-blue-500 mr-2">🎯</span>
                        Events & Workshops
                      </a>
                      <a href="/resources/projects" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg">
                        <span className="text-blue-500 mr-2">🚀</span>
                        Practice Projects
                      </a>
                      <a href="/resources/career" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg">
                        <span className="text-blue-500 mr-2">💼</span>
                        Career Resources
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <a href="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">About</a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">Contact</a>
              
              {/* Auth Buttons */}
              <div className="flex items-center space-x-3">
                {!isLoaded ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-20 rounded-lg"></div>
                ) : isSignedIn ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700">Welcome, {user.firstName}!</span>
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10 rounded-lg",
                        }
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <button className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 text-sm font-medium border border-gray-200">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition duration-300 text-sm font-medium shadow-md hover:shadow-lg">
                        Get Started
                      </button>
                    </SignUpButton>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center space-x-3">
              {!isLoaded ? (
                <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-lg"></div>
              ) : isSignedIn ? (
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8 rounded-lg",
                    }
                  }}
                />
              ) : (
                <SignInButton mode="modal">
                  <button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-2 rounded-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>
                </SignInButton>
              )}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
              <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Home
              </a>
              <a
                href="/courses"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Courses
              </a>
              <a
                href="/resources"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Resources
              </a>
              <a
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                About
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with enhanced animations */}
      <div className="container mx-auto px-4 pt-32 lg:pt-40">
        <div className="text-center relative">
          {/* Animated decorative elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10 animate-gradient-xy"></div>
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-gradient-to-r from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl -z-10 animate-gradient-y"></div>
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl -z-10 animate-gradient-x"></div>
          
          {/* Animated heading with gradient animation */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient-x text-transparent bg-clip-text mb-6 leading-tight animate-fade-in-up">
            Welcome to Our Course Platform
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Expand your knowledge with our comprehensive learning resources. Join thousands of students learning Computer Science and Programming.
          </p>
          
          {/* Enhanced animated buttons */}
          <div className="space-x-4 flex flex-col sm:flex-row justify-center gap-4 sm:gap-0 animate-fade-in-up delay-400">
            <button className="group bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-neon transition-all duration-500 transform hover:-translate-y-1 relative overflow-hidden">
              <span className="relative z-10 group-hover:animate-pulse-slow">Get Started</span>
              <div className="absolute inset-0 h-full w-full transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700"></div>
            </button>
            <button className="group bg-white text-gray-700 px-8 py-4 rounded-xl border-2 border-gray-100 hover:border-indigo-200 hover:shadow-neon-indigo transition-all duration-500 transform hover:-translate-y-1 relative overflow-hidden">
              <span className="relative z-10 group-hover:text-indigo-600 transition-colors duration-300">Browse Courses</span>
              <div className="absolute inset-0 h-full w-full transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-out rounded-xl bg-gradient-to-r from-gray-50 to-indigo-50"></div>
            </button>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24">
          {Object.entries(stats).map(([key, value], index) => (
            <div key={key} className="text-center group hover:animate-float transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text mb-2 group-hover:animate-gradient-x">
                {typeof value === 'number' ? value.toLocaleString() + (key === 'rating' ? '' : '+') : value}
              </div>
              <p className="text-gray-600 capitalize">{key}</p>
            </div>
          ))}
        </div>

        {/* Enhanced Features Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-xl shadow-lg hover:shadow-neon transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
            <div className="text-blue-600 text-3xl mb-4 bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center group-hover:animate-wiggle">📚</div>
            <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text group-hover:animate-gradient-x">Quality Content</h3>
            <p className="text-gray-600">Access high-quality courses designed by experts in their fields. Learn from industry professionals.</p>
          </div>
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-xl shadow-lg hover:shadow-neon transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
            <div className="text-indigo-600 text-3xl mb-4 bg-indigo-50 w-14 h-14 rounded-lg flex items-center justify-center group-hover:animate-wiggle">💡</div>
            <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text group-hover:animate-gradient-x">Learn at Your Pace</h3>
            <p className="text-gray-600">Study at your own speed with flexible learning schedules. Access content anytime, anywhere.</p>
          </div>
          <div className="bg-white/70 backdrop-blur-lg p-8 rounded-xl shadow-lg hover:shadow-neon transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
            <div className="text-purple-600 text-3xl mb-4 bg-purple-50 w-14 h-14 rounded-lg flex items-center justify-center group-hover:animate-wiggle">🎯</div>
            <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text group-hover:animate-gradient-x">Achieve Goals</h3>
            <p className="text-gray-600">Track your progress and achieve your learning objectives with our structured curriculum.</p>
          </div>
        </div>

        {/* Enhanced Course Categories */}
        <div className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text animate-gradient-x">
            Popular Course Categories
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-md hover:shadow-neon transition-all duration-300 border border-gray-100 group hover:-translate-y-2">
              <div className="text-2xl mb-3 bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center group-hover:animate-bounce-slow">🌐</div>
              <h3 className="font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Web Development</h3>
              <p className="text-sm text-gray-600 mb-4">Learn frontend and backend development</p>
              <a href="/courses/web-dev" className="text-blue-600 text-sm hover:text-blue-700 flex items-center group">
                View Courses 
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            <div className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-md hover:shadow-neon transition-all duration-300 border border-gray-100 group hover:-translate-y-2">
              <div className="text-2xl mb-3 bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center group-hover:animate-bounce-slow">🐍</div>
              <h3 className="font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Python Programming</h3>
              <p className="text-sm text-gray-600 mb-4">Master Python programming language</p>
              <a href="/courses/python" className="text-indigo-600 text-sm hover:text-indigo-700 flex items-center group">
                View Courses
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            <div className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-md hover:shadow-neon transition-all duration-300 border border-gray-100 group hover:-translate-y-2">
              <div className="text-2xl mb-3 bg-purple-50 w-12 h-12 rounded-lg flex items-center justify-center group-hover:animate-bounce-slow">📊</div>
              <h3 className="font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Data Science</h3>
              <p className="text-sm text-gray-600 mb-4">Learn data analysis and visualization</p>
              <a href="/courses/data-science" className="text-purple-600 text-sm hover:text-purple-700 flex items-center group">
                View Courses
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
            <div className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-md hover:shadow-neon transition-all duration-300 border border-gray-100 group hover:-translate-y-2">
              <div className="text-2xl mb-3 bg-pink-50 w-12 h-12 rounded-lg flex items-center justify-center group-hover:animate-bounce-slow">🧮</div>
              <h3 className="font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Algorithms</h3>
              <p className="text-sm text-gray-600 mb-4">Master DSA fundamentals</p>
              <a href="/courses/algorithms" className="text-pink-600 text-sm hover:text-pink-700 flex items-center group">
                View Courses
                <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced Testimonials Section */}
        <div className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text animate-gradient-x">
            What Our Students Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-neon transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold group-hover:animate-spin-slow">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-gray-600">Web Development Student</p>
                </div>
              </div>
              <p className="text-gray-600">"The courses are well-structured and the instructors are highly knowledgeable. I've learned so much in just a few months!"</p>
              <div className="mt-4 flex text-yellow-400">
                ★★★★★
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-neon transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold group-hover:animate-spin-slow">
                  AS
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Alice Smith</h4>
                  <p className="text-sm text-gray-600">Data Science Student</p>
                </div>
              </div>
              <p className="text-gray-600">"The practical projects and hands-on exercises really helped me understand complex concepts. Highly recommended!"</p>
              <div className="mt-4 flex text-yellow-400">
                ★★★★★
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-neon transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold group-hover:animate-spin-slow">
                  MJ
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Mike Johnson</h4>
                  <p className="text-sm text-gray-600">Python Programming Student</p>
                </div>
              </div>
              <p className="text-gray-600">"The community support and interactive learning environment make this platform stand out. Great experience!"</p>
              <div className="mt-4 flex text-yellow-400">
                ★★★★★
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Newsletter Section */}
        <div className="mt-24 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 relative overflow-hidden group animate-gradient-x">
          <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 group-hover:animate-pulse-slow"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6 group-hover:animate-pulse-slow">
              Stay Updated with Latest Courses
            </h2>
            <p className="text-white/80 text-center mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get notified about new courses, updates, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 hover:shadow-neon"
              />
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl hover:shadow-neon transition-all duration-300 font-medium transform hover:-translate-y-1">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Floating Action Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full hover:shadow-neon transition-all duration-300 transform hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } animate-bounce-slow`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}
