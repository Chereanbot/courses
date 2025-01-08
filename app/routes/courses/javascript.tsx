import { useState, useEffect } from "react";
import { SignedIn, useUser } from "@clerk/remix";
import { Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";

export default function JavaScriptCourse() {
  const { isSignedIn } = useUser();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // ... rest of your existing JavaScript course code ...

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
            {/* ... your existing hero section code ... */}
            <div className="flex gap-4">
              <Link
                to="/courses/javascript/jsbasics"
                onClick={handleProtectedAction}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 rounded-lg font-medium transition duration-300"
              >
                Start Learning
              </Link>
              {/* ... rest of your buttons ... */}
            </div>
          </div>
        </section>

        {/* ... rest of your existing sections ... */}
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