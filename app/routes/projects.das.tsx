import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@remix-run/react';
import SharedLayout from '~/components/SharedLayout';
import { LoadingSpinner, ButtonLoader, GridSkeleton } from '~/components/LoadingSpinner';
import { useDataLoadingState, useInitialLoadingState } from '~/utils/loaders';

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

interface DownloadCount {
  [key: string]: number;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
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

const projects: Project[] = [
  {
    id: 1,
    title: "Array Operations Library",
    description: "A comprehensive library for array operations including dynamic arrays, sorting, searching, and array manipulation algorithms.",
    difficulty: "beginner",
    features: [
      "Dynamic array implementation",
      "Array manipulation operations",
      "Sorting algorithms",
      "Search operations",
      "Memory management"
    ],
    technologies: ["C++", "Data Structures", "Algorithms"],
    sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/array",
    concepts: [
      "Array traversal",
      "Memory allocation",
      "Pointer arithmetic",
      "Array indexing"
    ],
    icon: "📊",
    timeComplexity: "O(1) - O(n)",
    spaceComplexity: "O(n)",
    category: "Arrays"
  },
  {
    id: 2,
    title: "Stack Implementation",
    description: "A template-based stack implementation with various operations and applications.",
    difficulty: "beginner",
    features: [
      "Template-based implementation",
      "Basic stack operations",
      "Expression evaluation",
      "Parentheses matching",
      "Stack applications"
    ],
    technologies: ["C++", "Data Structures", "Templates"],
    sourceCode: "https://github.com/TheAlgorithms/C-Plus-Plus/tree/master/data_structures/stack",
    concepts: [
      "LIFO principle",
      "Stack operations",
      "Memory management",
      "Template classes"
    ],
    icon: "📚",
    timeComplexity: "O(1)",
    spaceComplexity: "O(n)",
    category: "Stacks"
  }
];

export default function DataStructuresProjects() {
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
  
  const isDataLoading = useDataLoadingState();
  const isInitialLoad = useInitialLoadingState();
  const MAX_DOWNLOADS = 3;

  const translations: Translations = {
    en: {
      title: "Data Structures Projects",
      subtitle: "Explore fundamental data structures implementations",
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
      title: "የዳታ መዋቅር ፕሮጀክቶች",
      subtitle: "መሰረታዊ የዳታ መዋቅሮችን ይዳስሱ",
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

  const handleDownload = async (project: Project) => {
    setSelectedProject(project);
    setLoadingProjectId(project.id);
    setShowAuthModal(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setLoadingProjectId(null);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || project.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  // ... rest of the component code ...
} 