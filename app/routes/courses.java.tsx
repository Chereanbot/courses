import { useState, useEffect } from "react";
import { SignedIn, useUser } from "@clerk/remix";
import { Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";

export default function JavaCourse() {
  const { isSignedIn } = useUser();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      title: "Master Java Programming",
      description: "Learn enterprise-grade Java development from basics to advanced concepts"
    },
    {
      image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      title: "Enterprise Development",
      description: "Build scalable applications using Spring Boot and Microservices"
    },
    {
      image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      title: "Android Development",
      description: "Create modern Android applications with Java and Android SDK"
    }
  ];

  const courseContent = [
    {
      title: "Java Fundamentals",
      topics: ["OOP Concepts", "Data Types & Variables", "Control Flow", "Collections"],
      duration: "4 weeks",
      icon: "☕"
    },
    {
      title: "Advanced Java",
      topics: ["Multithreading", "Generics", "Stream API", "Lambda Expressions"],
      duration: "6 weeks",
      icon: "⚡"
    },
    {
      title: "Enterprise Java",
      topics: ["Spring Boot", "Hibernate", "RESTful APIs", "Microservices"],
      duration: "8 weeks",
      icon: "🏢"
    },
    {
      title: "Android Development",
      topics: ["Android SDK", "UI Design", "Data Storage", "APIs Integration"],
      duration: "6 weeks",
      icon: "📱"
    }
  ];

  const instructors = [
    {
      name: "Dr. James Wilson",
      role: "Lead Java Architect",
      experience: "20+ years in Enterprise Java",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    },
    {
      name: "Prof. Lisa Chen",
      role: "Spring Framework Expert",
      experience: "15+ years in Spring Development",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80"
    },
    {
      name: "Mark Thompson",
      role: "Android Development Lead",
      experience: "12+ years in Mobile Development",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    }
  ];

  const statistics = [
    { number: "20K+", label: "Active Students" },
    { number: "98%", label: "Success Rate" },
    { number: "250+", label: "Video Lessons" },
    { number: "24/7", label: "Support" }
  ];

  const features = [
    {
      title: "Enterprise-Grade IDE",
      description: "Code with IntelliJ IDEA for professional Java development",
      icon: "💻",
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Real-World Projects",
      description: "Build enterprise applications with Spring Boot",
      icon: "🏢",
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Code Reviews",
      description: "Get feedback from experienced Java developers",
      icon: "👥",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Career Support",
      description: "Interview preparation and job placement assistance",
      icon: "🚀",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const toolsAndTechnologies = [
    { name: "Java", icon: "☕", percentage: 100 },
    { name: "Spring Boot", icon: "🍃", percentage: 90 },
    { name: "Hibernate", icon: "🗄️", percentage: 85 },
    { name: "Android SDK", icon: "📱", percentage: 88 },
    { name: "Maven", icon: "🛠️", percentage: 92 },
    { name: "Docker", icon: "🐳", percentage: 80 }
  ];

  const testimonials = [
    {
      name: "David Miller",
      role: "Senior Java Developer",
      company: "Amazon",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      content: "The enterprise Java modules were exceptional. I'm now confidently building microservices at Amazon."
    },
    {
      name: "Sarah Johnson",
      role: "Android Developer",
      company: "Google",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      content: "The Android development track helped me land my dream job at Google. The hands-on projects were invaluable."
    },
    {
      name: "Michael Chang",
      role: "Solutions Architect",
      company: "Microsoft",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      content: "Excellent coverage of Spring Boot and microservices. The course prepared me well for enterprise development."
    }
  ];

  const upcomingWebinars = [
    {
      title: "Spring Boot Masterclass",
      date: "March 18, 2024",
      time: "11:00 AM PST",
      instructor: "Dr. James Wilson",
      spots: 45
    },
    {
      title: "Modern Android Development",
      date: "March 22, 2024",
      time: "2:00 PM PST",
      instructor: "Mark Thompson",
      spots: 40
    },
    {
      title: "Microservices Architecture",
      date: "March 28, 2024",
      time: "10:00 AM PST",
      instructor: "Prof. Lisa Chen",
      spots: 35
    }
  ];

  const faqs = [
    {
      question: "Is this course suitable for beginners?",
      answer: "Yes, we start from Java basics and gradually progress to advanced enterprise concepts."
    },
    {
      question: "What development tools will I need?",
      answer: "We provide access to IntelliJ IDEA Ultimate and all necessary development tools."
    },
    {
      question: "Will I get a certification?",
      answer: "Yes, you'll receive an industry-recognized certification upon course completion."
    },
    {
      question: "What kind of projects will I build?",
      answer: "You'll build enterprise applications, RESTful services, and Android apps."
    }
  ];

  const learningPath = [
    {
      level: "Beginner",
      duration: "4 weeks",
      topics: ["Java Basics", "OOP Concepts", "Collections", "Exception Handling"],
      icon: "🌱"
    },
    {
      level: "Intermediate",
      duration: "6 weeks",
      topics: ["Spring Boot", "Hibernate", "REST APIs", "Testing"],
      icon: "🚀"
    },
    {
      level: "Advanced",
      duration: "8 weeks",
      topics: ["Microservices", "Cloud Deployment", "Security", "Performance"],
      icon: "⭐"
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

  const handleProtectedAction = (e: React.MouseEvent) => {
    if (!isSignedIn) {
      e.preventDefault();
      setShowAuthModal(true);
    }
  };

  const MainContent = () => (
    <div className="min-h-screen">
      {/* Hero Section with Slideshow */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-orange-900/60 to-red-900/70" />
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-xl text-gray-200 mb-8">
                      {slide.description}
                    </p>
                    <div className="flex gap-4">
                      <Link
                        to="/courses/java/java-basics"
                        onClick={handleProtectedAction}
                        className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300"
                      >
                        Start Learning
                      </Link>
                      <Link
                        to="/courses/java/projects"
                        onClick={handleProtectedAction}
                        className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium backdrop-blur-sm transition duration-300"
                      >
                        View Projects
                      </Link>
                    </div>
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
      </section>

      {/* Course Stats */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-800 to-red-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMTBoMnYyMHptLTIgMGgtMlYxMGgydjIwek0zMCAzMGgtMlYxMGgydjIweiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { value: "250+", label: "Video Lessons", icon: "🎥" },
              { value: "20K+", label: "Active Students", icon: "👨‍💻" },
              { value: "98%", label: "Success Rate", icon: "🏆" },
              { value: "24/7", label: "Expert Support", icon: "💬" }
            ].map((stat, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-200 via-orange-200 to-amber-200 text-transparent bg-clip-text">
                  {stat.value}
                </div>
                <div className="text-gray-300 text-lg font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Overview */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Course Overview
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master Java development through our comprehensive curriculum designed
            for both beginners and enterprise developers.
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
                        className="w-4 h-4 mr-2 text-orange-500"
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

      {/* Statistics Section */}
      <div className="bg-gradient-to-r from-orange-900 to-red-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-200 to-red-200">
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
              A structured journey from Java basics to enterprise development
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPath.map((path, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-bl-full -mr-16 -mt-16 transition-transform duration-300 group-hover:scale-110" />
                <div className="relative">
                  <div className="text-4xl mb-4">{path.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {path.level}
                  </h3>
                  <p className="text-orange-600 mb-4">{path.duration}</p>
                  <ul className="space-y-2">
                    {path.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center text-gray-700">
                        <svg className="w-4 h-4 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-b from-gray-900 to-orange-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMTBoMnYyMHptLTIgMGgtMlYxMGgydjIwek0zMCAzMGgtMlYxMGgydjIweiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-200 to-red-200">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional development tools and support for Java engineers
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
              Master the most in-demand Java tools and frameworks
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
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-red-500 group-hover:animate-pulse"
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

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our graduates working at top tech companies
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-orange-600">{testimonial.role}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Webinars Section */}
      <div className="py-16 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Live Training Sessions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our expert-led live training sessions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingWebinars.map((webinar, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-white">📺</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {webinar.title}
                  </h3>
                  <p className="text-orange-600 font-medium">{webinar.instructor}</p>
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
                  className="w-full mt-6 bg-gradient-to-r from-orange-600 to-red-600 text-white py-2 rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
                >
                  Reserve Your Spot
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our Java course
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-900 via-orange-950 to-red-950">
        <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMTBoMnYyMHptLTIgMGgtMlYxMGgydjIwek0zMCAzMGgtMlYxMGgydjIweiIvPjwvZz48L2c+PC9zdmc+')] opacity-10" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-2 px-4 bg-orange-500/20 rounded-full text-orange-300 text-sm font-semibold mb-6">
              STAY IN THE LOOP
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-200 text-transparent bg-clip-text">
                Stay Updated with Java News
              </span>
              </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Get weekly updates on Java tips, tutorials, and exclusive learning resources delivered straight to your inbox
              </p>
              <form className="max-w-md mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-lg text-white placeholder-gray-400 border-2 border-orange-500/20 focus:border-orange-500/40 focus:outline-none transition-colors duration-300"
                  />
                  <button
                    type="submit"
                  className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Subscribe
                  <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </form>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-red-800 to-red-900">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTJWMTBoMnYyMHptLTIgMGgtMlYxMGgydjIwek0zMCAzMGgtMlYxMGgydjIweiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-block p-2 px-4 bg-orange-500/20 rounded-full text-orange-300 text-sm font-semibold mb-6">
            BEGIN YOUR JOURNEY
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-200 text-transparent bg-clip-text">
            Ready to Master Java?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of developers who have transformed their careers through our comprehensive Java curriculum
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
            <Link
              to="/courses/java/java-basics"
              onClick={handleProtectedAction}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
            >
              Start Free Trial
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              to="/contact"
              className="group relative px-8 py-4 rounded-xl bg-white/10 backdrop-blur-lg text-white font-semibold hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              Contact Us
              <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SharedLayout>
      <MainContent />
    </SharedLayout>
  );
} 