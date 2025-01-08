import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  features: string[];
  concepts: string[];
  sourceCode: string;
  icon: string;
  implementations: {
    header: string;
    source: string;
    test: string;
  };
}

interface Notification {
  id: number;
  type: "success" | "error" | "info";
  message: string;
}

interface Translations {
  [key: string]: {
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
    helpSection: string;
    getCode: string;
  };
}

export default function DataStructureProjects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [authCode, setAuthCode] = useState("");
  const [language, setLanguage] = useState<"en" | "am">("en");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const translations: Translations = {
    en: {
      title: "Data Structures Projects in C++",
      subtitle: "Explore implementations of fundamental data structures",
      searchPlaceholder: "Search projects...",
      categoryAll: "All Categories",
      authRequired: "Authorization Required",
      authMessage: "Please enter the authorization code to download",
      downloadSuccess: "Download started successfully!",
      downloadError: "Download failed. Please try again.",
      invalidCode: "Invalid authorization code.",
      codeRequired: "Authorization code is required.",
      helpSection: "Need help? Contact:",
      getCode: "Don't have a code?",
    },
    am: {
      title: "የዳታ መዋቅር ፕሮጀክቶች በC++",
      subtitle: "የመሰረታዊ ዳታ መዋቅሮችን ትግበራ ያስሱ",
      searchPlaceholder: "ፕሮጀክቶችን ይፈልጉ...",
      categoryAll: "ሁሉም ምድቦች",
      authRequired: "ፈቃድ ያስፈልጋል",
      authMessage: "እባክዎ የፈቃድ ኮድ ያስገቡ",
      downloadSuccess: "ダウンロードが正常に開始されました！",
      downloadError: "ダウンロードに失敗しました。もう一度お試しください。",
      invalidCode: "የተሳሳተ የፈቃድ ኮድ።",
      codeRequired: "የፈቃድ ኮድ ያስፈልጋል።",
      helpSection: "እርዳታ ይፈልጋሉ? ያግኙን:",
      getCode: "ኮድ የለዎትም?",
    },
  };

  const addNotification = (type: "success" | "error" | "info", messageKey: keyof Translations["en"]) => {
    const id = Date.now();
    const message = translations[language][messageKey];
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const handleDownload = (project: Project) => {
    setSelectedProject(project);
    setShowAuthModal(true);
  };

  const projects: Project[] = [
    {
      id: 1,
      title: "Array Operations Library",
      category: "array",
      description: "Comprehensive C++ library for array operations including sorting, searching, and dynamic array implementation using pointers.",
      difficulty: "beginner",
      features: [
        "Dynamic Array Implementation",
        "Binary Search",
        "Bubble, Selection, Insertion Sorts",
        "Array Rotation",
        "Subarray Operations",
        "Memory Management",
        "Iterator Implementation",
        "Custom Exception Handling"
      ],
      concepts: [
        "Pointer Arithmetic",
        "Memory Allocation",
        "Template Classes",
        "Iterator Pattern",
        "Exception Handling"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/array",
      icon: "📊",
      implementations: {
        header: "array_operations.h",
        source: "array_operations.cpp",
        test: "array_test.cpp"
      }
    },
    {
      id: 2,
      title: "Stack Implementation",
      category: "stack",
      description: "Stack data structure implementation with templates and dynamic memory allocation using pointers.",
      difficulty: "intermediate",
      features: [
        "Template Stack Class",
        "Dynamic Size Management",
        "Push/Pop Operations",
        "Stack Overflow Protection",
        "Memory Leak Prevention",
        "Custom Iterators",
        "STL Compatibility",
        "Exception Safety"
      ],
      concepts: [
        "LIFO Principle",
        "Dynamic Memory",
        "Template Programming",
        "Copy Semantics",
        "Move Semantics"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/stack",
      icon: "📚",
      implementations: {
        header: "stack.h",
        source: "stack.cpp",
        test: "stack_test.cpp"
      }
    },
    {
      id: 3,
      title: "Queue Data Structure",
      category: "queue",
      description: "Queue implementation with circular buffer and dynamic resizing using pointer manipulation.",
      difficulty: "intermediate",
      features: [
        "Circular Queue",
        "Dynamic Resizing",
        "Priority Queue",
        "Double-ended Queue",
        "Thread Safety",
        "Iterator Support",
        "STL Container Compliance",
        "Exception Handling"
      ],
      concepts: [
        "FIFO Principle",
        "Circular Buffer",
        "Dynamic Memory",
        "Thread Safety",
        "Iterator Design"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/queue",
      icon: "🔄",
      implementations: {
        header: "queue.h",
        source: "queue.cpp",
        test: "queue_test.cpp"
      }
    },
    {
      id: 4,
      title: "Linked List Collection",
      category: "linked_list",
      description: "Comprehensive linked list implementations including singly, doubly, and circular linked lists using pointers.",
      difficulty: "intermediate",
      features: [
        "Singly Linked List",
        "Doubly Linked List",
        "Circular Linked List",
        "List Operations",
        "Memory Management",
        "Iterator Support",
        "Merge Operations",
        "Cycle Detection"
      ],
      concepts: [
        "Pointer Manipulation",
        "Memory Management",
        "Node Structures",
        "List Traversal",
        "Cycle Handling"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/linked_list",
      icon: "🔗",
      implementations: {
        header: "linked_list.h",
        source: "linked_list.cpp",
        test: "list_test.cpp"
      }
    },
    {
      id: 5,
      title: "Binary Search Tree",
      category: "tree",
      description: "Binary search tree implementation with balancing and traversal algorithms using pointer-based nodes.",
      difficulty: "advanced",
      features: [
        "BST Operations",
        "Tree Balancing",
        "Tree Traversals",
        "Height Calculation",
        "Subtree Operations",
        "Memory Management",
        "Iterator Support",
        "Serialization"
      ],
      concepts: [
        "Tree Structures",
        "Recursive Operations",
        "Balancing Algorithms",
        "Memory Management",
        "Iterator Pattern"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/binary_search_tree",
      icon: "🌳",
      implementations: {
        header: "bst.h",
        source: "bst.cpp",
        test: "bst_test.cpp"
      }
    },
    {
      id: 6,
      title: "AVL Tree Implementation",
      category: "tree",
      description: "Self-balancing AVL tree implementation with automatic rebalancing and traversal algorithms using pointer manipulation.",
      difficulty: "advanced",
      features: [
        "AVL Tree Operations",
        "Auto-balancing Logic",
        "Tree Rotations",
        "Height Balancing",
        "Node Deletion",
        "Tree Traversals",
        "Memory Management",
        "Balance Factor"
      ],
      concepts: [
        "Tree Balancing",
        "Rotation Algorithms",
        "Height Calculation",
        "Memory Management",
        "Recursive Operations"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/avl_tree",
      icon: "🌲",
      implementations: {
        header: "avl_tree.h",
        source: "avl_tree.cpp",
        test: "avl_test.cpp"
      }
    },
    {
      id: 7,
      title: "Hash Table Implementation",
      category: "hash",
      description: "Hash table implementation with collision resolution using chaining and open addressing techniques.",
      difficulty: "intermediate",
      features: [
        "Hash Functions",
        "Collision Resolution",
        "Dynamic Resizing",
        "Load Factor",
        "Chaining Method",
        "Open Addressing",
        "Iterator Support",
        "Exception Handling"
      ],
      concepts: [
        "Hashing Techniques",
        "Collision Handling",
        "Dynamic Memory",
        "Load Balancing",
        "Iterator Design"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/hash_table",
      icon: "🔑",
      implementations: {
        header: "hash_table.h",
        source: "hash_table.cpp",
        test: "hash_test.cpp"
      }
    },
    {
      id: 8,
      title: "Heap Data Structure",
      category: "heap",
      description: "Binary heap implementation with min and max heap variants using array-based representation.",
      difficulty: "intermediate",
      features: [
        "Min/Max Heap",
        "Heapify Operations",
        "Priority Queue",
        "Array Implementation",
        "Heap Sort",
        "Memory Efficiency",
        "Index Management",
        "Exception Safety"
      ],
      concepts: [
        "Heap Property",
        "Array Representation",
        "Priority Queues",
        "Sorting Algorithms",
        "Complete Trees"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/heap",
      icon: "📊",
      implementations: {
        header: "heap.h",
        source: "heap.cpp",
        test: "heap_test.cpp"
      }
    },
    {
      id: 9,
      title: "Trie Data Structure",
      category: "trie",
      description: "Trie implementation for efficient string operations and prefix matching using pointer-based nodes.",
      difficulty: "advanced",
      features: [
        "String Operations",
        "Prefix Matching",
        "Word Insertion",
        "Pattern Search",
        "Memory Optimization",
        "Character Mapping",
        "Deletion Support",
        "Traversal Methods"
      ],
      concepts: [
        "Tree Structures",
        "String Processing",
        "Pattern Matching",
        "Memory Management",
        "Character Arrays"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/trie",
      icon: "📝",
      implementations: {
        header: "trie.h",
        source: "trie.cpp",
        test: "trie_test.cpp"
      }
    },
    {
      id: 10,
      title: "Graph Data Structure",
      category: "graph",
      description: "Graph implementation with adjacency list and matrix representations using pointer-based structures.",
      difficulty: "advanced",
      features: [
        "Graph Representations",
        "DFS/BFS Traversal",
        "Shortest Path",
        "Connected Components",
        "Cycle Detection",
        "Edge Operations",
        "Vertex Management",
        "Graph Algorithms"
      ],
      concepts: [
        "Graph Theory",
        "Adjacency Lists",
        "Matrix Operations",
        "Path Finding",
        "Memory Efficiency"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/graph",
      icon: "🕸️",
      implementations: {
        header: "graph.h",
        source: "graph.cpp",
        test: "graph_test.cpp"
      }
    },
    {
      id: 11,
      title: "Red-Black Tree",
      category: "tree",
      description: "Self-balancing red-black tree implementation with color-based balancing using pointer manipulation.",
      difficulty: "advanced",
      features: [
        "Color Properties",
        "Tree Rotations",
        "Balancing Rules",
        "Node Coloring",
        "Insertion/Deletion",
        "Tree Traversal",
        "Memory Management",
        "Balance Verification"
      ],
      concepts: [
        "Color Properties",
        "Tree Balancing",
        "Rotation Logic",
        "Memory Management",
        "Tree Invariants"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/red_black_tree",
      icon: "🔴",
      implementations: {
        header: "rb_tree.h",
        source: "rb_tree.cpp",
        test: "rb_test.cpp"
      }
    },
    {
      id: 12,
      title: "Skip List",
      category: "list",
      description: "Probabilistic data structure implementation with multiple layers for faster search operations.",
      difficulty: "advanced",
      features: [
        "Multi-level Structure",
        "Probabilistic Balance",
        "Fast Search",
        "Dynamic Insertion",
        "Memory Optimization",
        "Level Management",
        "Iterator Support",
        "Performance Analysis"
      ],
      concepts: [
        "Probabilistic DS",
        "Multi-level Design",
        "Search Optimization",
        "Memory Management",
        "Performance Tuning"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/skip_list",
      icon: "⚡",
      implementations: {
        header: "skip_list.h",
        source: "skip_list.cpp",
        test: "skip_test.cpp"
      }
    },
    {
      id: 13,
      title: "B-Tree Implementation",
      category: "tree",
      description: "Multi-way search tree implementation optimized for disk operations and large datasets.",
      difficulty: "advanced",
      features: [
        "Multi-way Nodes",
        "Disk I/O Optimization",
        "Tree Balance",
        "Split Operations",
        "Merge Operations",
        "Search Efficiency",
        "Memory Management",
        "Large Dataset Handling"
      ],
      concepts: [
        "Multi-way Trees",
        "Disk Operations",
        "Balance Maintenance",
        "Memory Management",
        "Search Algorithms"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/b_tree",
      icon: "💾",
      implementations: {
        header: "btree.h",
        source: "btree.cpp",
        test: "btree_test.cpp"
      }
    },
    {
      id: 14,
      title: "Segment Tree",
      category: "tree",
      description: "Efficient tree data structure for range queries and updates using array representation.",
      difficulty: "intermediate",
      features: [
        "Range Queries",
        "Lazy Propagation",
        "Array Representation",
        "Update Operations",
        "Query Optimization",
        "Memory Efficiency",
        "Range Updates",
        "Interval Operations"
      ],
      concepts: [
        "Range Operations",
        "Tree Structure",
        "Lazy Updates",
        "Memory Management",
        "Query Processing"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/segment_tree",
      icon: "📊",
      implementations: {
        header: "segment_tree.h",
        source: "segment_tree.cpp",
        test: "segment_test.cpp"
      }
    },
    {
      id: 15,
      title: "Disjoint Set",
      category: "set",
      description: "Union-find data structure implementation with path compression and union by rank.",
      difficulty: "intermediate",
      features: [
        "Union Operations",
        "Find Operations",
        "Path Compression",
        "Rank Optimization",
        "Set Management",
        "Component Tracking",
        "Memory Efficiency",
        "Operation Analysis"
      ],
      concepts: [
        "Set Operations",
        "Path Compression",
        "Union by Rank",
        "Memory Management",
        "Performance Analysis"
      ],
      sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/disjoint_set",
      icon: "🔗",
      implementations: {
        header: "disjoint_set.h",
        source: "disjoint_set.cpp",
        test: "disjoint_test.cpp"
      }
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <SharedLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
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
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {translations[language].title}
          </h1>
          <p className="text-xl text-gray-600">
            {translations[language].subtitle}
          </p>
        </motion.div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder={translations[language].searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="all">{translations[language].categoryAll}</option>
            <option value="array">Arrays</option>
            <option value="stack">Stacks</option>
            <option value="queue">Queues</option>
            <option value="linked_list">Linked Lists</option>
            <option value="tree">Trees</option>
          </select>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{project.icon}</span>
                  <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    project.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                    project.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Features:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {project.features.slice(0, 4).map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Concepts:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.concepts.map((concept, index) => (
                      <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-sm">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Implementation Files:</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    {Object.entries(project.implementations).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-gray-500">{key}:</span>
                        <span className="font-mono text-indigo-600">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleDownload(project)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
                  >
                    Download
                  </button>
                  <Link
                    to={`/projects/ds/${project.id}`}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg text-center hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </motion.div>
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
              
              <input
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                placeholder="Enter authorization code"
                className="w-full p-2 border rounded-lg mb-4"
              />
              
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    if (!authCode.trim()) {
                      addNotification('error', 'codeRequired');
                      return;
                    }
                    // Add your authorization logic here
                    setShowAuthModal(false);
                    addNotification('success', 'downloadSuccess');
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 rounded-lg"
                >
                  Download
                </button>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p className="font-semibold mb-2">{translations[language].helpSection}</p>
                <ul className="space-y-1">
                  <li>📧 Email: cscher331@gmail.com</li>
                  <li>📱 Phone: +251947006269</li>
                  <li>💬 Telegram: @https://t.me/Mahiyenewudi</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Notifications */}
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
                  'bg-blue-500 text-white'
                }`}
              >
                {notification.message}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </SharedLayout>
  );
}
