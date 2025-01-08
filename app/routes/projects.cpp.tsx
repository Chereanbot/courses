import { useState } from "react";
import { Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";

export default function CppProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const handleDownload = (sourceCode: string, title: string) => {
    const fileName = sourceCode.split('/').pop() || 'project.cpp';
    fetch(sourceCode)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(error => {
        console.error('Download failed:', error);
        alert('Failed to download the file. Please try again.');
      });
  };

  const projects = [
    {
      id: 1,
      title: "Library Management System",
      description: "A comprehensive C++ library management system utilizing Object-Oriented Programming principles. Features include book cataloging, member management, lending operations, and fine calculations. The system uses file handling for persistent data storage and implements data structures for efficient book and member tracking.",
      difficulty: "intermediate",
      features: [
        "Book catalog with search and filter capabilities",
        "Member registration and profile management",
        "Book lending and return system with due date tracking",
        "Fine calculation based on overdue days",
        "Book reservation system",
        "Report generation for books and members",
        "Admin dashboard for system management"
      ],
      technologies: ["C++", "File Handling", "OOP", "Data Structures", "STL Containers"],
      sourceCode: "/c++/library-management.cpp",
      concepts: [
        "Classes and Objects",
        "Inheritance and Polymorphism",
        "File I/O Operations",
        "Vector and Map Containers",
        "Exception Handling"
      ],
      icon: "📚"
    },
    {
      id: 2,
      title: "Bank Management System",
      description: "A robust C++ banking solution that handles account management, transactions, and statement generation. Implements secure transaction handling, account validation, and maintains detailed transaction history. Uses advanced C++ features for data integrity and security.",
      difficulty: "intermediate",
      features: [
        "Account creation with validation",
        "Multiple account types (Savings, Current, Fixed Deposit)",
        "Secure transaction processing",
        "Balance inquiry and mini statements",
        "Transaction history tracking",
        "Interest calculation for different account types",
        "Account statement generation in formatted output"
      ],
      technologies: ["C++", "File Handling", "OOP", "Data Structures", "STL Algorithms"],
      sourceCode: "/c++/bank-system.cpp",
      concepts: [
        "Class Inheritance Hierarchy",
        "Function Overloading",
        "File Stream Operations",
        "Template Classes",
        "Smart Pointers"
      ],
      icon: "🏦"
    },
    {
      id: 3,
      title: "Student Grade Management",
      description: "An intuitive C++ grade management system designed for educational institutions. Features comprehensive grade tracking, GPA calculation, and detailed academic performance analysis. Implements sorting algorithms for ranking and statistical analysis of student performance.",
      difficulty: "beginner",
      features: [
        "Student record management with validation",
        "Multiple subject grade entry and modification",
        "Automated GPA and CGPA calculation",
        "Performance analytics and statistics",
        "Grade distribution visualization",
        "Semester-wise progress tracking",
        "Customizable grading schemes"
      ],
      technologies: ["C++", "Arrays", "Basic File I/O", "STL Vectors", "Algorithms"],
      sourceCode: "/c++/grade-management.cpp",
      concepts: [
        "Basic Classes",
        "Array Operations",
        "File Handling Basics",
        "Sorting Algorithms",
        "Input Validation"
      ],
      icon: "📝"
    },
    {
      id: 4,
      title: "Hospital Management System",
      description: "A comprehensive C++ healthcare management system for hospitals and clinics. Manages patient records, doctor schedules, appointments, and billing. Implements priority queues for emergency handling and efficient appointment scheduling algorithms.",
      difficulty: "advanced",
      features: [
        "Patient registration and medical history",
        "Doctor scheduling and availability management",
        "Appointment booking with priority handling",
        "Emergency case management",
        "Automated billing system",
        "Medicine inventory tracking",
        "Medical record encryption",
        "Insurance policy integration"
      ],
      technologies: ["C++", "OOP", "Data Structures", "File Handling", "STL Containers"],
      sourceCode: "/c++/hospital-management.cpp",
      concepts: [
        "Advanced Class Hierarchies",
        "Priority Queues",
        "Multi-threading",
        "Database Integration",
        "Security Implementation"
      ],
      icon: "🏥"
    },
    {
      id: 5,
      title: "Inventory Management System",
      description: "A sophisticated C++ inventory tracking system for retail and warehouse management. Features real-time stock updates, automated reordering, and comprehensive reporting. Uses advanced data structures for efficient inventory tracking and optimization.",
      difficulty: "intermediate",
      features: [
        "Product catalog management",
        "Stock level tracking and alerts",
        "Automated purchase order generation",
        "Supplier management system",
        "Sales and inventory analytics",
        "Barcode integration capability",
        "Multiple warehouse support",
        "Inventory optimization algorithms"
      ],
      technologies: ["C++", "Data Structures", "File Handling", "STL", "Algorithms"],
      sourceCode: "/c++/inventory-management.cpp",
      concepts: [
        "Binary Search Trees",
        "Hash Tables",
        "Template Programming",
        "Smart Pointers",
        "Design Patterns"
      ],
      icon: "📦"
    },
    {
      id: 6,
      title: "Prison Management System",
      description: "A secure C++ prison management system for correctional facilities. Manages inmate records, staff scheduling, cell assignments, and visitor tracking. Implements high-security measures and comprehensive monitoring features.",
      difficulty: "advanced",
      features: [
        "Inmate record management with biometrics",
        "Cell block and assignment management",
        "Staff scheduling and duty rotation",
        "Visitor registration and tracking",
        "Incident reporting system",
        "Security level classification",
        "Release date calculation",
        "Behavior monitoring system"
      ],
      technologies: ["C++", "Advanced OOP", "Security Algorithms", "File Systems", "STL"],
      sourceCode: "/c++/prison-management.cpp",
      concepts: [
        "Secure Data Handling",
        "Access Control Systems",
        "Complex Data Structures",
        "Multi-level Authentication",
        "Audit Logging"
      ],
      icon: "🏢"
    },
    {
      id: 7,
      title: "Unit Converter Application",
      description: "A versatile C++ unit conversion system supporting multiple measurement types. Features an extensible architecture for adding new unit types and conversion formulas. Implements precise floating-point calculations for accurate conversions.",
      difficulty: "beginner",
      features: [
        "Multiple measurement type support",
        "Bi-directional conversion",
        "Custom unit definition capability",
        "Conversion history tracking",
        "Favorite conversions feature",
        "Precision control options",
        "Bulk conversion support"
      ],
      technologies: ["C++", "Math Libraries", "STL", "Basic OOP"],
      sourceCode: "/c++/unit-converter.cpp",
      concepts: [
        "Function Templates",
        "Operator Overloading",
        "Precision Handling",
        "Error Checking",
        "User Input Validation"
      ],
      icon: "🔄"
    },
    {
      id: 8,
      title: "Learning Management System",
      description: "A comprehensive C++ e-learning platform for managing courses, student progress, and educational resources. Features include course management, student tracking, and assessment tools.",
      difficulty: "intermediate",
      features: [
        "Course content management",
        "Student enrollment system",
        "Progress tracking",
        "Quiz and assessment tools",
        "Resource management",
        "Student performance analytics",
        "Discussion forums",
        "Assignment submission system"
      ],
      technologies: ["C++", "Data Structures", "File I/O", "Content Management"],
      sourceCode: "/c++/learning-management.cpp",
      concepts: [
        "Object-Oriented Design",
        "Content Organization",
        "User Management",
        "Progress Tracking",
        "Assessment Systems"
      ],
      icon: "📚"
    },
    {
      id: 9,
      title: "Temperature Converter",
      description: "A versatile C++ temperature conversion utility supporting multiple temperature scales. Features precise calculations and comprehensive input validation.",
      difficulty: "beginner",
      features: [
        "Multiple temperature scale support",
        "Precise conversion calculations",
        "Input validation",
        "Conversion history",
        "Batch conversion capability",
        "Custom scale definitions",
        "Temperature analysis tools",
        "Export functionality"
      ],
      technologies: ["C++", "Mathematical Operations", "Input Handling"],
      sourceCode: "/c++/temperature-converter.cpp",
      concepts: [
        "Numerical Computation",
        "Input Validation",
        "Error Handling",
        "Unit Conversion",
        "User Interface Design"
      ],
      icon: "🌡️"
    },
    {
      id: 10,
      title: "PDF Store Management",
      description: "A sophisticated C++ digital bookstore management system with features for handling PDF books, user accounts, and purchases.",
      difficulty: "advanced",
      features: [
        "Digital book catalog management",
        "User registration and authentication",
        "Book purchase and download system",
        "Rating and review functionality",
        "Balance management for purchases",
        "Download history tracking",
        "Book metadata management",
        "Tag-based book categorization"
      ],
      technologies: ["C++", "File I/O", "STL Containers", "User Authentication"],
      sourceCode: "/c++/pdf-store.cpp",
      concepts: [
        "Classes and Objects",
        "File Handling",
        "Data Structures",
        "User Authentication",
        "Transaction Management"
      ],
      icon: "📱"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || project.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <SharedLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text mb-4">
            C++ Projects
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore our collection of C++ projects ranging from beginner to advanced levels. 
            Each project is designed to help you master different aspects of C++ programming,
            from basic syntax to advanced concepts like OOP, data structures, and design patterns.
            Perfect for building your portfolio and enhancing your C++ skills.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="Search projects..."
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="p-6">
                <div className="text-3xl mb-4 bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {project.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                {/* Difficulty Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  project.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                </span>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* C++ Concepts */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">C++ Concepts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.concepts.map((concept, index) => (
                      <span key={index} className="bg-purple-50 text-purple-600 px-2 py-1 rounded-md text-sm">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Source Code Link */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleDownload(project.sourceCode, project.title)}
                    className="flex-1 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Download Source Code
                  </button>
                  <Link
                    to={`/projects/cpp/${project.id}`}
                    className="flex-1 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SharedLayout>
  );
} 