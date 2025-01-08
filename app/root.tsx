import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { ClerkApp } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import type { LoaderFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import "./tailwind.css";

export const loader: LoaderFunction = (args) => rootAuthLoader(args, {
  afterSignInUrl: "/dashboard",
  afterSignUpUrl: "/survey",
});

function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/677d1f3549e2fd8dfe03b123/1ih0c3qk4';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `
          }}
        />
      </head>
      <body className="h-full">
        <Outlet />
        
        {/* Footer */}
        <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="space-y-4 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text animate-gradient-x">
                    Digital Aksumite
                  </span>
                </div>
                <p className="text-gray-600 text-sm hover:text-gray-800 transition-colors duration-300">
                  Empowering learners worldwide with cutting-edge technology education and comprehensive course materials.
                </p>
                <div className="flex space-x-4">
                  <a href="https://twitter.com" className="group relative">
                    <span className="absolute -inset-2 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <svg className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-colors duration-300 relative" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                    </svg>
                  </a>
                  <a href="https://github.com" className="group relative">
                    <span className="absolute -inset-2 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <svg className="h-6 w-6 text-gray-400 group-hover:text-gray-900 transition-colors duration-300 relative" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" className="group relative">
                    <span className="absolute -inset-2 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <svg className="h-6 w-6 text-gray-400 group-hover:text-blue-700 transition-colors duration-300 relative" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href="https://youtube.com" className="group relative">
                    <span className="absolute -inset-2 bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <svg className="h-6 w-6 text-gray-400 group-hover:text-red-600 transition-colors duration-300 relative" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text uppercase mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {[
                    { to: "/courses", label: "All Courses" },
                    { to: "/about", label: "About Us" },
                    { to: "/contact", label: "Contact" },
                    { to: "/blog", label: "Blog" },
                    { to: "/careers", label: "Careers" }
                  ].map((link) => (
                    <li key={link.to}>
                      <Link 
                        to={link.to} 
                        className="group relative text-gray-600 hover:text-blue-600 text-sm transition-colors duration-300 flex items-center"
                      >
                        <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          →
                        </span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text uppercase mb-4">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {[
                    { to: "/help", label: "Help Center" },
                    { to: "/terms", label: "Terms of Service" },
                    { to: "/privacy", label: "Privacy Policy" },
                    { to: "/faq", label: "FAQ" },
                    { to: "/community", label: "Community" }
                  ].map((link) => (
                    <li key={link.to}>
                      <Link 
                        to={link.to} 
                        className="group relative text-gray-600 hover:text-indigo-600 text-sm transition-colors duration-300 flex items-center"
                      >
                        <span className="absolute -left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          →
                        </span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="transform hover:scale-105 transition-transform duration-300">
                <h3 className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text uppercase mb-4">
                  Stay Updated
                </h3>
                <p className="text-gray-600 text-sm mb-4 hover:text-gray-800 transition-colors duration-300">
                  Subscribe to our newsletter for the latest updates and exclusive offers.
                </p>
                <form className="space-y-3">
                  <div className="relative group">
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-blue-300"
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform hover:scale-105 transition-all duration-300 animate-gradient-x"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-500 text-sm group">
                  © {new Date().getFullYear()} Digital Aksumite. 
                  <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {" "}All rights reserved.
                  </span>
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  {[
                    { to: "/terms", label: "Terms" },
                    { to: "/privacy", label: "Privacy" },
                    { to: "/cookies", label: "Cookies" }
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-gray-500 hover:text-gray-900 text-sm relative group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
          @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
            background-size: 200% 200%;
          }
        `}} />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default ClerkApp(App);
