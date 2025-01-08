import { useState, useEffect } from "react";
import { useUser } from "@clerk/remix";
import type { ActionFunction } from "@remix-run/node";

export default function Contact() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: user?.firstName ? `${user.firstName} ${user.lastName}` : "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    subject: "",
    message: "",
    department: "general",
  });

  // Add state for support team view
  const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Support team members data
  const supportTeam = [
    {
      id: "1",
      name: "Cherinet",
      role: "Technical Support Lead",
      avatar: "👨‍💻",
      expertise: ["Full Stack Development", "System Architecture", "DevOps"],
      availability: "Online",
      responseTime: "< 15 mins"
    },
    {
      id: "2",
      name: "Dinex",
      role: "Course Support Specialist",
      avatar: "👨‍🏫",
      expertise: ["Course Content", "Learning Paths", "Student Success"],
      availability: "Online",
      responseTime: "< 30 mins"
    },
    {
      id: "3",
      name: "Biniam",
      role: "Student Success Manager",
      avatar: "👨‍🎓",
      expertise: ["Academic Support", "Career Guidance", "Learning Strategy"],
      availability: "Online",
      responseTime: "< 20 mins"
    }
  ];

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check system preference for dark mode
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }

    // Listen for changes in system dark mode preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: user?.firstName ? `${user.firstName} ${user.lastName}` : "",
        email: user?.emailAddresses[0]?.emailAddress || "",
        subject: "",
        message: "",
        department: "general",
      });
      setSelectedTeamMember(null);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const faqs = [
    {
      question: "How can I get technical support for my courses?",
      answer: "Our technical support team is available 24/7. You can reach them through the support portal in your dashboard or by submitting a ticket through this contact form."
    },
    {
      question: "What's your response time for inquiries?",
      answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, premium support members receive priority response within 4 hours."
    },
    {
      question: "Can I schedule a consultation with an instructor?",
      answer: "Yes! You can request a one-on-one consultation with your course instructor through the course dashboard or by selecting 'Instructor Meeting' in the subject dropdown above."
    },
    {
      question: "How do I report a technical issue?",
      answer: "To report a technical issue, please select 'Technical Support' from the department dropdown and provide as much detail as possible about the problem you're experiencing."
    }
  ];

  const contactInfo = [
    {
      icon: "📞",
      title: "Phone Support",
      info: "+251 97 006 369",
      availability: "Mon-Fri, 9AM-6PM EAT"
    },
    {
      icon: "📧",
      title: "Email",
      info: "digital@courses.dg.com",
      availability: "24/7 Response"
    },
    {
      icon: "💬",
      title: "Live Chat",
      info: "Available on Dashboard",
      availability: "24/7 for Premium Users"
    }
  ];

  // Enhanced input styles with dark mode
  const inputStyles = `mt-1 block w-full rounded-lg shadow-sm transition-all duration-200 
    ${isDarkMode 
      ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' 
      : 'bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50'
    }`;

  const selectStyles = `mt-1 block w-full rounded-lg shadow-sm transition-all duration-200 
    ${isDarkMode 
      ? 'bg-gray-800 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' 
      : 'bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50'
    }`;

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text'
          }`}>
            Digital Aksumite Support Team
          </h1>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Our dedicated support team is here to help you succeed. Choose a team member or department to get started.
          </p>
        </div>

        {/* Support Team Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {supportTeam.map((member) => (
            <button
              key={member.id}
              onClick={() => setSelectedTeamMember(member.id)}
              className={`rounded-xl shadow-lg p-6 text-left transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-750' 
                  : 'bg-white hover:bg-gray-50'
              } ${
                selectedTeamMember === member.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl">{member.avatar}</span>
                <div>
                  <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    {member.role}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${
                    member.availability === 'Online' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></span>
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {member.availability}
                  </span>
                </div>
                <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                  Response time: {member.responseTime}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {member.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 text-xs rounded-full ${
                        isDarkMode 
                          ? 'bg-blue-900 text-blue-200' 
                          : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className={`rounded-xl shadow-lg p-6 md:p-8 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {selectedTeamMember && (
                <div className={`mb-6 p-4 rounded-lg ${
                  isDarkMode ? 'bg-blue-900/50 text-blue-200' : 'bg-blue-50 text-blue-600'
                }`}>
                  <p className="text-sm">
                    You're contacting {supportTeam.find(m => m.id === selectedTeamMember)?.name}
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputStyles}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputStyles}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="department" className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={selectStyles}
                >
                  <option value="general">General Inquiry</option>
                  <option value="technical">Technical Support</option>
                  <option value="courses">Course Support</option>
                  <option value="payment">Payment Support</option>
                  <option value="feedback">Feedback & Suggestions</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={inputStyles}
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`${inputStyles} resize-none`}
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                    isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>

              {/* Success Message */}
              {showSuccess && (
                <div className={`rounded-lg p-4 ${
                  isDarkMode ? 'bg-green-900/50' : 'bg-green-50'
                }`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className={`h-5 w-5 ${
                        isDarkMode ? 'text-green-400' : 'text-green-400'
                      }`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${
                        isDarkMode ? 'text-green-200' : 'text-green-800'
                      }`}>
                        Message sent successfully! We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Right Side Content */}
          <div className="space-y-8">
            {selectedTeamMember ? (
              // Selected Team Member Details
              <div className={`rounded-xl shadow-lg p-6 md:p-8 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <h2 className={`text-2xl font-semibold mb-6 ${
                  isDarkMode ? 'text-white' : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text'
                }`}>
                  Team Member Details
                </h2>
                {(() => {
                  const member = supportTeam.find(m => m.id === selectedTeamMember);
                  return member ? (
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <span className="text-4xl">{member.avatar}</span>
                        <div>
                          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {member.name}
                          </h3>
                          <p className={`text-blue-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            {member.role}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                            Expertise
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {member.expertise.map((skill, index) => (
                              <span
                                key={index}
                                className={`px-3 py-1 text-sm rounded-full ${
                                  isDarkMode 
                                    ? 'bg-blue-900 text-blue-200' 
                                    : 'bg-blue-50 text-blue-600'
                                }`}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                            Availability
                          </h4>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`w-2 h-2 rounded-full ${
                              member.availability === 'Online' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></span>
                            <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {member.availability}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>
                            Response Time
                          </h4>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
                            {member.responseTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            ) : (
              // Default Contact Info & FAQs
              <>
                <div className={`rounded-xl shadow-lg p-6 md:p-8 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <h2 className={`text-2xl font-semibold mb-6 ${
                    isDarkMode ? 'text-white' : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text'
                  }`}>
                    Contact Information
                  </h2>
                  <div className="grid gap-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="text-2xl">{info.icon}</div>
                        <div>
                          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {info.title}
                          </h3>
                          <p className={`text-blue-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            {info.info}
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            {info.availability}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`rounded-xl shadow-lg p-6 md:p-8 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <h2 className={`text-2xl font-semibold mb-6 ${
                    isDarkMode ? 'text-white' : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text'
                  }`}>
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {faq.question}
                        </h3>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Additional Support Section */}
        <div className={`mt-12 rounded-xl shadow-lg p-8 ${
          isDarkMode 
            ? 'bg-blue-900' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600'
        }`}>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              Need Immediate Assistance?
            </h2>
            <p className="mb-6 text-blue-100">
              Contact Digital Aksumite support team for priority assistance.
              We're here to help you succeed in your learning journey.
            </p>
            <button className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              isDarkMode 
                ? 'bg-blue-100 text-blue-900 hover:bg-blue-200' 
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}>
              Get Priority Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 