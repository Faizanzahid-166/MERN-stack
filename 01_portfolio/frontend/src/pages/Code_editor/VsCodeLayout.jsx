import { Outlet, Link } from "react-router";
import { useContext, useRef, useEffect } from "react";
import ThemeContext from "../../context/themeContext.js";

export default function VsCodeLayout() {
  const { darkMode } = useContext(ThemeContext);
  const previewRef = useRef(null); // target your preview container

  const navLinks = [
    { name: "HTML", path: "/codeEditor/html" },
    { name: "JavaScript", path: "/codeEditor/javascript" },
    { name: "SQL", path: "/codeEditor/SQLEditor" },
     { name: "PHP", path: "/codeEditor/PHPEditor" },
  ];

  // Fullscreen handler for F11
  useEffect(() => {
    const handleF11 = (e) => {
      if (e.key === "F11") {
        e.preventDefault(); // prevent browser default

        const elem = previewRef.current;
        if (!elem) return;

        if (!document.fullscreenElement) {
          elem.requestFullscreen().catch((err) => {
            console.log(`Error enabling full-screen mode: ${err.message}`);
          });
        } else {
          document.exitFullscreen();
        }
      }
    };

    window.addEventListener("keydown", handleF11);
    return () => window.removeEventListener("keydown", handleF11);
  }, []);

  return (
    <section className={`w-11/12 mx-auto px-3 py-5`}>

      {/* Navigation */}
      <div className={`p-2 rounded-2xl ${darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-400 text-black"}`}>      
        <ul className={`flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-3/4 lg:full font-bold`}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`px-4 py-2 block rounded-lg transition-all duration-200
                  ${darkMode 
                    ? "hover:bg-green-500/10 hover:text-green-400 hover:scale-105"
                    : "hover:bg-gray-200 hover:text-black hover:scale-105"
                  }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Render child routes */}
      <div className="mt-3">
        <div ref={previewRef} className="w-full h-[700px] border rounded-lg overflow-auto">
          <Outlet />
        </div>
      </div>
    </section>
  );
}
