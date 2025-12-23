import { useState, useContext } from "react";
import { Link, Outlet } from "react-router";
import { Menu, X } from "lucide-react";
import ThemeContext from "../../context/themeContext.js"; // ✅ import context

export default function Docs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode } = useContext(ThemeContext); // ✅ access theme

  const links = [
    { to: "frontend", label: "🚀 Frontend" },
    { to: "backend", label: "⚡ Backend" },
    { to: "database", label: "🗄️ Database" },
    { to: "github", label: "🔗 Github" },
  ];

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Mobile Navbar */}
      <div
        className={`flex justify-between items-center md:hidden px-6 py-4 border-b z-30 h-16
          ${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"}
        `}
      >
        <h2 className="text-lg font-bold">📚 Articles</h2>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`p-2 rounded-md transition ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
          }`}
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-16 md:top-0 left-0 w-full md:w-64 
          md:border-r z-20
          h-[calc(100vh-64px)] md:h-screen
          transform transition-transform duration-500 ease-in-out
          ${sidebarOpen ? "translate-y-0" : "-translate-y-full"}
          md:translate-y-0
          ${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}
        `}
      >
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-xl font-bold mb-6">📚 Articles</h2>
          <nav className="flex flex-col space-y-3 flex-1">
            {links.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`transition transform duration-500 ease-in-out ${
                  darkMode ? "hover:text-blue-400" : "hover:text-blue-600"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Content */}
      <main
        className={`flex-1 p-6 md:p-10 overflow-y-auto scroll-smooth transition-colors duration-500 ${
          darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="max-w-5xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
