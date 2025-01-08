import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/remix";

export default function Survey() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false);
  const [formData, setFormData] = useState({
    // Academic Information
    academicYear: "",
    academicSemester: "",
    department: "",
    studentId: "",
    
    // Programming Background
    programmingExperience: "",
    preferredLanguages: [] as string[],
    priorCodingExperience: "",
    
    // Learning Goals & Preferences
    learningGoals: [] as string[],
    studyTime: "",
    interests: [] as string[],
    preferredLearningStyle: [] as string[],
    projectPreferences: [] as string[],
    
    // Academic Background
    educationLevel: "",
    majorSubjects: [] as string[],
    gpa: "",
    relevantCourses: [] as string[],
    
    // Career & Future Plans
    careerGoals: "",
    industryPreference: "",
    workPreference: "",
    internshipInterest: false,
    
    // Technical Interests
    specializationInterests: [] as string[],
    toolsAndTechnologies: [] as string[],
    challengeLevel: "",
    
    // Additional Information
    background: "",
    certificationInterest: "",
    mentorshipInterest: "",
    groupWorkPreference: "",
  });

  const programmingLanguages = [
    "Python",
    "JavaScript",
    "Java",
    "C++",
    "C#",
    "Ruby",
    "PHP",
    "Swift",
    "Go",
    "Rust",
    "TypeScript",
    "Kotlin"
  ];

  useEffect(() => {
    // Check system preference for dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Show completion overlay instead of immediate redirect
      setShowCompletionOverlay(true);
      // Redirect to dashboard after 5 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 5000);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Animation classes based on step transition
  const getAnimationClass = (step: number) => {
    if (step === currentStep) {
      return "animate-fade-in-up";
    }
    return "opacity-0";
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const specializationOptions = [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Mobile Development",
    "Cloud Computing",
    "Cybersecurity",
    "Data Science",
    "IoT",
    "Blockchain",
    "Game Development",
    "DevOps",
    "UI/UX Design",
  ];

  const academicYears = ["First Year", "Second Year", "Third Year", "Fourth Year", "Fifth Year"];
  const semesters = ["First Semester", "Second Semester", "Summer Semester"];
  const departments = [
    "Computer Science",
    "Software Engineering",
    "Information Technology",
    "Computer Engineering",
    "Data Science",
    "Cybersecurity",
  ];

  return (
    <>
      <SignedIn>
        <div className={`min-h-screen transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
            : 'bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50'
        }`}>
          {/* Completion Overlay */}
          {showCompletionOverlay && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className={`max-w-2xl w-full mx-4 ${
                isDarkMode 
                  ? 'bg-gray-800' 
                  : 'bg-white'
                } rounded-2xl p-8 shadow-2xl transform animate-scale-up`}>
                <div className="text-center mb-8">
                  <div className="text-5xl mb-4 animate-bounce-slow">🎓</div>
                  <h2 className={`text-3xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Welcome, {user?.firstName}!
                  </h2>
                  <p className={`text-lg ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    Your learning journey begins here
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Academic Info */}
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-indigo-50'
                  }`}>
                    <p className={`text-lg font-medium ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      You are enrolled in:
                    </p>
                    <div className="mt-2">
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        {formData.academicYear} • {formData.academicSemester}
                      </p>
                      <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                        Department of {formData.department}
                      </p>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={`p-4 rounded-lg text-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
                    }`}>
                      <div className={`text-2xl font-bold mb-1 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>7</div>
                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>Courses</div>
                    </div>
                    <div className={`p-4 rounded-lg text-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-purple-50'
                    }`}>
                      <div className={`text-2xl font-bold mb-1 ${
                        isDarkMode ? 'text-purple-400' : 'text-purple-600'
                      }`}>3</div>
                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>Lab Sections</div>
                    </div>
                    <div className={`p-4 rounded-lg text-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-indigo-50'
                    }`}>
                      <div className={`text-2xl font-bold mb-1 ${
                        isDarkMode ? 'text-indigo-400' : 'text-indigo-600'
                      }`}>7</div>
                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>Assignments</div>
                    </div>
                    <div className={`p-4 rounded-lg text-center ${
                      isDarkMode ? 'bg-gray-700' : 'bg-pink-50'
                    }`}>
                      <div className={`text-2xl font-bold mb-1 ${
                        isDarkMode ? 'text-pink-400' : 'text-pink-600'
                      }`}>12</div>
                      <div className={`text-sm ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>Video Lessons</div>
                    </div>
                  </div>

                  {/* Learning Resources */}
                  <div className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-green-50'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-800'
                        }`}>Learning Materials</p>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>8 Documents Available</p>
                      </div>
                      <div className="text-2xl animate-pulse">📚</div>
                    </div>
                  </div>

                  <p className={`text-center text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    Redirecting to your dashboard in a few seconds...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`fixed top-4 right-4 p-2 rounded-full transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-white text-gray-800'
            } hover:scale-110 transform`}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </button>

          {/* Welcome Message */}
          <div className="text-center pt-8 pb-4">
            <h1 className={`text-3xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            } mb-2`}>
              Welcome to Your Learning Journey, {user?.firstName}! 🎓
            </h1>
            <p className={`text-lg ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Let's customize your learning experience
            </p>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <div
                    key={step}
                    className={`w-1/6 text-center ${
                      step === currentStep 
                        ? `${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-medium scale-110 transition-all duration-300` 
                        : `${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`
                    }`}
                  >
                    Step {step}
                  </div>
                ))}
              </div>
              <div className={`h-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                <div
                  className={`h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full transition-all duration-500 ease-out ${
                    isDarkMode ? 'animate-pulse-slow' : 'animate-pulse'
                  }`}
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Survey Card */}
            <div className={`backdrop-blur-lg rounded-2xl shadow-xl p-8 transition-all duration-500 ${
              isDarkMode 
                ? 'bg-gray-800/50 shadow-gray-900/50' 
                : 'bg-white/70 shadow-gray-200/50'
            }`}>
              {/* Step 1: Academic Information */}
              {currentStep === 1 && (
                <div className={`space-y-6 ${getAnimationClass(1)}`}>
                  <h2 className={`text-2xl font-bold ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                  }`}>
                    Academic Information
                  </h2>
                  <div className="space-y-4">
                    <label className="block">
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        Academic Year
                      </span>
                      <select
                        className={`mt-1 block w-full rounded-lg shadow-sm focus:ring focus:ring-opacity-50 transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-400 focus:ring-blue-400' 
                            : 'border-gray-300 focus:border-indigo-300 focus:ring-indigo-200'
                        }`}
                        value={formData.academicYear}
                        onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                      >
                        <option value="">Select your academic year</option>
                        {academicYears.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        Academic Semester
                      </span>
                      <select
                        className={`mt-1 block w-full rounded-lg shadow-sm focus:ring focus:ring-opacity-50 transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-400 focus:ring-blue-400' 
                            : 'border-gray-300 focus:border-indigo-300 focus:ring-indigo-200'
                        }`}
                        value={formData.academicSemester}
                        onChange={(e) => setFormData({ ...formData, academicSemester: e.target.value })}
                      >
                        <option value="">Select your semester</option>
                        {semesters.map((semester) => (
                          <option key={semester} value={semester}>{semester}</option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        Department
                      </span>
                      <select
                        className={`mt-1 block w-full rounded-lg shadow-sm focus:ring focus:ring-opacity-50 transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-400 focus:ring-blue-400' 
                            : 'border-gray-300 focus:border-indigo-300 focus:ring-indigo-200'
                        }`}
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      >
                        <option value="">Select your department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        Student ID
                      </span>
                      <input
                        type="text"
                        className={`mt-1 block w-full rounded-lg shadow-sm focus:ring focus:ring-opacity-50 transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-gray-200 focus:border-blue-400 focus:ring-blue-400' 
                            : 'border-gray-300 focus:border-indigo-300 focus:ring-indigo-200'
                        }`}
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        placeholder="Enter your student ID"
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Step 2: Programming Background */}
              {currentStep === 2 && (
                <div className={`space-y-6 ${getAnimationClass(2)}`}>
                  <h2 className={`text-2xl font-bold ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                  }`}>
                    Programming Background
                  </h2>
                  <div className="space-y-4">
                    <label className="block">
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        Do you have any prior programming experience?
                      </span>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className={`rounded ${
                              isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-blue-400' 
                                : 'border-gray-300 text-indigo-600'
                            } shadow-sm focus:ring focus:ring-opacity-50`}
                            checked={formData.programmingExperience === "Yes"}
                            onChange={(e) => setFormData({ ...formData, programmingExperience: e.target.value })}
                            value="Yes"
                          />
                          <span className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            Yes
                          </span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            className={`rounded ${
                              isDarkMode 
                                ? 'bg-gray-700 border-gray-600 text-blue-400' 
                                : 'border-gray-300 text-indigo-600'
                            } shadow-sm focus:ring focus:ring-opacity-50`}
                            checked={formData.programmingExperience === "No"}
                            onChange={(e) => setFormData({ ...formData, programmingExperience: e.target.value })}
                            value="No"
                          />
                          <span className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            No
                          </span>
                        </label>
                      </div>
                    </label>

                    <label className="block">
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        What are your preferred programming languages?
                      </span>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        {programmingLanguages.map((language) => (
                          <label key={language} className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className={`rounded ${
                                isDarkMode 
                                  ? 'bg-gray-700 border-gray-600 text-blue-400' 
                                  : 'border-gray-300 text-indigo-600'
                              } shadow-sm focus:ring focus:ring-opacity-50`}
                              checked={formData.preferredLanguages.includes(language)}
                              onChange={(e) => {
                                const languages = e.target.checked
                                  ? [...formData.preferredLanguages, language]
                                  : formData.preferredLanguages.filter(l => l !== language);
                                setFormData({ ...formData, preferredLanguages: languages });
                              }}
                            />
                            <span className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {language}
                            </span>
                          </label>
                        ))}
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Learning Goals & Preferences */}
              {currentStep === 3 && (
                <div className={`space-y-6 ${getAnimationClass(3)}`}>
                  <h2 className={`text-2xl font-bold ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                  }`}>
                    Learning Goals & Preferences
                  </h2>
                  <div className="space-y-4">
                    {/* Add learning goals and preferences questions here */}
                  </div>
                </div>
              )}

              {/* Step 4: Technical Interests */}
              {currentStep === 4 && (
                <div className={`space-y-6 ${getAnimationClass(4)}`}>
                  <h2 className={`text-2xl font-bold ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                  }`}>
                    Technical Interests
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                        Which areas of specialization interest you?
                      </span>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        {specializationOptions.map((specialization) => (
                          <label key={specialization} className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className={`rounded ${
                                isDarkMode 
                                  ? 'bg-gray-700 border-gray-600 text-blue-400' 
                                  : 'border-gray-300 text-indigo-600'
                              } shadow-sm focus:ring focus:ring-opacity-50`}
                              checked={formData.specializationInterests.includes(specialization)}
                              onChange={(e) => {
                                const interests = e.target.checked
                                  ? [...formData.specializationInterests, specialization]
                                  : formData.specializationInterests.filter(s => s !== specialization);
                                setFormData({ ...formData, specializationInterests: interests });
                              }}
                            />
                            <span className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {specialization}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Career & Future Plans */}
              {currentStep === 5 && (
                <div className={`space-y-6 ${getAnimationClass(5)}`}>
                  <h2 className={`text-2xl font-bold ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                  }`}>
                    Career & Future Plans
                  </h2>
                  <div className="space-y-4">
                    {/* Add career and future plans questions here */}
                  </div>
                </div>
              )}

              {/* Step 6: Additional Information */}
              {currentStep === 6 && (
                <div className={`space-y-6 ${getAnimationClass(6)}`}>
                  <h2 className={`text-2xl font-bold ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
                  }`}>
                    Additional Information
                  </h2>
                  <div className="space-y-4">
                    {/* Add additional information questions here */}
                  </div>
                </div>
              )}

              {/* Step Indicator */}
              <div className="mt-6 text-center">
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Step {currentStep} of {totalSteps}
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={handleBack}
                  className={`px-6 py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 ${
                    currentStep === 1 
                      ? "invisible" 
                      : isDarkMode
                        ? "text-gray-300 hover:text-gray-100"
                        : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className={`px-6 py-2 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
                  }`}
                >
                  {currentStep === totalSteps ? "Complete Survey" : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
} 