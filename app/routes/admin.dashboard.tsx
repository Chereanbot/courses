import { LoaderFunction } from "@remix-run/node";
import AdminLayout from "~/components/AdminLayout";
import { requireAdmin } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdmin(request);
  return null;
};

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12.5%",
      changeType: "increase",
      icon: "👥",
    },
    {
      title: "Active Courses",
      value: "45",
      change: "+3.2%",
      changeType: "increase",
      icon: "📚",
    },
    {
      title: "Total Projects",
      value: "128",
      change: "+28.4%",
      changeType: "increase",
      icon: "🎯",
    },
    {
      title: "Resources",
      value: "326",
      change: "+8.7%",
      changeType: "increase",
      icon: "📝",
    },
  ];

  const recentActivities = [
    {
      user: "John Doe",
      action: "enrolled in",
      target: "Python Programming Course",
      time: "2 minutes ago",
      icon: "🐍",
    },
    {
      user: "Jane Smith",
      action: "completed",
      target: "Java Development Project",
      time: "15 minutes ago",
      icon: "☕",
    },
    {
      user: "Mike Johnson",
      action: "submitted",
      target: "C++ Assignment",
      time: "1 hour ago",
      icon: "⚡",
    },
    {
      user: "Sarah Wilson",
      action: "started",
      target: "Web Development Course",
      time: "2 hours ago",
      icon: "🌐",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and analyze your platform's performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="mt-1 text-3xl font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="mt-4">
                <span
                  className={`inline-flex items-center text-sm ${
                    stat.changeType === "increase"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change}
                  <svg
                    className={`w-4 h-4 ml-1 ${
                      stat.changeType === "increase"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        stat.changeType === "increase"
                          ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          : "M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
                      }
                    />
                  </svg>
                </span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {recentActivities.map((activity, index) => (
                  <li key={index} className="py-5">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 text-2xl">{activity.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.user}{" "}
                          <span className="font-normal text-gray-500">
                            {activity.action}
                          </span>{" "}
                          {activity.target}
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <div>
                        <button className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50">
                          View
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <button className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                View all activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 