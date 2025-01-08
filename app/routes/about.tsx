import { useUser } from "@clerk/remix";
import { useState } from "react";
import { motion } from "framer-motion";
import SharedLayout from "~/components/SharedLayout";

export default function About() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const teamMembers = [
    {
      name: "Cherinet Afewerk",
      role: "Founder & Lead Developer",
      image: "https://cherinet.netlify.app/assets/fren/wow.JPG",
      description: "A visionary full-stack developer and creative photographer, bringing technical expertise and artistic perspective to educational technology. Leading Cs Courses with innovation and excellence.",
      achievements: ["2+ Years Teaching Experience", "50+ Projects Completed", "1000+ Students Mentored"],
      expertise: ["Full Stack Development", "Educational Tech", "UI/UX Design"],
      website: "https://cherinet.netlify.app",
      socialLinks: {
        github: "https://github.com/cherinet",
        linkedin: "https://linkedin.com/in/cherinet-afewerk",
        website: "https://cherinet.netlify.app"
      }
    },
    {
      name: "Endale Gezhagn",
      role: "Senior Developer",
      image: "https://endale.vercel.app/profile.jpg",
      description: "A talented Computer Science student at Dilla University with exceptional academic performance (GPA: 3.79). Passionate about creating innovative solutions through modern web technologies.",
      achievements: ["2+ Years Experience", "50+ Projects", "30+ Happy Clients"],
      expertise: ["React Development", "Node.js", "System Architecture"],
      website: "https://endale.vercel.app",
      socialLinks: {
        github: "https://github.com/endale",
        linkedin: "https://linkedin.com/in/endale-gezhagn",
        website: "https://endale.vercel.app"
      }
    },
    {
      name: "Dinex",
      role: "Technical Lead",
      image: "https://endale.vercel.app/dinex.jpg",
      description: "An accomplished Full Stack Developer with a proven track record in building scalable applications. Specializing in system architecture and performance optimization.",
      achievements: ["3+ Years Experience", "40+ Enterprise Projects", "Tech Lead Experience"],
      expertise: ["System Architecture", "Cloud Computing", "Team Leadership"],
      website: "https://dinex.dev",
      socialLinks: {
        github: "https://github.com/dinex",
        linkedin: "https://linkedin.com/in/dinex",
        website: "https://dinex.dev"
      }
    }
  ];

  return (
    <SharedLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* About Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center mb-16"
              >
                <h1 className="text-5xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] text-transparent bg-clip-text font-serif">
                  About Cs Courses
                </h1>
                <div className="max-w-4xl mx-auto space-y-6">
                  <motion.p 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`text-xl md:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-light leading-relaxed`}
                  >
                    Welcome to Cs Courses, where innovation meets education. We're on a mission to revolutionize technology education in Ethiopia and beyond.
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} font-light italic`}
                  >
                    Our journey began with a simple yet powerful vision: to create a world-class learning platform that combines cutting-edge curriculum with practical experience.
                  </motion.p>
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className={`text-lg ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} font-medium`}
                  >
                    Together, we're building the future of tech education, one student at a time.
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-0 w-64 h-64 bg-[#2563eb] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7c3aed] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-[#4f46e5] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] text-transparent bg-clip-text"
            >
              Meet Our Exceptional Team
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ 
                    y: [100, 0, 0, 100],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: 10,
                    times: [0, 0.1, 0.9, 1],
                    repeat: Infinity,
                    delay: index * 3.33,
                  }}
                  className={`rounded-xl shadow-lg overflow-hidden backdrop-blur-lg ${
                    isDarkMode 
                      ? 'bg-gray-800/80 border-gray-700' 
                      : 'bg-white/80 border-gray-100'
                  } border hover:border-indigo-500 transition-all duration-300`}
                >
                  <div className="p-6">
                    <div className="w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-indigo-500/30">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-center bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] text-transparent bg-clip-text">
                      {member.name}
                    </h3>
                    <p className={`text-sm text-center ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-3 font-medium`}>
                      {member.role}
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 text-center font-light leading-relaxed`}>
                      {member.description}
                    </p>

                    {/* Achievements Section */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2 text-center bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] text-transparent bg-clip-text">
                        Achievements
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {member.achievements.map((achievement, i) => (
                          <motion.span 
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className={`text-xs px-2 py-1 rounded-full ${
                              isDarkMode 
                                ? 'bg-indigo-900/50 text-indigo-300' 
                                : 'bg-indigo-50 text-indigo-800'
                            }`}
                          >
                            {achievement}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Expertise Section */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-2 text-center bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] text-transparent bg-clip-text">
                        Expertise
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {member.expertise.map((skill, i) => (
                          <motion.span 
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: i * 0.1 + 0.3 }}
                            className={`text-xs px-2 py-1 rounded-full ${
                              isDarkMode 
                                ? 'bg-violet-900/50 text-violet-300' 
                                : 'bg-violet-50 text-violet-800'
                            }`}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-center items-center space-x-4 mt-4">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={member.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] text-white text-sm font-medium hover:from-[#1d4ed8] hover:via-[#4338ca] hover:to-[#6d28d9] transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Visit Portfolio
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={member.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-gray-400 hover:text-gray-600 transition-colors duration-300`}
                      >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
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