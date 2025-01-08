import { useUser, SignInButton, SignUpButton, UserButton } from "@clerk/remix";
import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";

export default function About() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const teamMembers = [
    {
      name: "Cherinet",
      role: "Founder & Lead Developer",
      image: "👨‍💻",
      description: "Full-stack developer with expertise in educational technology",
      socialLinks: {
        github: "https://github.com/cherinet",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Dinex",
      role: "Course Director",
      image: "👨‍🏫",
      description: "Expert in curriculum development and educational content",
      socialLinks: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Biniam",
      role: "Technical Lead",
      image: "👨‍🔬",
      description: "Specialized in system architecture and performance optimization",
      socialLinks: {
        github: "#",
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  const achievements = [
    {
      title: "Students Enrolled",
      count: "10,000+",
      icon: "👥",
      description: "Active learners across all courses"
    },
    {
      title: "Course Completion Rate",
      count: "92%",
      icon: "🎓",
      description: "High success rate among our students"
    },
    {
      title: "Expert Instructors",
      count: "50+",
      icon: "👨‍🏫",
      description: "Industry professionals and academics"
    },
    {
      title: "Countries Reached",
      count: "75+",
      icon: "🌍",
      description: "Global learning community"
    }
  ];

  const values = [
    {
      title: "Innovation",
      icon: "💡",
      description: "Embracing cutting-edge technology and teaching methods"
    },
    {
      title: "Excellence",
      icon: "🏆",
      description: "Maintaining high standards in education delivery"
    },
    {
      title: "Inclusivity",
      icon: "🤝",
      description: "Making quality education accessible to all"
    },
    {
      title: "Community",
      icon: "🌟",
      description: "Building a supportive learning environment"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Navigation Bar */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition duration-300">
                CourseHub
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">Home</Link>
              
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
                {/* Add your courses dropdown content here */}
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
                {/* Add your resources dropdown content here */}
              </div>

              <Link to="/about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out">Contact</Link>
              
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
                className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">Home</Link>
                <div className="space-y-2">
                  <div className="font-medium px-3 py-2">Courses</div>
                  <Link to="/courses/python" className="block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg">Python Programming</Link>
                  <Link to="/courses/web-dev" className="block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg">Web Development</Link>
                  <Link to="/courses/data-science" className="block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg">Data Science</Link>
                  <Link to="/courses/algorithms" className="block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg">Algorithms & DS</Link>
                </div>
                <div className="space-y-2">
                  <div className="font-medium px-3 py-2">Resources</div>
                  <Link to="/resources/tutorials" className="block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg">Tutorials</Link>
                  <Link to="/resources/community" className="block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg">Community</Link>
                  <Link to="/resources/projects" className="block px-6 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg">Projects</Link>
                </div>
                <Link to="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">About</Link>
                <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">Contact</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content with adjusted padding for navbar */}
      <div className="pt-20">
        {/* Hero Section */}
        <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4">
                About Digital Aksumite
              </h1>
              <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
                Empowering learners worldwide with cutting-edge technology education and comprehensive course materials.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`rounded-2xl shadow-xl p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
              <p className={`text-lg text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-4xl mx-auto`}>
                To provide accessible, high-quality technology education that empowers individuals to achieve their career goals
                and contribute to the digital transformation of Ethiopia and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className={`rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}
                >
                  <div className="p-6 text-center">
                    <div className="text-5xl mb-4">{member.image}</div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-3`}>
                      {member.role}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                      {member.description}
                    </p>
                    <div className="flex justify-center space-x-4">
                      <a href={member.socialLinks.github} className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">GitHub</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href={member.socialLinks.linkedin} className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">LinkedIn</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                      <a href={member.socialLinks.twitter} className="text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Twitter</span>
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <div className="text-4xl mb-4">{achievement.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{achievement.count}</h3>
                  <p className="font-semibold mb-2">{achievement.title}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl text-center ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg`}
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg ${
          isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
        }`}
      >
        {isDarkMode ? '🌞' : '🌙'}
      </button>
    </div>
  );
} 