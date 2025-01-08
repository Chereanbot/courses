import { useState, useEffect } from "react";
import { SignedIn, useUser } from "@clerk/remix";
import { Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";

export default function JavaScriptCourse() {
  const { isSignedIn } = useUser();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3",
      title: "Master Modern JavaScript",
      description: "Learn JavaScript from fundamentals to advanced concepts with modern ES6+ features"
    },
    {
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3",
      title: "Full-Stack Development",
      description: "Build dynamic web applications with Node.js, React, and modern frameworks"
    },
    {
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3",
      title: "Real-World Projects",
      description: "Create professional applications using modern JavaScript technologies"
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const handleProtectedAction = (e: React.MouseEvent) => {
    console.log('Navigation attempted, isSignedIn:', isSignedIn);
    if (!isSignedIn) {
      e.preventDefault();
      setShowAuthModal(true);
      console.log('Navigation prevented, showing auth modal');
    } else {
      console.log('Navigation allowed');
    }
  };

  return (
    <SharedLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[600px] w-full overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-yellow-900/60 to-amber-900/70" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center">
                  <div className="container mx-auto px-4">
                    <div className="max-w-4xl">
                      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        {slide.title}
                      </h1>
                      <p className="text-xl text-gray-200 mb-8">
                        {slide.description}
                      </p>
                      <div className="flex gap-4">
                        <Link
                          to="jsbasics"
                          onClick={handleProtectedAction}
                          className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-medium transition duration-300"
                        >
                          Start Learning
                        </Link>
                        <Link
                          to="projects"
                          onClick={handleProtectedAction}
                          className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-medium backdrop-blur-sm transition duration-300"
                        >
                          View Projects
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to access the course content.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowAuthModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                Cancel
              </button>
              <Link
                to="/sign-in"
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </SharedLayout>
  );
} 