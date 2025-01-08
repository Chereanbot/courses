import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@remix-run/react';
import SharedLayout from '~/components/SharedLayout';
import { LoadingSpinner, ButtonLoader } from '~/components/LoadingSpinner';

interface Project {
  id: number;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  features: string[];
  technologies: string[];
  sourceCode: string;
  concepts: string[];
  icon: string;
  timeComplexity: string;
  spaceComplexity: string;
  category: string;
}

interface Translations {
  en: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    categoryAll: string;
    authRequired: string;
    authMessage: string;
    downloadSuccess: string;
    downloadError: string;
    invalidCode: string;
    codeRequired: string;
    downloadLimit: string;
    codeAlreadyUsed: string;
    helpSection: string;
    getCode: string;
    networkError: string;
    downloadStarted: string;
  };
  am: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    categoryAll: string;
    authRequired: string;
    authMessage: string;
    downloadSuccess: string;
    downloadError: string;
    invalidCode: string;
    codeRequired: string;
    downloadLimit: string;
    codeAlreadyUsed: string;
    helpSection: string;
    getCode: string;
    networkError: string;
    downloadStarted: string;
  };
}

interface DownloadCount {
  [key: string]: number;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export default function AlgorithmsProjects() {
  const [language, setLanguage] = useState<'en' | 'am'>('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [authCode, setAuthCode] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [downloadCount, setDownloadCount] = useState<DownloadCount>({});
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProjectId, setLoadingProjectId] = useState<number | null>(null);
  const MAX_DOWNLOADS = 3;

  const projectAuthCodes: { [key: string]: string[] } = {
    "Sorting Algorithms": ["DAA_SORT_2024", "SORT_ADV_101", "ALGO_SORT_24"],
    "Searching Algorithms": ["DAA_SEARCH_2024", "SEARCH_ADV_102", "ALGO_SEARCH_24"],
    "Dynamic Programming": ["DAA_DP_2024", "DP_ADV_103", "ALGO_DP_24"],
    "Graph Algorithms": ["DAA_GRAPH_2024", "GRAPH_ADV_104", "ALGO_GRAPH_24"],
    "Greedy Algorithms": ["DAA_GREEDY_2024", "GREEDY_ADV_105", "ALGO_GREEDY_24"],
    "Backtracking": ["DAA_BACK_2024", "BACK_ADV_106", "ALGO_BACK_24"],
    "String Algorithms": ["DAA_STR_2024", "STR_ADV_107", "ALGO_STR_24"],
    "Number Theory": ["DAA_NUM_2024", "NUM_ADV_108", "ALGO_NUM_24"],
    "Geometric Algorithms": ["DAA_GEO_2024", "GEO_ADV_109", "ALGO_GEO_24"],
    "Machine Learning": ["DAA_ML_2024", "ML_ADV_110", "ALGO_ML_24"]
  };

  const validateAuthCode = (code: string): boolean => {
    const patterns = [
      /^DAA_[A-Z]+_2024$/,           // Pattern for first type: DAA_NAME_2024
      /^[A-Z]+_ADV_\d{3}$/,         // Pattern for second type: NAME_ADV_101
      /^ALGO_[A-Z]+_24$/            // Pattern for third type: ALGO_NAME_24
    ];
    return patterns.some(pattern => pattern.test(code));
  };

  const addNotification = (type: "success" | "error" | "warning" | "info", messageKey: keyof Translations["en"]) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      message: translations[language][messageKey]
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const handleDownload = async (project: Project) => {
    setSelectedProject(project);
    setLoadingProjectId(project.id);
    setShowAuthModal(true);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoadingProjectId(null);
  };

  const handleAuthSubmit = async () => {
    if (!selectedProject || !authCode.trim()) {
      addNotification('error', 'codeRequired');
      return;
    }

    setIsLoading(true);

    try {
      // Check download limit
      const currentDownloads = downloadCount[selectedProject.title] || 0;
      if (currentDownloads >= MAX_DOWNLOADS) {
        addNotification('error', 'downloadLimit');
        return;
      }

      // Validate code format
      if (!validateAuthCode(authCode)) {
        addNotification('error', 'invalidCode');
        return;
      }

      // Check if code is valid for the project
      if (projectAuthCodes[selectedProject.title]?.includes(authCode)) {
        addNotification('info', 'downloadStarted');
        
        await fetch(selectedProject.sourceCode)
          .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.blob();
          })
          .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${selectedProject.title.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}.cpp`;
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

            const usedCodes = localStorage.getItem('usedAuthCodes') || '[]';
            const codes = JSON.parse(usedCodes);
            codes.push(authCode);
            localStorage.setItem('usedAuthCodes', JSON.stringify(codes));
          });
      } else {
        const usedCodes = JSON.parse(localStorage.getItem('usedAuthCodes') || '[]');
        if (usedCodes.includes(authCode)) {
          addNotification('error', 'codeAlreadyUsed');
        } else {
          addNotification('error', 'invalidCode');
        }
      }
    } catch (error) {
      console.error('Download failed:', error);
      addNotification('error', 'networkError');
    } finally {
      setIsLoading(false);
    }
  };

  const translations: Translations = {
    en: {
      title: "Data Analysis & Algorithms Projects",
      subtitle: "Explore advanced algorithms and their implementations",
      searchPlaceholder: "Search projects...",
      categoryAll: "All Categories",
      authRequired: "Authorization Required",
      authMessage: "Please enter the authorization code to download",
      downloadSuccess: "Download started successfully!",
      downloadError: "Download failed. Please try again.",
      invalidCode: "Invalid authorization code format or code not found.",
      codeRequired: "Authorization code is required.",
      downloadLimit: "Maximum download limit reached for this project.",
      codeAlreadyUsed: "This code has already been used.",
      helpSection: "Need help? Contact:",
      getCode: "Don't have a code?",
      networkError: "Network error occurred. Please try again.",
      downloadStarted: "Starting download...",
    },
    am: {
      title: "የዳታ ትንተና እና አልጎሪዝም ፕሮጀክቶች",
      subtitle: "የላቀ አልጎሪዝሞችን እና አተገባበራቸውን ያስሱ",
      searchPlaceholder: "ፕሮጀክቶችን ይፈልጉ...",
      categoryAll: "ሁሉም ምድቦች",
      authRequired: "ፈቃድ ያስፈልጋል",
      authMessage: "እባክዎ የፈቃድ ኮድ ያስገቡ",
      downloadSuccess: "ዳውንሎድ በተሳካ ሁኔታ ተጀምሯል!",
      downloadError: "ዳውንሎድ አልተሳካም። እባክዎ እንደገና ይሞክሩ።",
      invalidCode: "የተሳሳተ የፈቃድ ኮድ ቅርጸጸት ወይም ኮድ አልተገኘም።",
      codeRequired: "የፈቃድ ኮድ ያስፈልጋል።",
      downloadLimit: "ለዚህ ፕሮጀክት የዳውንሎድ ገደብ ደርሷል።",
      codeAlreadyUsed: "ይህ ኮድ አስቀድሞ ጥቅም ላይ ውሏል።",
      helpSection: "እርዳታ ይፈልጋሉ? ያግኙን:",
      getCode: "ኮድ የለዎትም?",
      networkError: "የአውታረ መረብ ስህተት ተከስቷል። እባክዎ እንደገና ይሞክሩ።",
      downloadStarted: "ዳውንሎድ እየጀመረ ነው...",
    }
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "Sorting Algorithms",
      description: "Comprehensive implementation of various sorting algorithms including Bubble Sort, Quick Sort, Merge Sort, and Heap Sort with performance analysis.",
      difficulty: "intermediate",
      features: [
        "Multiple sorting implementations",
        "Performance comparison",
        "Visualization helpers",
        "Custom input handling",
        "Array generators"
      ],
      technologies: ["C++", "STL", "Algorithms"],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/sorting",
      concepts: [
        "Comparison-based sorting",
        "Divide and conquer",
        "In-place sorting",
        "Stable sorting"
      ],
      icon: "🔄",
      timeComplexity: "O(n log n) - O(n²)",
      spaceComplexity: "O(1) - O(n)",
      category: "Sorting"
    },
    {
      id: 2,
      title: "Searching Algorithms",
      description: "Collection of searching algorithms including Binary Search, Linear Search, Jump Search, and Interpolation Search with complexity analysis.",
      difficulty: "beginner",
      features: [
        "Multiple search techniques",
        "Iterative and recursive implementations",
        "Performance metrics",
        "Test case generator",
        "Visualization tools"
      ],
      technologies: ["C++", "STL", "Algorithms"],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/search",
      concepts: [
        "Binary search",
        "Sequential search",
        "Jump search",
        "Interpolation search"
      ],
      icon: "🔍",
      timeComplexity: "O(1) - O(n)",
      spaceComplexity: "O(1)",
      category: "Searching"
    },
    {
      id: 3,
      title: "Dynamic Programming",
      description: "Advanced dynamic programming solutions including Knapsack, LCS, Matrix Chain Multiplication, and Fibonacci with memoization.",
      difficulty: "advanced",
      features: [
        "Memoization techniques",
        "Tabulation methods",
        "Space optimization",
        "Problem variations",
        "Performance analysis"
      ],
      technologies: ["C++", "STL", "Algorithms"],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/dynamic_programming",
      concepts: [
        "Optimal substructure",
        "Overlapping subproblems",
        "State transitions",
        "Space optimization"
      ],
      icon: "📊",
      timeComplexity: "Problem specific",
      spaceComplexity: "O(n) - O(n²)",
      category: "Dynamic Programming"
    },
    {
      id: 4,
      title: "Graph Algorithms",
      description: "Implementation of graph algorithms including DFS, BFS, Dijkstra's, and Bellman-Ford with practical applications.",
      difficulty: "advanced",
      features: [
        "Multiple graph representations",
        "Path finding algorithms",
        "Cycle detection",
        "Topological sorting",
        "MST algorithms"
      ],
      technologies: ["C++", "STL", "Algorithms"],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/graph",
      concepts: [
        "Graph traversal",
        "Shortest paths",
        "Minimum spanning trees",
        "Network flow"
      ],
      icon: "🕸️",
      timeComplexity: "O(V + E) - O(V²)",
      spaceComplexity: "O(V + E)",
      category: "Graph Algorithms"
    },
    {
      id: 5,
      title: "Greedy Algorithms",
      description: "Collection of greedy algorithms including Activity Selection, Huffman Coding, and Fractional Knapsack.",
      difficulty: "intermediate",
      features: [
        "Multiple problem solutions",
        "Optimization techniques",
        "Proof of correctness",
        "Comparative analysis",
        "Test cases"
      ],
      technologies: ["C++", "STL", "Algorithms"],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/greedy_algorithms",
      concepts: [
        "Local optimization",
        "Global optimization",
        "Activity scheduling",
        "Huffman coding"
      ],
      icon: "💡",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      category: "Greedy Algorithms"
    },
    {
      id: 6,
      title: "Backtracking Algorithms",
      description: "Implementation of backtracking algorithms including N-Queens, Sudoku Solver, and Hamiltonian Path with visualization.",
      difficulty: "advanced",
      features: [
        "Multiple problem solutions",
        "Visualization tools",
        "Step-by-step execution",
        "Performance analysis",
        "Test case generator"
      ],
      technologies: ["C++", "STL", "Algorithms"],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/backtracking",
      concepts: [
        "State space tree",
        "Constraint satisfaction",
        "Pruning techniques",
        "Solution verification"
      ],
      icon: "🔄",
      timeComplexity: "O(b^d)",
      spaceComplexity: "O(d)",
      category: "Backtracking"
    },
    {
      id: 7,
      title: "String Algorithms",
      description: "Collection of string manipulation algorithms including Pattern Matching, String Hashing, and Suffix Arrays.",
      difficulty: "intermediate",
      features: [
        "Pattern matching",
        "String hashing",
        "Suffix structures",
        "Text processing",
        "Performance metrics"
      ],
      technologies: ["C++", "STL", "Algorithms"],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/strings",
      concepts: [
        "Pattern matching",
        "String hashing",
        "Suffix arrays",
        "Text processing"
      ],
      icon: "📝",
      timeComplexity: "O(n + m)",
      spaceComplexity: "O(n)",
      category: "String Algorithms"
    },
    {
      id: 8,
      title: "Number Theory",
      description: "Advanced number theory algorithms including Prime Generation, GCD, Extended Euclidean, and Modular Arithmetic.",
      difficulty: "advanced",
      features: [
        "Prime number operations",
        "GCD calculations",
        "Modular arithmetic",
        "Number properties",
        "Optimization techniques"
      ],
      technologies: ["C++", "STL", "Algorithms"],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/math",
      concepts: [
        "Prime numbers",
        "GCD and LCM",
        "Modular arithmetic",
        "Number properties"
      ],
      icon: "🔢",
      timeComplexity: "O(log n) - O(n log log n)",
      spaceComplexity: "O(1) - O(n)",
      category: "Number Theory"
    },
    {
      id: 9,
      title: "Geometric Algorithms",
      description: "Implementation of geometric algorithms including Convex Hull, Line Intersection, and Point Location.",
      difficulty: "advanced",
      features: [
        "Geometric calculations",
        "Shape processing",
        "Intersection detection",
        "Area computation",
        "Visualization tools"
      ],
      technologies: ["C++", "STL", "Algorithms"],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/geometry",
      concepts: [
        "Convex hull",
        "Line intersection",
        "Point location",
        "Geometric primitives"
      ],
      icon: "📐",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      category: "Geometric Algorithms"
    },
    {
      id: 10,
      title: "Machine Learning Algorithms",
      description: "Basic machine learning algorithms implemented from scratch including Linear Regression, K-Means, and Neural Networks.",
      difficulty: "advanced",
      features: [
        "ML implementations",
        "Data preprocessing",
        "Model training",
        "Performance evaluation",
        "Visualization tools"
      ],
      technologies: ["C++", "STL", "Algorithms"],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/machine_learning",
      concepts: [
        "Linear regression",
        "Clustering",
        "Neural networks",
        "Model evaluation"
      ],
      icon: "🤖",
      timeComplexity: "Algorithm specific",
      spaceComplexity: "O(n) - O(n²)",
      category: "Machine Learning"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || project.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <SharedLayout>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <LoadingSpinner />
          </motion.div>
        )}
      </AnimatePresence>

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
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-blue-700">
            {translations[language].title}
          </h1>
          <p className="text-xl text-gray-700">
            {translations[language].subtitle}
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder={translations[language].searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <div className="flex gap-4">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{translations[language].categoryAll}</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{translations[language].categoryAll}</option>
              <option value="Sorting">Sorting</option>
              <option value="Searching">Searching</option>
              <option value="Dynamic Programming">Dynamic Programming</option>
              <option value="Graph Algorithms">Graph Algorithms</option>
              <option value="Greedy Algorithms">Greedy Algorithms</option>
              <option value="Backtracking">Backtracking</option>
              <option value="String Algorithms">String Algorithms</option>
              <option value="Number Theory">Number Theory</option>
              <option value="Geometric Algorithms">Geometric Algorithms</option>
              <option value="Machine Learning">Machine Learning</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{project.icon}</span>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    project.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-blue-800 hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-700 mb-4">{project.description}</p>

                {/* Complexity Information */}
                <div className="mb-4 space-y-2 bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">Time:</span>
                    <span className="text-blue-700 font-mono">{project.timeComplexity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium">Space:</span>
                    <span className="text-blue-700 font-mono">{project.spaceComplexity}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Concepts */}
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Key Concepts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.concepts.map((concept, index) => (
                      <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-sm font-medium">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                  <motion.button
                    onClick={() => handleDownload(project)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold flex items-center justify-center"
                    disabled={loadingProjectId === project.id}
                  >
                    {loadingProjectId === project.id ? (
                      <ButtonLoader />
                    ) : (
                      'Download Source Code'
                    )}
                  </motion.button>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1"
                  >
                    <Link
                      to={`/algorithms/${project.id}`}
                      className="block bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 text-center font-semibold"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Authorization Modal */}
        <AnimatePresence>
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
                
                <input
                  type="text"
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value.toUpperCase())}
                  placeholder="Enter authorization code"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-4"
                />

                {/* Help Section */}
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <h3 className="font-semibold mb-2">{translations[language].helpSection}</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📧 Email: cscher331@gmail.com</p>
                    <p>📱 Phone: +251947006269</p>
                    <p>💬 Telegram: @https://t.me/Mahiyenewudi</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    onClick={handleAuthSubmit}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold flex items-center justify-center"
                  >
                    {isLoading ? <ButtonLoader /> : 'Download'}
                  </motion.button>
                  <motion.button
                    onClick={() => setShowAuthModal(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-all duration-300 font-semibold"
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </SharedLayout>
  );
} 