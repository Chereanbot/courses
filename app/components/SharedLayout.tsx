import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/remix";

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProtectedLink = (e: React.MouseEvent, path: string) => {
    if (!isSignedIn) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  const handleCourseClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (!isSignedIn) {
      setShowAuthModal(true);
    } else {
      window.location.href = '/survey';
    }
  };

  // Authentication Modal
  const AuthModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center ${showAuthModal ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h2>
        <p className="text-gray-600 mb-6">
          To access this content, you need to sign in or create an account. Join our community to unlock all features and resources.
        </p>
        <div className="flex flex-col gap-4">
          <SignInButton mode="modal">
            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="w-full bg-gray-50 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300 border border-gray-200">
              Create Account
            </button>
          </SignUpButton>
          <button
            onClick={() => setShowAuthModal(false)}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <AuthModal />
      {/* Navigation Bar */}
      <nav className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo - Always accessible */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition duration-300">
                Digital Aksumites
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Home - Always accessible */}
              <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">
                Home
              </Link>
              
              {/* Protected Courses Dropdown */}
              <div className="relative group">
                <button
                  onClick={(e) => handleProtectedLink(e, '/courses')}
                  className="text-gray-700 group-hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center transition duration-150 ease-in-out"
                >
                  Courses
                  <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition duration-150 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isSignedIn && (
                  <div className="absolute left-0 mt-2 w-[800px] rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out">
                    <div className="p-6 grid grid-cols-3 gap-6">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Programming Fundamentals</h3>
                        <div className="space-y-2">
                          <Link to="/courses/python" onClick={(e) => handleCourseClick(e, '/courses/python')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">🐍</span>
                            Python Programming
                          </Link>
                          <Link to="/courses/java" onClick={(e) => handleCourseClick(e, '/courses/java')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">☕</span>
                            Java Development
                          </Link>
                          <Link to="/courses/javascript" onClick={(e) => handleCourseClick(e, '/courses/javascript')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">📱</span>
                            JavaScript & Node.js
                          </Link>
                          <Link to="/courses/cpp" onClick={(e) => handleCourseClick(e, '/courses/cpp')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">⚡</span>
                            C/C++ Programming
                          </Link>
                          <Link to="/courses/csharp" onClick={(e) => handleCourseClick(e, '/courses/csharp')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">#</span>
                            C# and .NET
                          </Link>
                          <Link to="/courses/rust" onClick={(e) => handleCourseClick(e, '/courses/rust')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">🦀</span>
                            Rust Programming
                          </Link>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Advanced Computing</h3>
                        <div className="space-y-2">
                          <Link to="/courses/algorithms" onClick={(e) => handleCourseClick(e, '/courses/algorithms')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">🧮</span>
                            Data Structures & Algorithms
                          </Link>
                          <Link to="/courses/machine-learning" onClick={(e) => handleCourseClick(e, '/courses/machine-learning')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">🤖</span>
                            Machine Learning & AI
                          </Link>
                          <Link to="/courses/deep-learning" onClick={(e) => handleCourseClick(e, '/courses/deep-learning')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">🧠</span>
                            Deep Learning
                          </Link>
                          <Link to="/courses/computer-vision" onClick={(e) => handleCourseClick(e, '/courses/computer-vision')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">👁️</span>
                            Computer Vision
                          </Link>
                          <Link to="/courses/nlp" onClick={(e) => handleCourseClick(e, '/courses/nlp')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">💬</span>
                            Natural Language Processing
                          </Link>
                          <Link to="/courses/robotics" onClick={(e) => handleCourseClick(e, '/courses/robotics')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">🤖</span>
                            Robotics
                          </Link>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">Specialized Tracks</h3>
                        <div className="space-y-2">
                          <Link to="/courses/web-dev" onClick={(e) => handleCourseClick(e, '/courses/web-dev')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">🌐</span>
                            Full-Stack Web Development
                          </Link>
                          <Link to="/courses/mobile-dev" onClick={(e) => handleCourseClick(e, '/courses/mobile-dev')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">📱</span>
                            Mobile App Development
                          </Link>
                          <Link to="/courses/data-science" onClick={(e) => handleCourseClick(e, '/courses/data-science')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">📊</span>
                            Data Science & Analytics
                          </Link>
                          <Link to="/courses/cloud" onClick={(e) => handleCourseClick(e, '/courses/cloud')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">☁️</span>
                            Cloud Computing
                          </Link>
                          <Link to="/courses/cybersecurity" onClick={(e) => handleCourseClick(e, '/courses/cybersecurity')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">🔒</span>
                            Cybersecurity
                          </Link>
                          <Link to="/courses/devops" onClick={(e) => handleCourseClick(e, '/courses/devops')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">⚙️</span>
                            DevOps & Infrastructure
                          </Link>
                        </div>
                      </div>

                      <div className="col-span-3 mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">New & Trending Courses</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <Link to="/courses/blockchain" onClick={(e) => handleCourseClick(e, '/courses/blockchain')} className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition duration-300">
                            <span className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center mr-3">⛓️</span>
                            <div>
                              <div className="font-medium text-sm">Blockchain Development</div>
                              <div className="text-xs text-gray-500">Web3 & Smart Contracts</div>
                            </div>
                          </Link>
                          <Link to="/courses/ar-vr" onClick={(e) => handleCourseClick(e, '/courses/ar-vr')} className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition duration-300">
                            <span className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center mr-3">🥽</span>
                            <div>
                              <div className="font-medium text-sm">AR/VR Development</div>
                              <div className="text-xs text-gray-500">Metaverse & Gaming</div>
                            </div>
                          </Link>
                          <Link to="/courses/quantum" onClick={(e) => handleCourseClick(e, '/courses/quantum')} className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition duration-300">
                            <span className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center mr-3">⚛️</span>
                            <div>
                              <div className="font-medium text-sm">Quantum Computing</div>
                              <div className="text-xs text-gray-500">Future of Computing</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Protected Projects Dropdown */}
              <div className="relative group">
                <button
                  onClick={(e) => handleProtectedLink(e, '/projects')}
                  className="text-gray-700 group-hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center transition duration-150 ease-in-out"
                >
                  Projects
                  <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition duration-150 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isSignedIn && (
                  <div className="absolute left-0 mt-2 w-[800px] rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out">
                    <div className="p-6 grid grid-cols-3 gap-6">
                      {/* Core Computer Science */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Core Computer Science</h3>
                        <div className="space-y-2">
                          <Link to="/projects/cpp" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">⚡</span>
                            C++ Projects
                          </Link>
                          <Link to="/projects/java" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">☕</span>
                            Java Projects
                          </Link>
                          <Link to="/projects/oop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">🎯</span>
                            OOP Projects
                          </Link>
                          <Link to="/projects/dsa" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">🔍</span>
                            Data Structures
                          </Link>
                          <Link to="/projects/daa" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-blue-100 flex items-center justify-center mr-2">⚙️</span>
                            Design & Analysis of Algorithms
                          </Link>
                        </div>
                      </div>
                      
                      {/* Systems & Research */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Systems & Research</h3>
                        <div className="space-y-2">
                          <Link to="/projects/os" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">💻</span>
                            Operating Systems Labs
                          </Link>
                          <Link to="/projects/se" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">📝</span>
                            Software Engineering & SRS
                          </Link>
                          <Link to="/projects/research" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">🔬</span>
                            Research Methods
                          </Link>
                          <Link to="/projects/realtime" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-purple-100 flex items-center justify-center mr-2">⚡</span>
                            Real-Time Systems
                          </Link>
                        </div>
                      </div>

                      {/* Advanced Computing */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-transparent bg-clip-text">Advanced Computing</h3>
                        <div className="space-y-2">
                          <Link to="/projects/ai" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">🤖</span>
                            Artificial Intelligence
                          </Link>
                          <Link to="/projects/cv" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">👁️</span>
                            Computer Vision
                          </Link>
                          <Link to="/projects/graphics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg flex items-center">
                            <span className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center mr-2">🎨</span>
                            Computer Graphics
                          </Link>
                        </div>
                      </div>

                      {/* Applications & Development */}
                      <div className="col-span-3 mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Applications & Development</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <Link to="/projects/web" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition duration-300">
                            <span className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center mr-3">🌐</span>
                            <div>
                              <div className="font-medium text-sm">Web Development</div>
                              <div className="text-xs text-gray-500">Full-Stack Projects</div>
                            </div>
                          </Link>
                          <Link to="/projects/react" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition duration-300">
                            <span className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center mr-3">⚛️</span>
                            <div>
                              <div className="font-medium text-sm">React Applications</div>
                              <div className="text-xs text-gray-500">Modern Web Apps</div>
                            </div>
                          </Link>
                          <Link to="/projects/wireless" className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition duration-300">
                            <span className="w-8 h-8 rounded bg-indigo-100 flex items-center justify-center mr-3">📡</span>
                            <div>
                              <div className="font-medium text-sm">Wireless Systems</div>
                              <div className="text-xs text-gray-500">Network Projects</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Protected Resources Dropdown */}
              <div className="relative group">
                <button
                  onClick={(e) => handleProtectedLink(e, '/resources')}
                  className="text-gray-700 group-hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center transition duration-150 ease-in-out"
                >
                  Resources
                  <svg className="w-4 h-4 ml-1 transform group-hover:rotate-180 transition duration-150 ease-in-out" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isSignedIn && (
                  <div className="absolute left-0 mt-2 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-150 ease-in-out">
                    <div className="p-4">
                      <div className="space-y-2">
                        <Link to="/resources/blog" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg">
                          <span className="text-blue-500 mr-2">📝</span>
                          Blog & Articles
                        </Link>
                        <Link to="/resources/tutorials" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg">
                          <span className="text-blue-500 mr-2">📚</span>
                          Tutorials
                        </Link>
                        <Link to="/resources/community" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg">
                          <span className="text-blue-500 mr-2">👥</span>
                          Community Forum
                        </Link>
                        <Link to="/resources/events" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg">
                          <span className="text-blue-500 mr-2">🎯</span>
                          Events & Workshops
                        </Link>
                        <Link to="/resources/projects" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg">
                          <span className="text-blue-500 mr-2">🚀</span>
                          Practice Projects
                        </Link>
                        <Link to="/resources/career" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-lg">
                          <span className="text-blue-500 mr-2">💼</span>
                          Career Resources
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Protected About & Contact Links */}
              <Link
                to="/about"
                onClick={(e) => handleProtectedLink(e, '/about')}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out"
              >
                About
              </Link>
              <Link
                to="/contact"
                onClick={(e) => handleProtectedLink(e, '/contact')}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out"
              >
                Contact
              </Link>

              {/* Auth Buttons */}
              <div className="flex items-center space-x-3">
                {!isLoaded ? (
                  <div className="animate-pulse bg-gray-200 h-8 w-20 rounded-lg"></div>
                ) : isSignedIn ? (
                  <div className="flex items-center space-x-4">
                    <span className="hidden lg:inline text-sm text-gray-700">Welcome, {user?.firstName}!</span>
                    <UserButton 
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          avatarBox: "w-8 h-8 md:w-10 md:h-10 rounded-lg",
                        }
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <button className="bg-gray-50 text-gray-700 px-3 md:px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 text-sm font-medium border border-gray-200">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-3 md:px-4 py-2 rounded-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition duration-300 text-sm font-medium shadow-md hover:shadow-lg">
                        Get Started
                      </button>
                    </SignUpButton>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu button and auth */}
            <div className="lg:hidden flex items-center space-x-4">
              {/* Mobile Auth Buttons */}
              {isLoaded && isSignedIn ? (
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
                  <button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                    Sign In
                  </button>
                </SignInButton>
              )}
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => isSignedIn ? setIsMobileMenuOpen(!isMobileMenuOpen) : setShowAuthModal(true)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
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

          {/* Protected Mobile Menu */}
          {isSignedIn && (
            <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg mt-2">
                {/* Home Link */}
                <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                  Home
                </Link>

                {/* Mobile Courses Section */}
                <div className="space-y-2">
                  <div className="px-3 py-2 text-base font-medium text-gray-900">Courses</div>
                  <div className="pl-4 space-y-2">
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">Programming</div>
                      <div className="space-y-1">
                        <Link to="/courses/python" onClick={(e) => handleCourseClick(e, '/courses/python')} className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Python Programming</Link>
                        <Link to="/courses/java" onClick={(e) => handleCourseClick(e, '/courses/java')} className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Java Development</Link>
                        <Link to="/courses/cpp" onClick={(e) => handleCourseClick(e, '/courses/cpp')} className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded-md">C++ Programming</Link>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">Advanced Computing</div>
                      <div className="space-y-1">
                        <Link to="/courses/algorithms" onClick={(e) => handleCourseClick(e, '/courses/algorithms')} className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Data Structures & Algorithms</Link>
                        <Link to="/courses/machine-learning" onClick={(e) => handleCourseClick(e, '/courses/machine-learning')} className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Machine Learning & AI</Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Projects Section */}
                <div className="space-y-2">
                  <div className="px-3 py-2 text-base font-medium text-gray-900">Projects</div>
                  <div className="pl-4 space-y-2">
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">Core CS</div>
                      <div className="space-y-1">
                        <Link to="/projects/cpp" className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded-md">C++ Projects</Link>
                        <Link to="/projects/java" className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Java Projects</Link>
                        <Link to="/projects/oop" className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded-md">OOP Projects</Link>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">Advanced</div>
                      <div className="space-y-1">
                        <Link to="/projects/ai" className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded-md">AI Projects</Link>
                        <Link to="/projects/web" className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Web Development</Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Resources Section */}
                <div className="space-y-2">
                  <div className="px-3 py-2 text-base font-medium text-gray-900">Resources</div>
                  <div className="pl-4 space-y-1">
                    <Link to="/resources/blog" className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Blog & Articles</Link>
                    <Link to="/resources/tutorials" className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Tutorials</Link>
                    <Link to="/resources/community" className="block px-3 py-1 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Community Forum</Link>
                  </div>
                </div>

                {/* Mobile About & Contact */}
                <Link to="/about" onClick={(e) => handleProtectedLink(e, '/about')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                  About
                </Link>
                <Link to="/contact" onClick={(e) => handleProtectedLink(e, '/contact')} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>
    </div>
  );
} 