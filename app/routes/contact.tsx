import { useState, useEffect } from "react";
import { useUser } from "@clerk/remix";
import { motion } from "framer-motion";
import SharedLayout from "~/components/SharedLayout";

export default function Contact() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: user?.firstName ? `${user.firstName} ${user.lastName}` : "",
    email: user?.emailAddresses[0]?.emailAddress || "",
    subject: "",
    message: "",
    department: "general",
  });

  const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Support team members data with updated images and info
  const supportTeam = [
    {
      id: "1",
      name: "Cherinet Afewerk",
      role: "Technical Support Lead",
      image: "https://cherinet.netlify.app/assets/fren/wow.JPG",
      expertise: ["Full Stack Development", "System Architecture", "DevOps"],
      availability: "Online",
      responseTime: "< 15 mins"
    },
    {
      id: "2",
      name: "Endale Gezhagn",
      role: "Course Support Specialist",
      image: "https://endale.vercel.app/img/profile.jpg",
      expertise: ["Course Content", "Learning Paths", "Student Success"],
      availability: "Online",
      responseTime: "< 30 mins"
    },
    {
      id: "3",
      name: "Dinex",
      role: "Student Success Manager",
      image: "/images/dinex.jpg",
      expertise: ["Academic Support", "Career Guidance", "Learning Strategy"],
      availability: "Online",
      responseTime: "< 20 mins"
    }
  ];

  // Check system preference for dark mode
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowSuccess(true);
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

  const inputStyles = `mt-1 block w-full rounded-lg shadow-sm transition-all duration-200 
    ${isDarkMode 
      ? 'bg-gray-800/80 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50' 
      : 'bg-white/80 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50'
    }`;

  return (
    <SharedLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Header Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] text-transparent bg-clip-text font-serif">
                Get in Touch
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`text-xl md:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-light max-w-3xl mx-auto`}
              >
                Our dedicated support team is here to help you succeed in your learning journey.
              </motion.p>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#2563eb] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7c3aed] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-[#4f46e5] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>
        </section>

        {/* Support Team Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {supportTeam.map((member, index) => (
                <motion.button
                  key={member.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  onClick={() => setSelectedTeamMember(member.id)}
                  className={`rounded-xl shadow-lg overflow-hidden backdrop-blur-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    isDarkMode 
                      ? 'bg-gray-800/80 border-gray-700' 
                      : 'bg-white/80 border-gray-100'
                  } border ${selectedTeamMember === member.id ? 'ring-2 ring-[#4f46e5]' : ''}`}
                >
                  <div className="p-6">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-indigo-500/30">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-center bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] text-transparent bg-clip-text">
                      {member.name}
                    </h3>
                    <p className={`text-sm text-center ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-3`}>
                      {member.role}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                      {member.expertise.map((skill, i) => (
                        <span
                          key={i}
                          className={`text-xs px-2 py-1 rounded-full ${
                            isDarkMode 
                              ? 'bg-indigo-900/50 text-indigo-300' 
                              : 'bg-indigo-50 text-indigo-800'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${
                        member.availability === 'Online' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}></span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {member.responseTime}
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>

            {/* Contact Form and Info Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className={`rounded-xl shadow-lg overflow-hidden backdrop-blur-lg ${
                  isDarkMode 
                    ? 'bg-gray-800/80 border-gray-700' 
                    : 'bg-white/80 border-gray-100'
                } border`}
              >
                <div className="p-8">
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] text-transparent bg-clip-text">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={inputStyles}
                          required
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={inputStyles}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={inputStyles}
                        required
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={`${inputStyles} resize-none`}
                        required
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 px-4 rounded-lg shadow-lg text-white font-medium transition-all duration-300 ${
                        isDarkMode 
                          ? 'bg-[#4f46e5] hover:bg-[#4338ca]' 
                          : 'bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] hover:from-[#1d4ed8] hover:via-[#4338ca] hover:to-[#6d28d9]'
                      }`}
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : 'Send Message'}
                    </motion.button>

                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`rounded-lg p-4 ${
                          isDarkMode ? 'bg-emerald-900/50 text-emerald-200' : 'bg-emerald-50 text-emerald-800'
                        }`}
                      >
                        Message sent successfully! We'll get back to you soon.
                      </motion.div>
                    )}
                  </form>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className={`rounded-xl shadow-lg overflow-hidden backdrop-blur-lg ${
                  isDarkMode 
                    ? 'bg-gray-800/80 border-gray-700' 
                    : 'bg-white/80 border-gray-100'
                } border p-8`}>
                  <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] text-transparent bg-clip-text">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-center space-x-4"
                      >
                        <span className="text-2xl">{info.icon}</span>
                        <div>
                          <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {info.title}
                          </h3>
                          <p className={`text-sm ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                            {info.info}
                          </p>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {info.availability}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Additional Support Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className={`rounded-xl shadow-lg overflow-hidden ${
                    isDarkMode 
                      ? 'bg-indigo-900/90' 
                      : 'bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed]'
                  } p-8 text-white`}
                >
                  <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
                  <p className="mb-6 text-indigo-100">
                    Our premium support team is available 24/7 to assist you with any urgent inquiries.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                      isDarkMode ? 'bg-white text-indigo-900' : 'bg-white text-indigo-600'
                    } hover:bg-opacity-90`}
                  >
                    Get Premium Support
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg bg-white text-gray-900 hover:shadow-xl transition-shadow duration-300"
        >
          🌙
        </button>
      </div>
    </SharedLayout>
  );
} 