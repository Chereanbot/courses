import { useState, useEffect } from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/remix";
import { Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";

export default function PythonCourse() {
  const { isSignedIn, isLoaded } = useUser();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80",
      title: "Learn Python Programming",
      description: "Master the fundamentals of Python programming language"
    },
    {
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      title: "Build Real Projects",
      description: "Create practical applications and solve real-world problems"
    },
    {
      image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
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

  const instructors = [
    {
      name: "Dr. Sarah Chen",
      role: "Lead Python Instructor",
      experience: "15+ years in Software Development",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    },
    {
      name: "Prof. Michael Brown",
      role: "Data Science Expert",
      experience: "10+ years in Machine Learning",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Dr. Emily Martinez",
      role: "AI Research Scientist",
      experience: "12+ years in AI & Deep Learning",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    }
  ];

  const handleProtectedAction = (e: React.MouseEvent) => {
    if (!isSignedIn) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  const statistics = [
    { number: "15K+", label: "Active Students" },
    { number: "95%", label: "Success Rate" },
    { number: "200+", label: "Video Lessons" },
    { number: "24/7", label: "Support" }
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Software Developer",
      company: "Google",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      content: "This Python course transformed my career. The practical projects and expert guidance helped me land my dream job at Google."
    },
    {
      name: "Maria Garcia",
      role: "Data Scientist",
      company: "Microsoft",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
      content: "The data science modules were incredibly comprehensive. I went from a beginner to confidently working with complex datasets."
    },
    {
      name: "James Wilson",
      role: "AI Engineer",
      company: "Tesla",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      content: "The AI and machine learning sections provided deep insights and practical applications that I use daily in my work."
    }
  ];

  const learningPath = [
    {
      level: "Beginner",
      duration: "4 weeks",
      topics: ["Python Basics", "Data Types", "Control Flow", "Functions"],
      icon: "🌱"
    },
    {
      level: "Intermediate",
      duration: "6 weeks",
      topics: ["OOP", "File Handling", "Error Handling", "Modules"],
      icon: "⚡"
    },
    {
      level: "Advanced",
      duration: "8 weeks",
      topics: ["Web Development", "Data Science", "AI & ML", "System Design"],
      icon: "🚀"
    }
  ];

  const faqs = [
    {
      question: "Do I need prior programming experience?",
      answer: "No prior experience is needed. Our course starts from the basics and gradually progresses to advanced topics."
    },
    {
      question: "How long do I have access to the course?",
      answer: "Once enrolled, you have lifetime access to the course content and future updates."
    },
    {
      question: "Is there a certificate upon completion?",
      answer: "Yes, you'll receive a verified certificate of completion that you can share on LinkedIn and other platforms."
    },
    {
      question: "What kind of support is available?",
      answer: "We offer 24/7 support through our community forum, live chat, and weekly Q&A sessions with instructors."
    }
  ];

  const features = [
    {
      title: "Interactive Coding Environment",
      description: "Write and test code directly in your browser with real-time feedback",
      icon: "💻",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "AI-Powered Code Reviews",
      description: "Get instant feedback on your code from our advanced AI system",
      icon: "🤖",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Live Mentoring Sessions",
      description: "Weekly live sessions with experienced Python developers",
      icon: "👥",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Project-Based Learning",
      description: "Build real-world applications as you learn",
      icon: "🚀",
      color: "from-pink-500 to-pink-600"
    }
  ];

  const toolsAndTechnologies = [
    { name: "Python", icon: "🐍", percentage: 100 },
    { name: "Django", icon: "🌐", percentage: 85 },
    { name: "Flask", icon: "🔧", percentage: 80 },
    { name: "NumPy", icon: "📊", percentage: 90 },
    { name: "Pandas", icon: "🐼", percentage: 85 },
    { name: "TensorFlow", icon: "🧠", percentage: 75 }
  ];

  const upcomingWebinars = [
    {
      title: "Python for Data Science",
      date: "March 15, 2024",
      time: "10:00 AM PST",
      instructor: "Dr. Sarah Chen",
      spots: 50
    },
    {
      title: "Web Development with Django",
      date: "March 20, 2024",
      time: "2:00 PM PST",
      instructor: "Prof. Michael Brown",
      spots: 35
    },
    {
      title: "Machine Learning Basics",
      date: "March 25, 2024",
      time: "11:00 AM PST",
      instructor: "Dr. Emily Martinez",
      spots: 40
    }
  ];

  const MainContent = () => (
    <>
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
                  <div className="flex justify-center space-x-4">
                    <Link
                      to="/courses/python/python-basics"
                      onClick={handleProtectedAction}
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                      Start Learning
                    </Link>
                    <Link
                      to="/courses/python/projects"
                      onClick={handleProtectedAction}
                      className="bg-white/10 text-white px-8 py-3 rounded-lg hover:bg-white/20 transition duration-300 backdrop-blur-sm"
                    >
                      View Projects
                    </Link>
                  </div>
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
      </div>

      {/* Instructors Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Your Instructors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from industry experts with years of experience in Python
              development, data science, and artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {instructors.map((instructor, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                  {instructor.name}
                </h3>
                <p className="text-blue-600 text-center mb-2">{instructor.role}</p>
                <p className="text-gray-600 text-center text-sm">
                  {instructor.experience}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Path Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A structured journey from beginner to advanced Python developer
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPath.map((path, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-bl-full -mr-16 -mt-16 transition-transform duration-300 group-hover:scale-110" />
                <div className="relative">
                  <div className="text-4xl mb-4">{path.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {path.level}
                  </h3>
                  <p className="text-blue-600 mb-4">{path.duration}</p>
                  <ul className="space-y-2">
                    {path.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Student Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our graduates who have transformed their careers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-blue-600">{testimonial.role}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our Python course
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Features Section */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMTBoMnYyMHptLTIgMGgtMlYxMGgydjIwek0zMCAzMGgtMlYxMGgydjIweiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">
              Interactive Learning Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience a new way of learning Python with our cutting-edge features
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-300"
              >
                <div className={`text-5xl mb-4 bg-gradient-to-r ${feature.color} w-16 h-16 rounded-lg flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools and Technologies Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Tools & Technologies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the most in-demand Python tools and frameworks
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {toolsAndTechnologies.map((tool, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 group hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{tool.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{tool.name}</h3>
                </div>
                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover:animate-pulse"
                    style={{ width: `${tool.percentage}%` }}
                  />
                </div>
                <div className="text-right mt-2 text-sm text-gray-600">
                  Proficiency: {tool.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Webinars Section */}
      <div className="py-16 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Live Webinars
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our live sessions with industry experts
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingWebinars.map((webinar, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">📺</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {webinar.title}
                  </h3>
                  <p className="text-blue-600 font-medium">{webinar.instructor}</p>
                </div>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Date:</span>
                    <span className="font-medium">{webinar.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Time:</span>
                    <span className="font-medium">{webinar.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Available Spots:</span>
                    <span className="font-medium">{webinar.spots}</span>
                  </div>
                </div>
                <button
                  onClick={handleProtectedAction}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Reserve Your Spot
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section - Add before Call to Action */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMTBoMnYyMHptLTIgMGgtMlYxMGgydjIwek0zMCAzMGgtMlYxMGgydjIweiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />
            <div className="relative text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Stay Updated with Python News
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Get weekly updates on Python tips, tutorials, and exclusive learning resources
              </p>
              <form className="max-w-md mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-3 rounded-lg bg-white/10 backdrop-blur-lg text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:border-white/40"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 bg-white text-blue-900 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Python Journey?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have already transformed their careers
            through our comprehensive Python curriculum.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/courses/python/python-basics"
              onClick={handleProtectedAction}
              className="bg-white text-blue-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Start Free Trial
            </Link>
            <Link
              to="/contact"
              className="bg-white/10 text-white px-8 py-3 rounded-lg hover:bg-white/20 transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <SharedLayout>
      <MainContent />
    </SharedLayout>
  );
} 