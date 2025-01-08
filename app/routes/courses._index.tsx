import { Link } from "@remix-run/react";
import SharedLayout from "~/components/SharedLayout";

export default function CoursesIndex() {
  return (
    <SharedLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Available Courses</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* JavaScript Course Card */}
            <Link
              to="javascript"
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-yellow-900/60 to-amber-900/70" />
                <img
                  src="https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3"
                  alt="JavaScript Course"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-2xl font-bold text-white">JavaScript</h2>
                  <p className="text-gray-200">Master Modern JavaScript</p>
                </div>
              </div>
            </Link>

            {/* Python Course Card */}
            <Link
              to="python"
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-blue-900/60 to-indigo-900/70" />
                <img
                  src="https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3"
                  alt="Python Course"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-2xl font-bold text-white">Python</h2>
                  <p className="text-gray-200">Learn Python Programming</p>
                </div>
              </div>
            </Link>

            {/* Java Course Card */}
            <Link
              to="java"
              className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-red-900/60 to-orange-900/70" />
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3"
                  alt="Java Course"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-2xl font-bold text-white">Java</h2>
                  <p className="text-gray-200">Java Development</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
} 