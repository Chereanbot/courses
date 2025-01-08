import { useState } from "react";
import { Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";

export default function OopProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const projects = [
    {
      id: 1,
      title: "University Management System",
      description: "Complete system for managing university departments, faculty, students, and courses.",
      language: "Java",
      features: [
        "Student enrollment",
        "Course registration",
        "Faculty management",
        "Grade tracking",
        "Department administration"
      ],
      concepts: [
        "Inheritance",
        "Polymorphism",
        "Encapsulation",
        "Abstraction"
      ],
      icon: "🎓"
    },
    {
      id: 2,
      title: "E-Commerce Platform",
      description: "Object-oriented implementation of an online shopping system.",
      language: "C++",
      features: [
        "Product catalog",
        "Shopping cart",
        "User accounts",
        "Order processing",
        "Payment integration"
      ],
      concepts: [
        "Class hierarchy",
        "Interface design",
        "Design patterns",
        "SOLID principles"
      ],
      icon: "🛍️"
    },
    {
      id: 3,
      title: "Social Media Network",
      description: "Social networking platform with user interactions and content sharing.",
      language: "Python",
      features: [
        "User profiles",
        "Friend connections",
        "Post sharing",
        "News feed",
        "Notifications"
      ],
      concepts: [
        "Object composition",
        "Method overriding",
        "Abstract classes",
        "Interfaces"
      ],
      icon: "🌐"
    },
    {
      id: 4,
      title: "Game Engine Framework",
      description: "Basic game engine demonstrating OOP principles in game development.",
      language: "C++",
      features: [
        "Entity system",
        "Physics engine",
        "Resource management",
        "Event handling",
        "Rendering system"
      ],
      concepts: [
        "Component systems",
        "Factory pattern",
        "Observer pattern",
        "Singleton pattern"
      ],
      icon: "🎮"
    },
    {
      id: 5,
      title: "Smart Home System",
      description: "IoT-based smart home automation system using OOP principles.",
      language: "Java",
      features: [
        "Device management",
        "Automation rules",
        "Sensor integration",
        "Remote control",
        "Energy monitoring"
      ],
      concepts: [
        "Interface segregation",
        "Dependency injection",
        "Event-driven design",
        "Strategy pattern"
      ],
      icon: "🏠"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLanguage = selectedLanguage === "all" || project.language.toLowerCase() === selectedLanguage;
    return matchesSearch && matchesLanguage;
  });

  return (
    <SharedLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text mb-4">
            Object-Oriented Programming Projects
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of OOP projects that demonstrate key object-oriented principles and design patterns.
            Perfect for learning advanced programming concepts.
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
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="all">All Languages</option>
            <option value="java">Java</option>
            <option value="c++">C++</option>
            <option value="python">Python</option>
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
                
                {/* Language Badge */}
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                  project.language === 'Java' ? 'bg-orange-100 text-orange-800' :
                  project.language === 'C++' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {project.language}
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

                {/* OOP Concepts */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">OOP Concepts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.concepts.map((concept, index) => (
                      <span key={index} className="bg-purple-50 text-purple-600 px-2 py-1 rounded-md text-sm">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to={`/projects/oop/${project.id}`}
                  className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                  View Project
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SharedLayout>
  );
} 