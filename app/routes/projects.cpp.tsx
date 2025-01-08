import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  sourceCode: string;
  title: string;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

type ProjectAuthCodes = {
  [key: string]: string[];
};

export default function CppProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [language, setLanguage] = useState<"en" | "am">("en");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [downloadCount, setDownloadCount] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Strong authorization codes for different projects
  const projectAuthCodes: ProjectAuthCodes = {
    "Library Management System": ["LIB2024SEC", "LIBAUTH935", "LIBSYS246"],
    "Bank Management System": ["BANK2024X", "BANKSEC731", "BANKAUTH482"],
    "Student Grade Management": ["GRADE2024", "STUAUTH624", "GRDSYS159"],
    "Hospital Management System": ["HOSP2024X", "MEDAUTH837", "HSPSYS462"],
    "Inventory Management System": ["INV2024SEC", "INVAUTH514", "INVSYS793"],
    "Prison Management System": ["PRIS2024X", "SECAUTH628", "PRSSYS351"],
    "Unit Converter Application": ["UNIT2024X", "CONVAUTH942", "UNTSYS175"],
    "Learning Management System": ["LMS2024SEC", "EDUAUTH739", "LRNSYS284"],
    "Temperature Converter": ["TEMP2024X", "TMPAUTH516", "TMPSYS843"],
    "PDF Store Management": ["PDF2024SEC", "PDFAUTH627", "PDFSYS194"]
  };

  const translations = {
    en: {
      title: "C++ Projects Collection",
      subtitle: "Explore our collection of C++ projects ranging from beginner to advanced levels.",
      search: "Search projects...",
      difficulty: {
        all: "All Levels",
        beginner: "Beginner",
        intermediate: "Intermediate",
        advanced: "Advanced"
      },
      download: "Download Source Code",
      learnMore: "Learn More",
      authRequired: "Authorization Required",
      authMessage: "Please enter your authorization code to download",
      needHelp: "Need Help?",
      contactInfo: "Don't have a code? Contact Cherinet at:",
      invalidCode: "Invalid authorization code. Please contact Cherinet for a valid code."
    },
    am: {
      title: "የC++ ፕሮጀክቶች ስብስብ",
      subtitle: "ከጀማሪ እስከ ከፍተኛ ደረጃ ያሉ የC++ ፕሮጀክቶችን ይመልከቱ።",
      search: "ፕሮጀክቶችን ይፈልጉ...",
      difficulty: {
        all: "ሁሉም ደረጃዎች",
        beginner: "ጀማሪ",
        intermediate: "መካከለኛ",
        advanced: "ከፍተኛ"
      },
      download: "ሶርስ ኮድ ያውርዱ",
      learnMore: "ተጨማሪ ይወቁ",
      authRequired: "ፈቃድ ያስፈልጋል",
      authMessage: "እባክዎ የፈቃድ ኮድዎን ያስገቡ",
      needHelp: "እርዳታ ይፈልጋሉ?",
      contactInfo: "ኮድ የለዎትም? ቸሪነትን ያግኙ:",
      invalidCode: "ልክ ያልሆነ የፈቃድ ኮድ። እባክዎ ቸሪነትን ለትክክለኛ ኮድ ያግኙ።"
    }
  };

  const notificationTranslations = {
    en: {
      downloadSuccess: "Successfully downloaded",
      downloadError: "Failed to download. Please try again.",
      invalidCode: "Invalid authorization code. Please check and try again.",
      tooManyAttempts: "Too many invalid attempts. Please wait before trying again.",
      codeRequired: "Authorization code is required",
      downloadStarted: "Download starting...",
      projectNotFound: "Project not found",
      networkError: "Network error. Please check your connection.",
      downloadLimit: "Download limit reached for this project",
    },
    am: {
      downloadSuccess: "በተሳካ ሁኔታ ተውርዷል",
      downloadError: "ለማውረድ አልተሳካም። እባክዎ እንደገና ይሞክሩ።",
      invalidCode: "ልክ ያልሆነ የፈቃድ ኮድ። እባክዎ ያረጋግጡና እንደገና ይሞክሩ።",
      tooManyAttempts: "በጣም ብዙ ያልተሳኩ ሙከራዎች። እባክዎ ከመሞከርዎ በፊት ይጠብቁ።",
      codeRequired: "የፈቃድ ኮድ ያስፈልጋል",
      downloadStarted: "ማውረድ ተጀምሯል...",
      projectNotFound: "ፕሮጀክቱ አልተገኘም",
      networkError: "የኔትወርክ ችግር። እባክዎ ግንኙነትዎን ያረጋግጡ።",
      downloadLimit: "ለዚህ ፕሮጀክት የማውረድ ገደብ ደርሷል",
    }
  } as const;

  type NotificationMessageKey = keyof typeof notificationTranslations.en;

  const addNotification = (type: Notification['type'], messageKey: NotificationMessageKey) => {
    const id = Date.now().toString();
    const message = notificationTranslations[language][messageKey];
    setNotifications(prev => [...prev, { id, type, message }]);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleDownload = (sourceCode: string, title: string) => {
    if (downloadCount[title] >= 3) {
      addNotification('warning', 'downloadLimit');
      return;
    }
    setSelectedProject({ sourceCode, title });
    setShowAuthModal(true);
    setError("");
    setAuthCode("");
  };

  const handleAuthSubmit = () => {
    if (!authCode.trim()) {
      addNotification('error', 'codeRequired');
      return;
    }

    if (selectedProject && projectAuthCodes[selectedProject.title]?.includes(authCode)) {
      addNotification('info', 'downloadStarted');
      
      // Proceed with download
      const fileName = selectedProject.sourceCode.split('/').pop() || 'project.cpp';
      fetch(selectedProject.sourceCode)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
          setShowAuthModal(false);
          addNotification('success', 'downloadSuccess');
          
          // Update download count
          setDownloadCount(prev => ({
            ...prev,
            [selectedProject.title]: (prev[selectedProject.title] || 0) + 1
          }));
        })
        .catch(error => {
          console.error('Download failed:', error);
          addNotification('error', 'networkError');
        });
    } else {
      addNotification('error', 'invalidCode');
    }
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
      icon: "🔄🔄"
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8 relative"
      >
        {/* Notifications Container */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          <AnimatePresence>
            {notifications.map(notification => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                className={`p-4 rounded-lg shadow-lg max-w-md ${
                  notification.type === 'success' ? 'bg-green-500 text-white' :
                  notification.type === 'error' ? 'bg-red-500 text-white' :
                  notification.type === 'warning' ? 'bg-yellow-500 text-white' :
                  'bg-blue-500 text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  {notification.type === 'success' && '✅'}
                  {notification.type === 'error' && '❌'}
                  {notification.type === 'warning' && '⚠️'}
                  {notification.type === 'info' && 'ℹ️'}
                  <span>{notification.message}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLanguage(language === "en" ? "am" : "en")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center gap-2"
          >
            {language === "en" ? "🇪🇹 አማርኛ" : "🇬🇧 English"}
          </motion.button>
        </div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 animate-gradient">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text">
              {translations[language].title}
            </span>
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-gray-600 max-w-3xl mx-auto text-lg"
          >
            {translations[language].subtitle}
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mb-8 flex flex-col md:flex-row gap-4 justify-center"
        >
          <input
            type="text"
            placeholder={translations[language].search}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {Object.entries(translations[language].difficulty).map(([key, value]) => (
              <option key={key} value={key}>{value}</option>
            ))}
          </select>
        </motion.div>

        {/* Projects Grid with stagger animation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
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
                    {translations[language].download}
                  </button>
                  <Link
                    to={`/projects/cpp/${project.id}`}
                    className="flex-1 text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {translations[language].learnMore}
                  </Link>
                </div>

                {/* Add download count display in the project card */}
                <div className="text-sm text-gray-500 mt-2">
                  {downloadCount[project.title] > 0 && (
                    <span>
                      {language === "en" 
                        ? `Downloaded ${downloadCount[project.title]} times`
                        : `${downloadCount[project.title]} ጊ� ተውርዷል`}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      {/* Authorization Modal */}
      {showAuthModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold mb-4">{translations[language].authRequired}</h2>
            <p className="text-gray-600 mb-4">
              {translations[language].authMessage} {selectedProject?.title}
            </p>
            
            {/* Help Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-blue-800 mb-2">{translations[language].needHelp}</h3>
              <ul className="text-blue-700 text-sm space-y-2">
                <li>• {translations[language].contactInfo}</li>
                <li className="pl-4">- Email: cscher331@gmail.com</li>
                <li className="pl-4">- Phone: +251947006269</li>
                <li className="pl-4">- Telegram: @https://t.me/Mahiyenewudi</li>
                <li>• Codes are unique and can be used multiple times</li>
                <li>• Please keep your authorization code secure</li>
              </ul>
            </div>

            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder={language === "en" ? "Enter authorization code" : "የፈቃድ ኮድ ያስገቡ"}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              value={authCode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthCode(e.target.value)}
            />
            
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 text-red-600 p-3 rounded-lg mb-4"
              >
                {error}
              </motion.div>
            )}
            
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAuthSubmit}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              >
                {translations[language].download}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAuthModal(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300"
              >
                {language === "en" ? "Cancel" : "ይቅር"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <style>{`
        .animate-gradient {
          background-size: 300%;
          -webkit-animation: animatedgradient 6s ease infinite alternate;
          animation: animatedgradient 6s ease infinite alternate;
        }

        @keyframes animatedgradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </SharedLayout>
  );
} 