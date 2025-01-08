import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "@remix-run/react";
import { UserButton, useUser } from "@clerk/remix";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in?redirect_url=/admin/dashboard");
    }
    
    // Check if user is admin
    if (isLoaded && isSignedIn) {
      const isAdmin = user.emailAddresses.some(
        email => email.emailAddress === process.env.ADMIN_EMAIL
      );
      if (!isAdmin) {
        navigate("/");
      }
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-pulse text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: "📊",
      path: "/admin/dashboard",
    },
    {
      title: "Users",
      icon: "👥",
      path: "/admin/users",
    },
    {
      title: "Courses",
      icon: "📚",
      path: "/admin/courses",
      subItems: [
        { title: "All Courses", path: "/admin/courses" },
        { title: "Add Course", path: "/admin/courses/add" },
        { title: "Categories", path: "/admin/courses/categories" },
      ],
    },
    {
      title: "Projects",
      icon: "🎯",
      path: "/admin/projects",
      subItems: [
        { title: "All Projects", path: "/admin/projects" },
        { title: "Add Project", path: "/admin/projects/add" },
        { title: "Categories", path: "/admin/projects/categories" },
      ],
    },
    {
      title: "Resources",
      icon: "📝",
      path: "/admin/resources",
      subItems: [
        { title: "Blog Posts", path: "/admin/resources/blog" },
        { title: "Tutorials", path: "/admin/resources/tutorials" },
        { title: "Events", path: "/admin/resources/events" },
      ],
    },
    {
      title: "Analytics",
      icon: "📈",
      path: "/admin/analytics",
    },
    {
      title: "Settings",
      icon: "⚙️",
      path: "/admin/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 w-64`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200">
          <Link to="/admin" className="flex items-center space-x-3">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Admin Panel
            </span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="px-4 py-4 space-y-1">
          {sidebarItems.map((item) => (
            <div key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                  location.pathname === item.path
                    ? "text-blue-700 bg-blue-50"
                    : "text-gray-700 hover:text-blue-700 hover:bg-blue-50"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.title}
              </Link>
              {item.subItems && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`block px-3 py-2 text-sm font-medium rounded-lg ${
                        location.pathname === subItem.path
                          ? "text-blue-700 bg-blue-50"
                          : "text-gray-600 hover:text-blue-700 hover:bg-blue-50"
                      }`}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? "lg:ml-64" : ""}`}>
        {/* Header */}
        <header className="fixed top-0 right-0 z-30 w-full bg-white border-b border-gray-200">
          <div className={`flex items-center justify-between h-16 px-4 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
            {/* Left side */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="text-gray-500 hover:text-gray-700">
                <span className="relative inline-block">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </span>
              </button>

              {/* Search */}
              <div className="hidden md:block">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <svg
                    className="absolute right-3 top-2.5 w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* User Menu */}
              {isLoaded && isSignedIn && (
                <div className="flex items-center space-x-3">
                  <span className="hidden md:block text-sm text-gray-700">
                    {user.firstName} {user.lastName}
                  </span>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8 rounded-lg",
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-16 min-h-screen">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 