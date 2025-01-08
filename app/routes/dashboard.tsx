import { SignedIn, SignedOut, RedirectToSignIn, useUser, UserButton } from "@clerk/remix";
import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";

export default function Dashboard() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState("overview");
  const [showWelcome, setShowWelcome] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    academicYear: "",
    academicSemester: "",
    department: "",
    studentId: "",
  });

  useEffect(() => {
    // Hide welcome message after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Mock data - In a real app, this would come from your backend
  const courseProgress = [
    { name: "Python Programming", progress: 75, nextLesson: "Advanced Functions", totalLessons: 24, completedLessons: 18 },
    { name: "Web Development", progress: 45, nextLesson: "React Components", totalLessons: 32, completedLessons: 14 },
    { name: "Data Structures", progress: 60, nextLesson: "Binary Trees", totalLessons: 20, completedLessons: 12 },
  ];

  const upcomingDeadlines = [
    { course: "Python Programming", task: "Project Submission", due: "2024-02-20", priority: "high" },
    { course: "Web Development", task: "Assignment 3", due: "2024-02-22", priority: "medium" },
    { course: "Data Structures", task: "Quiz 2", due: "2024-02-25", priority: "low" },
  ];

  const recommendations = [
    {
      title: "Machine Learning Basics",
      description: "Based on your interest in Python and Data Science",
      icon: "🤖",
      difficulty: "Intermediate",
      duration: "8 weeks",
    },
    {
      title: "React Advanced Patterns",
      description: "Recommended for Web Development progress",
      icon: "⚛️",
      difficulty: "Advanced",
      duration: "6 weeks",
    },
    {
      title: "System Design",
      description: "Popular among students with your profile",
      icon: "🏗️",
      difficulty: "Advanced",
      duration: "10 weeks",
    },
  ];

  const achievements = [
    { name: "Fast Learner", icon: "🚀", description: "Completed 5 lessons in one day" },
    { name: "Problem Solver", icon: "🧩", description: "Solved 10 coding challenges" },
    { name: "Team Player", icon: "👥", description: "Helped 5 students in forums" },
  ];

  const learningPath = [
    { name: "Programming Fundamentals", status: "completed", icon: "📚" },
    { name: "Web Development Basics", status: "completed", icon: "🌐" },
    { name: "Frontend Frameworks", status: "in-progress", icon: "⚛️" },
    { name: "Backend Development", status: "upcoming", icon: "⚙️" },
    { name: "Database Management", status: "upcoming", icon: "🗄️" },
  ];

  const menuItems = [
    { icon: "📊", label: "Dashboard", value: "overview" },
    { icon: "📚", label: "My Courses", value: "courses" },
    { icon: "⭐", label: "Favorites", value: "favorites" },
    { icon: "📝", label: "Assignments", value: "assignments" },
    { icon: "🎯", label: "Progress", value: "progress" },
    { icon: "📅", label: "Schedule", value: "schedule" },
    { icon: "📖", label: "Resources", value: "resources" },
    { icon: "🔔", label: "Notifications", value: "notifications" },
    { icon: "⚙️", label: "Settings", value: "settings" },
  ];

  // Add bottom nav items (simplified version of menuItems for mobile)
  const bottomNavItems = [
    { icon: "📊", label: "Overview", value: "overview" },
    { icon: "📚", label: "Courses", value: "courses" },
    { icon: "⭐", label: "Favorites", value: "favorites" },
    { icon: "❤️", label: "Loved", value: "loved" },
    { icon: "⚙️", label: "Settings", value: "settings" },
  ];

  // Update courses data
  const courses = [
    {
      id: 1,
      title: "Database Management Systems",
      path: "/courses/database",
      instructor: "Dr. James Wilson",
      progress: 85,
      thumbnail: "🗄️",
      description: "Learn SQL, database design, normalization, and management principles",
      duration: "16 weeks",
      level: "Intermediate",
      enrolled: 950,
      rating: 4.6,
      nextLesson: "Advanced Queries & Transactions",
      schedule: "Mon, Wed 10:00 AM",
      isFavorite: false,
      isLoved: false,
    },
    {
      id: 2,
      title: "C++ Programming II",
      path: "/courses.cpp",
      instructor: "Prof. Sarah Chen",
      progress: 60,
      thumbnail: "💻",
      description: "Advanced C++ concepts, OOP, templates, and STL",
      duration: "16 weeks",
      level: "Advanced",
      enrolled: 800,
      rating: 4.8,
      nextLesson: "Templates & Generic Programming",
      schedule: "Tue, Thu 2:00 PM",
      isFavorite: false,
      isLoved: false,
    },
    {
      id: 3,
      title: "Discrete Mathematics",
      path: "/courses/discrete-math",
      instructor: "Dr. Michael Brown",
      progress: 45,
      thumbnail: "🔢",
      description: "Logic, sets, relations, graphs, and combinatorics",
      duration: "16 weeks",
      level: "Intermediate",
      enrolled: 750,
      rating: 4.7,
      nextLesson: "Graph Theory",
      schedule: "Wed, Fri 1:00 PM",
      isFavorite: false,
      isLoved: false,
    },
    {
      id: 4,
      title: "Linear Algebra",
      path: "/courses/linear-algebra",
      instructor: "Prof. Emily Martinez",
      progress: 70,
      thumbnail: "📐",
      description: "Vectors, matrices, linear transformations, and eigenvalues",
      duration: "16 weeks",
      level: "Intermediate",
      enrolled: 850,
      rating: 4.5,
      nextLesson: "Eigenvalues & Eigenvectors",
      schedule: "Mon, Thu 3:00 PM",
      isFavorite: false,
      isLoved: false,
    },
    {
      id: 5,
      title: "Inclusive Design",
      path: "/courses/inclusive-design",
      instructor: "Dr. Lisa Taylor",
      progress: 55,
      thumbnail: "🎨",
      description: "Principles of accessible and inclusive design for all users",
      duration: "16 weeks",
      level: "Beginner",
      enrolled: 600,
      rating: 4.9,
      nextLesson: "Accessibility Standards",
      schedule: "Tue, Fri 11:00 AM",
      isFavorite: false,
      isLoved: false,
    },
    {
      id: 6,
      title: "Economics",
      path: "/courses/economics",
      instructor: "Prof. Robert Johnson",
      progress: 40,
      thumbnail: "📈",
      description: "Microeconomics, macroeconomics, and economic principles",
      duration: "16 weeks",
      level: "Beginner",
      enrolled: 900,
      rating: 4.6,
      nextLesson: "Market Structures",
      schedule: "Wed, Fri 9:00 AM",
      isFavorite: false,
      isLoved: false,
    },
    {
      id: 7,
      title: "Digital Logic Design",
      path: "/courses/digital-logic",
      instructor: "Dr. Alex Thompson",
      progress: 65,
      thumbnail: "⚡",
      description: "Boolean algebra, logic gates, and digital circuit design",
      duration: "16 weeks",
      level: "Intermediate",
      enrolled: 700,
      rating: 4.7,
      nextLesson: "Sequential Circuits",
      schedule: "Mon, Thu 4:00 PM",
      isFavorite: false,
      isLoved: false,
    }
  ];

  // Add state for favorite and loved courses
  const [favoriteStates, setFavoriteStates] = useState(
    Object.fromEntries(courses.map(course => [course.id, false]))
  );
  const [lovedStates, setLovedStates] = useState(
    Object.fromEntries(courses.map(course => [course.id, false]))
  );

  // Toggle favorite state for a course
  const toggleFavorite = (courseId: number) => {
    setFavoriteStates(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  // Toggle loved state for a course
  const toggleLoved = (courseId: number) => {
    setLovedStates(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  // Add assignments and projects data after the achievements array
  const assignments = [
    {
      id: 1,
      title: "Database Design Project",
      course: "Database Management Systems",
      type: "Project",
      deadline: "2024-03-15",
      status: "In Progress",
      progress: 65,
      description: "Design and implement a comprehensive database system for a university management system.",
      tasks: [
        { name: "ER Diagram", completed: true },
        { name: "Schema Design", completed: true },
        { name: "SQL Implementation", completed: false },
        { name: "Query Optimization", completed: false }
      ]
    },
    {
      id: 2,
      title: "Advanced Data Structures Implementation",
      course: "C++ Programming II",
      type: "Assignment",
      deadline: "2024-03-10",
      status: "Not Started",
      progress: 0,
      description: "Implement advanced data structures including AVL trees and hash tables.",
      tasks: [
        { name: "AVL Tree Implementation", completed: false },
        { name: "Hash Table Implementation", completed: false },
        { name: "Performance Analysis", completed: false }
      ]
    },
    {
      id: 3,
      title: "Graph Theory Problems",
      course: "Discrete Mathematics",
      type: "Assignment",
      deadline: "2024-03-08",
      status: "Completed",
      progress: 100,
      description: "Solve complex graph theory problems and prove theorems.",
      tasks: [
        { name: "Problem Set 1", completed: true },
        { name: "Problem Set 2", completed: true },
        { name: "Proofs", completed: true }
      ]
    },
    {
      id: 4,
      title: "Matrix Operations Project",
      course: "Linear Algebra",
      type: "Project",
      deadline: "2024-03-20",
      status: "In Progress",
      progress: 35,
      description: "Develop a program to perform complex matrix operations and transformations.",
      tasks: [
        { name: "Basic Operations", completed: true },
        { name: "Eigenvalue Calculator", completed: false },
        { name: "3D Transformations", completed: false }
      ]
    }
  ];

  // Render course content when courses tab is active
  const renderContent = () => {
    switch (activeTab) {
      case 'courses':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
                My Courses
              </h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                  Sort by Progress
                </button>
                <button className="px-4 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors duration-200">
                  Filter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Course Header */}
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{course.thumbnail}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleFavorite(course.id)}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            favoriteStates[course.id]
                              ? 'text-yellow-500 hover:text-yellow-600'
                              : 'text-gray-400 hover:text-yellow-500'
                          }`}
                        >
                          <svg className="w-6 h-6" fill={favoriteStates[course.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => toggleLoved(course.id)}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            lovedStates[course.id]
                              ? 'text-red-500 hover:text-red-600'
                              : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <svg className="w-6 h-6" fill={lovedStates[course.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          course.level === 'Beginner' 
                            ? 'bg-green-100 text-green-600'
                            : course.level === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {course.level}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-4">👨‍🏫 {course.instructor}</span>
                      <span>⏱️ {course.duration}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="px-6 py-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-blue-600 font-medium">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Course Footer */}
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-4 text-gray-500">
                        <span>👥 {course.enrolled}</span>
                        <span>⭐ {course.rating}</span>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Continue
                      </button>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Next: {course.nextLesson} • {course.schedule}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'favorites':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
            Favorite Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.filter(course => favoriteStates[course.id]).map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Course Header */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{course.thumbnail}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleFavorite(course.id)}
                        className={`p-2 rounded-full transition-colors duration-200 ${
                          favoriteStates[course.id]
                            ? 'text-yellow-500 hover:text-yellow-600'
                            : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        <svg className="w-6 h-6" fill={favoriteStates[course.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => toggleLoved(course.id)}
                        className={`p-2 rounded-full transition-colors duration-200 ${
                          lovedStates[course.id]
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <svg className="w-6 h-6" fill={lovedStates[course.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        course.level === 'Beginner' 
                          ? 'bg-green-100 text-green-600'
                          : course.level === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">👨‍🏫 {course.instructor}</span>
                    <span>⏱️ {course.duration}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="px-6 py-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="text-blue-600 font-medium">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Course Footer */}
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-4 text-gray-500">
                      <span>👥 {course.enrolled}</span>
                      <span>⭐ {course.rating}</span>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Continue
                    </button>
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    Next: {course.nextLesson} • {course.schedule}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      case 'loved':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Loved Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.filter(course => lovedStates[course.id]).map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Course Header */}
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{course.thumbnail}</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleFavorite(course.id)}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            favoriteStates[course.id]
                              ? 'text-yellow-500 hover:text-yellow-600'
                              : 'text-gray-400 hover:text-yellow-500'
                          }`}
                        >
                          <svg className="w-6 h-6" fill={favoriteStates[course.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => toggleLoved(course.id)}
                          className={`p-2 rounded-full transition-colors duration-200 ${
                            lovedStates[course.id]
                              ? 'text-red-500 hover:text-red-600'
                              : 'text-gray-400 hover:text-red-500'
                          }`}
                        >
                          <svg className="w-6 h-6" fill={lovedStates[course.id] ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          course.level === 'Beginner' 
                            ? 'bg-green-100 text-green-600'
                            : course.level === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-red-100 text-red-600'
                        }`}>
                          {course.level}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="mr-4">👨‍🏫 {course.instructor}</span>
                      <span>⏱️ {course.duration}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="px-6 py-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-blue-600 font-medium">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Course Footer */}
                  <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-4 text-gray-500">
                        <span>👥 {course.enrolled}</span>
                        <span>⭐ {course.rating}</span>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Continue
                      </button>
                    </div>
                    <div className="mt-3 text-xs text-gray-500">
                      Next: {course.nextLesson} • {course.schedule}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'assignments':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Assignments & Projects
              </h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  + New Assignment
                </button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-wrap gap-4 items-center bg-white/70 backdrop-blur-lg p-4 rounded-xl">
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search assignments..."
                  className="w-full px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <select className="px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">All Types</option>
                <option value="project">Projects</option>
                <option value="assignment">Assignments</option>
              </select>
              <select className="px-4 py-2 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                <option value="">All Status</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>

            {/* Assignments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {assignments.map((assignment) => (
                <div
                  key={assignment.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Header */}
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                        <p className="text-sm text-gray-600">{assignment.course}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        assignment.type === 'Project' 
                          ? 'bg-purple-100 text-purple-600'
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {assignment.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{assignment.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className={`font-medium ${
                          assignment.status === 'Completed' 
                            ? 'text-green-600'
                            : assignment.status === 'In Progress'
                            ? 'text-blue-600'
                            : 'text-gray-600'
                        }`}>
                          {assignment.progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            assignment.status === 'Completed'
                              ? 'bg-green-500'
                              : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                          }`}
                          style={{ width: `${assignment.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="p-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Tasks</h4>
                    <div className="space-y-2">
                      {assignment.tasks.map((task, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            readOnly
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className={`ml-3 text-sm ${
                            task.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                          }`}>
                            {task.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Due: {new Date(assignment.deadline).toLocaleDateString()}
                      </div>
                      <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            {/* Learning Path Progress */}
            <div className="mb-8 bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Your Learning Path</h2>
              <div className="flex justify-between items-center">
                {learningPath.map((step, index) => (
                  <div key={step.name} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                        step.status === 'completed'
                          ? 'bg-green-100 text-green-600'
                          : step.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-600 animate-pulse'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <div className="text-sm mt-2 text-center">{step.name}</div>
                    {index < learningPath.length - 1 && (
                      <div className="absolute w-16 h-0.5 bg-gray-200 left-0 top-6 -z-10"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Course Progress */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300">
                  <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
                  <div className="space-y-6">
                    {courseProgress.map((course) => (
                      <div key={course.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{course.name}</span>
                          <span className="text-blue-600">{course.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500 animate-pulse"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Next: {course.nextLesson}</span>
                          <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300">
                  <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
                  <div className="space-y-4">
                    {upcomingDeadlines.map((deadline) => (
                      <div
                        key={`${deadline.course}-${deadline.task}`}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              deadline.priority === 'high'
                                ? 'bg-red-400'
                                : deadline.priority === 'medium'
                                ? 'bg-yellow-400'
                                : 'bg-green-400'
                            }`}
                          ></div>
                          <div>
                            <h3 className="font-medium">{deadline.course}</h3>
                            <p className="text-sm text-gray-600">{deadline.task}</p>
                          </div>
                        </div>
                        <div className="text-sm text-indigo-600">
                          Due: {new Date(deadline.due).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300">
                  <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.name}
                        className="p-4 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg text-center group hover:from-indigo-100 hover:to-blue-100 transition-all duration-300"
                      >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                          {achievement.icon}
                        </div>
                        <h3 className="font-medium text-gray-900">{achievement.name}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                {/* Quick Stats */}
                <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300">
                  <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300">
                      <div className="text-2xl font-bold text-blue-600 animate-count">3</div>
                      <div className="text-sm text-gray-600">Active Courses</div>
                    </div>
                    <div className="text-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-300">
                      <div className="text-2xl font-bold text-indigo-600 animate-count">12</div>
                      <div className="text-sm text-gray-600">Completed Tasks</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-300">
                      <div className="text-2xl font-bold text-purple-600 animate-count">85%</div>
                      <div className="text-sm text-gray-600">Avg. Score</div>
                    </div>
                    <div className="text-center p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors duration-300">
                      <div className="text-2xl font-bold text-pink-600 animate-count">24h</div>
                      <div className="text-sm text-gray-600">Study Time</div>
                    </div>
                  </div>
                </div>

                {/* Recommended Courses */}
                <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300">
                  <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
                  <div className="space-y-4">
                    {recommendations.map((course) => (
                      <div
                        key={course.title}
                        className="p-4 border border-gray-100 rounded-lg hover:border-indigo-200 transition-all duration-200 group cursor-pointer hover:bg-indigo-50"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                            {course.icon}
                          </span>
                          <div>
                            <h3 className="font-medium group-hover:text-indigo-600 transition-colors duration-200">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-600">{course.description}</p>
                            <div className="mt-2 flex items-center space-x-4">
                              <span className="text-xs text-gray-500">{course.difficulty}</span>
                              <span className="text-xs text-gray-500">{course.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Study Streak */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-[1.02] transition-all duration-300">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2 animate-bounce-slow">🔥 7 Days</div>
                    <div className="text-blue-100">Study Streak</div>
                    <div className="mt-4 text-sm text-blue-100">
                      Keep learning to maintain your streak!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // Add state for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
          {/* Header Bar */}
          <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200 z-50">
            <div className="flex items-center justify-between h-16 px-4">
              {/* Left side */}
              <div className="flex items-center">
                {/* Mobile menu button */}
                <button
                  onClick={() => {
                    setIsSidebarOpen(!isSidebarOpen);
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                  }}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200 lg:hidden"
                >
                  {isMobileMenuOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
                {/* Desktop menu button */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200 hidden lg:block"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div className="ml-4">
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
                    CourseHub
                  </span>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center space-x-2 md:space-x-4">
                {/* Search - Hidden on mobile */}
                <div className="hidden md:block">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-48 lg:w-64 px-4 py-2 rounded-lg bg-gray-100 focus:bg-white border border-transparent focus:border-gray-300 transition-colors duration-200"
                    />
                    <div className="absolute right-3 top-2.5 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Loved Courses Button */}
                <button 
                  onClick={() => setActiveTab('loved')}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative flex items-center"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {Object.values(lovedStates).filter(Boolean).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {Object.values(lovedStates).filter(Boolean).length}
                    </span>
                  )}
                </button>

                {/* Notifications */}
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile */}
                <div className="flex items-center space-x-3">
                  <div className="hidden md:block text-right">
                    <div className="text-sm font-medium text-gray-700">{user?.firstName} {user?.lastName}</div>
                    <div className="text-xs text-gray-500">{formData?.academicYear}</div>
                  </div>
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8 md:w-10 md:h-10 rounded-lg",
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Search - Shown only on mobile */}
            <div className="p-4 border-t border-gray-200 lg:hidden">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses, resources..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 focus:bg-white border border-transparent focus:border-gray-300 transition-colors duration-200"
                />
                <div className="absolute right-3 top-2.5 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </header>

          {/* Mobile Menu Overlay */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
          )}

          {/* Desktop Sidebar - Hidden on medium and smaller screens */}
          <aside className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 hidden lg:block ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <nav className="p-4 h-full overflow-y-auto">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setActiveTab(item.value);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeTab === item.value
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Bottom section */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                  <div className="text-sm font-medium text-gray-800 mb-2">Need Help?</div>
                  <p className="text-sm text-gray-600 mb-3">Contact our support team for assistance</p>
                  <Link 
                    to="/contact"
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <span className="mr-2">👥</span>
                    Contact Support Team
                  </Link>
                </div>
              </div>
            </nav>
          </aside>

          {/* Bottom Navigation Bar - Visible only on medium screens */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 hidden md:block lg:hidden">
            <div className="flex justify-around items-center h-16 px-4">
              {bottomNavItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setActiveTab(item.value);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-colors duration-200 relative ${
                    activeTab === item.value
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-xs font-medium">{item.label}</span>
                  {item.value === 'loved' && Object.values(lovedStates).filter(Boolean).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {Object.values(lovedStates).filter(Boolean).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu - Visible only on small screens */}
          <aside className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } ${isMobileMenuOpen ? 'translate-x-0' : ''}`}>
            <nav className="p-4 h-full overflow-y-auto">
              <div className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setActiveTab(item.value);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      activeTab === item.value
                        ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Bottom section */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                  <div className="text-sm font-medium text-gray-800 mb-2">Need Help?</div>
                  <p className="text-sm text-gray-600 mb-3">Contact our support team for assistance</p>
                  <Link 
                    to="/contact"
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <span className="mr-2">👥</span>
                    Contact Support Team
                  </Link>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main Content - Adjusted padding for bottom nav */}
          <main className={`pt-16 pb-20 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
          }`}>
            <div className="p-4 md:p-6 lg:p-8">
              {renderContent()}
            </div>
          </main>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
} 