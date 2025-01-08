import { useState } from "react";
import { Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";

export default function JavaProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const handleDownload = (sourceCode: string, title: string) => {
    const fileName = sourceCode.split('/').pop() || 'project.java';
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
      title: "Advanced E-Commerce Platform",
      description: "A comprehensive Java-based e-commerce system using Spring Boot and Microservices architecture. Features include product management, user authentication, shopping cart, order processing, and payment integration.",
      difficulty: "advanced",
      features: [
        "Microservices Architecture",
        "RESTful API Implementation",
        "JWT Authentication",
        "Payment Gateway Integration",
        "Order Management System",
        "Product Catalog with Search",
        "Shopping Cart Management",
        "User Profile Management"
      ],
      technologies: ["Java", "Spring Boot", "Spring Security", "JPA/Hibernate", "MySQL", "Redis"],
      sourceCode: "/java/ecommerce-platform.java",
      concepts: [
        "Microservices",
        "REST APIs",
        "Database Design",
        "Security",
        "Caching"
      ],
      icon: "🛍️"
    },
    {
      id: 2,
      title: "Hospital Management System",
      description: "An enterprise-level hospital management system built with Java EE. Manages patient records, appointments, medical staff, and hospital resources with a focus on security and efficiency.",
      difficulty: "advanced",
      features: [
        "Patient Record Management",
        "Appointment Scheduling",
        "Doctor Management",
        "Pharmacy Integration",
        "Laboratory Management",
        "Billing System",
        "Insurance Processing",
        "Medical History Tracking"
      ],
      technologies: ["Java EE", "JSP", "Servlets", "JDBC", "Oracle Database"],
      sourceCode: "/java/hospital-system.java",
      concepts: [
        "Enterprise Architecture",
        "Database Management",
        "Session Handling",
        "Transaction Management",
        "Security Implementation"
      ],
      icon: "🏥"
    },
    {
      id: 3,
      title: "Smart Banking Application",
      description: "A secure banking application with features for account management, transactions, and financial analysis. Implements advanced security measures and real-time transaction processing.",
      difficulty: "intermediate",
      features: [
        "Account Management",
        "Fund Transfer",
        "Transaction History",
        "Bill Payments",
        "Investment Portfolio",
        "Loan Management",
        "Financial Reports",
        "Mobile Banking Features"
      ],
      technologies: ["Java", "Spring Framework", "Hibernate", "PostgreSQL", "Spring Security"],
      sourceCode: "/java/banking-app.java",
      concepts: [
        "Financial Systems",
        "Security Protocols",
        "Transaction Processing",
        "Data Encryption",
        "Audit Logging"
      ],
      icon: "🏦"
    },
    {
      id: 4,
      title: "Learning Management System",
      description: "An educational platform built with Java and Spring Boot, featuring course management, student progress tracking, and interactive learning tools.",
      difficulty: "intermediate",
      features: [
        "Course Management",
        "Student Enrollment",
        "Assignment Submission",
        "Progress Tracking",
        "Discussion Forums",
        "Resource Library",
        "Grade Management",
        "Virtual Classroom"
      ],
      technologies: ["Java", "Spring Boot", "Thymeleaf", "MongoDB", "WebSocket"],
      sourceCode: "/java/lms-system.java",
      concepts: [
        "Educational Software",
        "Content Management",
        "Real-time Communication",
        "Document Management",
        "User Tracking"
      ],
      icon: "📚"
    },
    {
      id: 5,
      title: "Inventory Control System",
      description: "A real-time inventory management system with features for stock tracking, supplier management, and automated ordering using Java and modern frameworks.",
      difficulty: "intermediate",
      features: [
        "Stock Management",
        "Supplier Management",
        "Order Processing",
        "Warehouse Management",
        "Barcode Integration",
        "Reports Generation",
        "Alert System",
        "Analytics Dashboard"
      ],
      technologies: ["Java", "Spring Boot", "JPA", "MySQL", "Apache POI"],
      sourceCode: "/java/inventory-system.java",
      concepts: [
        "Inventory Control",
        "Supply Chain",
        "Report Generation",
        "Data Analysis",
        "Process Automation"
      ],
      icon: "📦"
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
            Advanced Java Projects
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore our collection of advanced Java projects showcasing enterprise-level applications,
            distributed systems, and modern architectural patterns. Perfect for building your expertise
            in Java development and understanding real-world software engineering practices.
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

                {/* Java Concepts */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Java Concepts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.concepts.map((concept, index) => (
                      <span key={index} className="bg-purple-50 text-purple-600 px-2 py-1 rounded-md text-sm">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <button
                    onClick={() => handleDownload(project.sourceCode, project.title)}
                    className="flex-1 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Download Source Code
                  </button>
                  <Link
                    to={`/projects/java/${project.id}`}
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