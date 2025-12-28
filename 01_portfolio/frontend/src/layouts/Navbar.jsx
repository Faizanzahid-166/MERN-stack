import { useState, useContext, useEffect } from "react"; // 👈 add useEffect
import { Link, useNavigate } from "react-router";  
import { Menu as MenuIcon, ArrowUp, Sun, Moon } from "lucide-react"; // ✅ added ArrowUp
import Sidebar from "./Sidebar.jsx";               
import LOGO from "../assets/MG_logo.png";

import ThemeContext from "../context/themeContext.js";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  // 🔹 State for Go to Top button visibility
  const [showTopBtn, setShowTopBtn] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShowTopBtn(true);   // ✅ show button
    } else {
      setShowTopBtn(false);  // ❌ hide button
    }
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Docs", path: "/docs" },
    { name: "Contact", path: "/contact" },
    { name: "Code Tool", path: "/codeEditor" },
    { name: "Error", path: "/error" },
  ];

  return (
    <>
      <nav
        className={`w-full px-6 py-3 shadow-lg flex items-center justify-between transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* Left: logo + mobile menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-1 rounded hover:bg-gray-800 dark:hover:bg-gray-700"
          >
            <MenuIcon size={22} />
          </button>

          <Link to="/" className="tracking-wide flex items-center gap-3 relative group">
            <img
              src={LOGO}
              alt="Marked Guts Logo"
              className="h-10 w-auto md:h-14 lg:h-16"
            />
          </Link>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className="hover:bg-red-500 cursor-pointer p-2 rounded-2xl font-bold transition-all duration-105"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* 🌙 Theme Toggle */}
        <div className="flex flex-row items-center">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          <span className="text-md">{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
        
          <Link className="p-1" to="/auth/login">Login</Link>
           {/* <Link className="p-1" to="/auth/signup">Signup</Link> */}
        </div>

        {/* Mobile Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </nav>

      {/* 🔝 Go To Top Button */}
      {showTopBtn && (
  <button
    onClick={scrollToTop}
    className="fixed bottom-6 right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all"
  >
    <ArrowUp size={22} />
  </button>
)}
    </>
  );
};

export default Navbar;
