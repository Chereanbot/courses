import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  sourceCode: string;
  title: string;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

type ProjectAuthCodes = {
  [key: string]: string[];
};

export default function JavaProjects() {
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
    "Advanced E-Commerce Platform": ["ECOM2024X", "SHOPAUTH731", "ECOMSYS246"],
    "Hospital Management System": ["HOSP2024J", "MEDAUTH935", "HSPSYS482"],
    "Smart Banking Application": ["BANK2024J", "FINAUTH624", "BANKSYS159"],
    "Learning Management System": ["LMS2024J", "EDUAUTH837", "LRNSYS462"],
    "Inventory Control System": ["INV2024J", "INVAUTH514", "INVSYS793"]
  };

  const translations = {
    en: {
      title: "Advanced Java Projects",
      subtitle: "Explore our collection of advanced Java projects showcasing enterprise-level applications, distributed systems, and modern architectural patterns.",
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
      title: "የጃቫ ፕሮጀክቶች",
      subtitle: "የኢንተርፕራይዝ ደረጃ መተግበሪያዎችን፣ የተሰራጩ ሲስተሞችን እና ዘመናዊ አርክቴክቸራል ሥርዓቶችን የሚያሳዩ የላቁ የጃቫ ፕሮጀክቶችን ይመልከቱ።",
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
      
      const fileName = selectedProject.sourceCode.split('/').pop() || 'project.java';
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
      title: "Advanced E-Commerce Platform",
      description: "A comprehensive Java-based e-commerce system using JDBC for database connectivity. Features a robust Oracle Database backend for product management and MySQL for user data. Implements core Java principles with emphasis on database optimization and transaction management.",
      difficulty: "advanced",
      features: [
        "Multi-threaded Order Processing",
        "JDBC Connection Pooling",
        "Transaction Management",
        "Stored Procedures Integration",
        "Batch Processing Operations",
        "Database Backup & Recovery",
        "Optimized SQL Queries",
        "Advanced Exception Handling"
      ],
      technologies: ["Java", "JDBC", "Oracle Database", "MySQL"],
      sourceCode: "https://github.com/shopizer-ecommerce/shopizer",
      concepts: [
        "JDBC & Connection Pooling",
        "Database Transactions",
        "SQL Optimization",
        "Java Threading",
        "Error Handling"
      ],
      icon: "🛍️",
      databaseInfo: {
        primary: "Oracle Database (Product Catalog, Orders)",
        secondary: "MySQL (User Data, Analytics)",
        backup: "Oracle RAC (Disaster Recovery)"
      }
    },
    {
      id: 2,
      title: "Hospital Management System",
      description: "An enterprise-level healthcare management solution built with core Java. Utilizes Oracle Database for secure patient records and MySQL for medical inventory. Features comprehensive database security and ACID compliance.",
      difficulty: "advanced",
      features: [
        "Secure Database Operations",
        "Stored Procedures & Functions",
        "Database Mirroring",
        "Audit Trail Implementation",
        "Batch Data Processing",
        "Report Generation",
        "Data Encryption",
        "Backup Management"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/sdcuike/issutracker-websocket/tree/master/src/main/java/com/doctor/jdbc",
      concepts: [
        "Database Security",
        "ACID Properties",
        "Data Integrity",
        "Transaction Control",
        "Backup & Recovery"
      ],
      icon: "🏥",
      databaseInfo: {
        primary: "Oracle Database (Patient Records)",
        secondary: "MySQL (Inventory, Staff)",
        audit: "Oracle (Access Logs)"
      }
    },
    {
      id: 3,
      title: "Smart Banking Application",
      description: "A secure banking system using Java with Oracle Database RAC for high availability. Implements advanced database security features and transaction management using native Oracle and MySQL capabilities.",
      difficulty: "intermediate",
      features: [
        "Database Clustering",
        "Transaction Isolation",
        "Stored Procedures",
        "Database Triggers",
        "Automated Backups",
        "Data Encryption",
        "Audit Logging",
        "Performance Monitoring"
      ],
      technologies: ["Java", "Oracle RAC", "MySQL", "JDBC"],
      sourceCode: "https://github.com/apache/cayenne/tree/master/tutorials/tutorial-rop-server/src/main/java/org/apache/cayenne/tutorial",
      concepts: [
        "Database Clustering",
        "Transaction Management",
        "Database Security",
        "Performance Tuning",
        "High Availability"
      ],
      icon: "🏦",
      databaseInfo: {
        primary: "Oracle RAC (Transactions)",
        secondary: "MySQL (Customer Data)",
        audit: "Oracle (Security Logs)"
      }
    },
    {
      id: 4,
      title: "Learning Management System",
      description: "An educational platform using Java with Oracle Database for course management and MySQL for student data. Features optimized database queries and efficient data handling using pure JDBC.",
      difficulty: "intermediate",
      features: [
        "Database Partitioning",
        "Stored Procedures",
        "BLOB/CLOB Handling",
        "Database Indexing",
        "Query Optimization",
        "Batch Processing",
        "Data Import/Export",
        "Performance Monitoring"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/iluwatar/java-design-patterns/tree/master/dao",
      concepts: [
        "Database Design",
        "Query Optimization",
        "Data Structures",
        "File Handling",
        "Performance Tuning"
      ],
      icon: "📚",
      databaseInfo: {
        primary: "Oracle Database (Course Content)",
        secondary: "MySQL (Student Data)",
        backup: "Oracle (System Backups)"
      }
    },
    {
      id: 5,
      title: "Inventory Control System",
      description: "A robust inventory management solution using Java and Oracle Database. Implements advanced SQL features and database optimization techniques for large-scale inventory tracking.",
      difficulty: "intermediate",
      features: [
        "Database Partitioning",
        "Material Views",
        "Dynamic SQL",
        "Database Jobs",
        "Index Management",
        "Data Archiving",
        "Performance Monitoring",
        "Automated Reports"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/eugenp/tutorials/tree/master/persistence-modules/jdbc-mysql",
      concepts: [
        "Database Optimization",
        "Index Strategies",
        "Batch Processing",
        "Data Warehousing",
        "Performance Tuning"
      ],
      icon: "📦",
      databaseInfo: {
        primary: "Oracle Database (Inventory)",
        secondary: "MySQL (Suppliers)",
        archive: "Oracle (Historical Data)"
      }
    },
    {
      id: 6,
      title: "Student Information System",
      description: "A comprehensive student management system using Java and Oracle Database. Features grade tracking, attendance management, and performance analytics.",
      difficulty: "intermediate",
      features: [
        "Student Records Management",
        "Grade Calculation System",
        "Attendance Tracking",
        "Performance Analytics",
        "Report Generation",
        "Parent Portal Access",
        "Course Management",
        "Faculty Dashboard"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/spring-projects/spring-data-examples/tree/main/jdbc/basics",
      concepts: [
        "Database Design",
        "JDBC Operations",
        "Data Analysis",
        "Reporting Tools",
        "Access Control"
      ],
      icon: "👨‍🎓",
      databaseInfo: {
        primary: "Oracle Database (Academic Records)",
        secondary: "MySQL (User Profiles)",
        analytics: "Oracle (Performance Data)"
      }
    },
    {
      id: 7,
      title: "Library Management System",
      description: "Digital library system with book tracking, member management, and fine calculation using Oracle Database.",
      difficulty: "beginner",
      features: [
        "Book Inventory Management",
        "Member Registration",
        "Fine Calculation",
        "Book Reservation System",
        "Report Generation",
        "Search Functionality",
        "Category Management",
        "Digital Catalog"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/apache/commons-dbcp/tree/master/src/test/java/org/apache/commons/dbcp2/example",
      concepts: [
        "Database Operations",
        "Transaction Handling",
        "Search Algorithms",
        "Report Generation",
        "User Management"
      ],
      icon: "📚",
      databaseInfo: {
        primary: "Oracle Database (Book Records)",
        secondary: "MySQL (Member Data)",
        archive: "Oracle (Historical Data)"
      }
    },
    {
      id: 8,
      title: "Hotel Reservation System",
      description: "Hotel booking and management system with room tracking and reservation handling using Oracle Database.",
      difficulty: "intermediate",
      features: [
        "Room Booking System",
        "Customer Management",
        "Billing Integration",
        "Housekeeping Tracker",
        "Inventory Management",
        "Staff Scheduling",
        "Report Generation",
        "Analytics Dashboard"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/apache/commons-dbutils/tree/master/src/test/java/org/apache/commons/dbutils",
      concepts: [
        "Reservation Logic",
        "Database Design",
        "Transaction Management",
        "Reporting Tools",
        "Data Analytics"
      ],
      icon: "🏨",
      databaseInfo: {
        primary: "Oracle Database (Reservations)",
        secondary: "MySQL (Customer Data)",
        analytics: "Oracle (Business Metrics)"
      }
    },
    {
      id: 9,
      title: "Restaurant Management System",
      description: "Complete restaurant management solution with order processing, inventory tracking, and staff management using Oracle Database.",
      difficulty: "intermediate",
      features: [
        "Order Processing",
        "Table Management",
        "Kitchen Display System",
        "Inventory Control",
        "Staff Scheduling",
        "Customer Loyalty",
        "Billing System",
        "Reports Generation"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/brettwooldridge/HikariCP/tree/dev/src/test/java/com/zaxxer/hikari",
      concepts: [
        "Database Design",
        "Transaction Processing",
        "Inventory Management",
        "Real-time Updates",
        "Data Analytics"
      ],
      icon: "🍽️",
      databaseInfo: {
        primary: "Oracle Database (Orders, Inventory)",
        secondary: "MySQL (Customer Data)",
        analytics: "Oracle (Sales Metrics)"
      }
    },
    {
      id: 10,
      title: "HR Management System",
      description: "Human resources management system with employee tracking, payroll, and performance management using Oracle Database.",
      difficulty: "advanced",
      features: [
        "Employee Records",
        "Payroll Processing",
        "Leave Management",
        "Performance Reviews",
        "Training Tracking",
        "Recruitment Module",
        "Document Management",
        "Benefits Administration"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/apache/commons-pool/tree/master/src/test/java/org/apache/commons/pool2/example",
      concepts: [
        "Database Security",
        "Data Privacy",
        "Report Generation",
        "Document Storage",
        "Access Control"
      ],
      icon: "👥",
      databaseInfo: {
        primary: "Oracle Database (Employee Records)",
        secondary: "MySQL (Training Data)",
        secure: "Oracle (Payroll Data)"
      }
    },
    {
      id: 11,
      title: "Airline Reservation System",
      description: "Flight booking and management system with seat allocation and passenger management using Oracle Database.",
      difficulty: "advanced",
      features: [
        "Flight Scheduling",
        "Seat Allocation",
        "Passenger Management",
        "Booking System",
        "Check-in Module",
        "Fare Management",
        "Route Planning",
        "Loyalty Program"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/vladmihalcea/high-performance-java-persistence/tree/master/core/src/test/java/com/vladmihalcea/hpjp/jdbc",
      concepts: [
        "Transaction Management",
        "Concurrency Control",
        "Database Design",
        "Real-time Processing",
        "Data Integrity"
      ],
      icon: "✈️",
      databaseInfo: {
        primary: "Oracle Database (Bookings)",
        secondary: "MySQL (Customer Profiles)",
        archive: "Oracle (Flight History)"
      }
    },
    {
      id: 12,
      title: "Real Estate Management System",
      description: "Property management system with listing, tenant tracking, and maintenance scheduling using Oracle Database.",
      difficulty: "intermediate",
      features: [
        "Property Listings",
        "Tenant Management",
        "Maintenance Tracking",
        "Rent Collection",
        "Document Storage",
        "Inspection Reports",
        "Financial Reports",
        "Owner Portal"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/apache/tomcat/tree/main/modules/jdbc-pool/src/test/java/org/apache/tomcat/jdbc/test",
      concepts: [
        "Database Design",
        "Document Management",
        "Financial Tracking",
        "Reporting Tools",
        "User Access Control"
      ],
      icon: "🏢",
      databaseInfo: {
        primary: "Oracle Database (Properties)",
        secondary: "MySQL (Tenant Data)",
        documents: "Oracle (Legal Documents)"
      }
    },
    {
      id: 13,
      title: "Sports Club Management",
      description: "Comprehensive sports club management system with member tracking, facility booking, and event management using Oracle Database.",
      difficulty: "intermediate",
      features: [
        "Member Management",
        "Facility Booking",
        "Event Scheduling",
        "Equipment Tracking",
        "Membership Billing",
        "Tournament Management",
        "Coach Allocation",
        "Performance Tracking"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/mybatis/mybatis-3/tree/master/src/test/java/org/apache/ibatis/jdbc",
      concepts: [
        "Database Design",
        "Scheduling Logic",
        "Resource Management",
        "Payment Processing",
        "Event Planning"
      ],
      icon: "⚽",
      databaseInfo: {
        primary: "Oracle Database (Memberships)",
        secondary: "MySQL (Facility Data)",
        events: "Oracle (Tournament Data)"
      }
    },
    {
      id: 14,
      title: "Pharmacy Management System",
      description: "Drug inventory and prescription management system with patient records and supplier tracking using Oracle Database.",
      difficulty: "advanced",
      features: [
        "Inventory Management",
        "Prescription Processing",
        "Patient Records",
        "Supplier Management",
        "Expiry Tracking",
        "Sales Analytics",
        "Insurance Processing",
        "Alert System"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/apache/derby/tree/trunk/java/testing/org/apache/derbyTesting/functionTests/tests/jdbc",
      concepts: [
        "Inventory Control",
        "Healthcare Data",
        "Alert Systems",
        "Transaction Security",
        "Reporting Tools"
      ],
      icon: "💊",
      databaseInfo: {
        primary: "Oracle Database (Inventory)",
        secondary: "MySQL (Patient Data)",
        audit: "Oracle (Prescription Logs)"
      }
    },
    {
      id: 15,
      title: "Vehicle Fleet Management",
      description: "Fleet management system with vehicle tracking, maintenance scheduling, and driver management using Oracle Database.",
      difficulty: "intermediate",
      features: [
        "Vehicle Tracking",
        "Maintenance Scheduling",
        "Driver Management",
        "Fuel Monitoring",
        "Route Planning",
        "Cost Analysis",
        "Service History",
        "Document Management"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/pgjdbc/pgjdbc/tree/master/pgjdbc/src/test/java/org/postgresql/test/jdbc",
      concepts: [
        "Asset Management",
        "Scheduling Systems",
        "Cost Tracking",
        "Route Optimization",
        "Maintenance Planning"
      ],
      icon: "🚗",
      databaseInfo: {
        primary: "Oracle Database (Fleet Data)",
        secondary: "MySQL (Driver Records)",
        maintenance: "Oracle (Service Logs)"
      }
    },
    {
      id: 16,
      title: "Event Management System",
      description: "Event planning and management system with venue booking, vendor management, and attendee tracking using Oracle Database.",
      difficulty: "intermediate",
      features: [
        "Event Planning",
        "Venue Management",
        "Vendor Coordination",
        "Budget Tracking",
        "Attendee Registration",
        "Schedule Management",
        "Resource Allocation",
        "Feedback System"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/MariaDB/mariadb-connector-j/tree/master/src/test/java/org/mariadb/jdbc/integration",
      concepts: [
        "Event Planning",
        "Resource Management",
        "Budget Control",
        "Registration System",
        "Feedback Analysis"
      ],
      icon: "🎪",
      databaseInfo: {
        primary: "Oracle Database (Events)",
        secondary: "MySQL (Attendee Data)",
        feedback: "Oracle (Survey Results)"
      }
    },
    {
      id: 17,
      title: "Warehouse Management System",
      description: "Comprehensive warehouse management solution with inventory tracking, order fulfillment, and logistics management using Oracle Database.",
      difficulty: "advanced",
      features: [
        "Inventory Control",
        "Order Processing",
        "Picking & Packing",
        "Shipping Management",
        "Stock Optimization",
        "Barcode Integration",
        "Location Tracking",
        "Report Generation"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/apache/commons-dbcp/tree/master/src/test/java/org/apache/commons/dbcp2/managed",
      concepts: [
        "Inventory Management",
        "Order Processing",
        "Location Tracking",
        "Logistics Planning",
        "Stock Control"
      ],
      icon: "🏭",
      databaseInfo: {
        primary: "Oracle Database (Inventory)",
        secondary: "MySQL (Orders)",
        tracking: "Oracle (Logistics Data)"
      }
    },
    {
      id: 18,
      title: "Fitness Center Management",
      description: "Gym management system with member tracking, equipment maintenance, and class scheduling using Oracle Database.",
      difficulty: "intermediate",
      features: [
        "Member Management",
        "Class Scheduling",
        "Equipment Tracking",
        "Trainer Allocation",
        "Attendance System",
        "Membership Billing",
        "Nutrition Planning",
        "Progress Tracking"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/apache/commons-pool/tree/master/src/test/java/org/apache/commons/pool2/impl",
      concepts: [
        "Member Management",
        "Schedule Planning",
        "Resource Allocation",
        "Progress Tracking",
        "Billing System"
      ],
      icon: "💪",
      databaseInfo: {
        primary: "Oracle Database (Members)",
        secondary: "MySQL (Classes)",
        tracking: "Oracle (Progress Data)"
      }
    },
    {
      id: 19,
      title: "Dental Clinic Management",
      description: "Dental practice management system with patient records, appointment scheduling, and treatment planning using Oracle Database.",
      difficulty: "intermediate",
      features: [
        "Patient Records",
        "Appointment Scheduling",
        "Treatment Planning",
        "Billing System",
        "Inventory Management",
        "Insurance Processing",
        "Digital Imaging",
        "Prescription Management"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/brettwooldridge/HikariCP/tree/dev/src/test/java/com/zaxxer/hikari/pool",
      concepts: [
        "Healthcare Records",
        "Appointment System",
        "Treatment Tracking",
        "Insurance Processing",
        "Patient Care"
      ],
      icon: "🦷",
      databaseInfo: {
        primary: "Oracle Database (Patient Records)",
        secondary: "MySQL (Appointments)",
        imaging: "Oracle (Dental Images)"
      }
    },
    {
      id: 20,
      title: "School Transport Management",
      description: "School transportation management system with route planning, vehicle tracking, and student management using Oracle Database.",
      difficulty: "intermediate",
      features: [
        "Route Planning",
        "Vehicle Tracking",
        "Student Management",
        "Driver Assignment",
        "Schedule Management",
        "Attendance Tracking",
        "Parent Notifications",
        "Cost Management"
      ],
      technologies: ["Java", "Oracle Database", "MySQL", "JDBC"],
      sourceCode: "https://github.com/apache/tomcat/tree/main/modules/jdbc-pool/src/test/java/org/apache/tomcat/jdbc/pool",
      concepts: [
        "Route Optimization",
        "Student Management",
        "Schedule Planning",
        "GPS Integration",
        "Safety Monitoring"
      ],
      icon: "🚌",
      databaseInfo: {
        primary: "Oracle Database (Routes)",
        secondary: "MySQL (Students)",
        tracking: "Oracle (Vehicle Data)"
      }
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

                {/* Database Information */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Database Architecture:</h4>
                  <div className="space-y-2">
                    {Object.entries(project.databaseInfo).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2 text-sm">
                        <span className="w-24 text-gray-500 capitalize">{key}:</span>
                        <span className="text-indigo-600 font-medium">{value}</span>
                      </div>
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
      </motion.div>
    </SharedLayout>
  );
} 