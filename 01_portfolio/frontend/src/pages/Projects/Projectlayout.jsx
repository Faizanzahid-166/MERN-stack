import { Outlet, Link } from "react-router"; // make sure it's react-router-dom
import { useContext } from "react";
import ThemeContext from "../../context/themeContext.js";

export default function ProjectsLayout() {
    const { darkMode } = useContext(ThemeContext);

  const navLinks = [
    { name: "GitHub Repository Lists", path: "/projects/repositoryLists" },
    { name: "GitHub Repository Projects", path: "/projects/repositoryProjects" },
  ];

  return (
    <section className={`w-11/12 mx-auto px-2 py-2`}>

      {/* Navigation */}
      <div className={ `p-2 rounded-2xl ${ darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-400 text-black"}`}>      
      <ul className={`flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-3/4 lg:full font-bold `}>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              to={link.path}
              className={`px-4 py-2 block rounded-lg transition-all duration-200
                 ${darkMode  ? "hover:bg-green-500/10 hover:text-green-400 hover:scale-105"
                             : "hover:bg-gray-200 hover:text-black hover:scale-105"
                }`}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
      </div>


      {/* Render child routes */}
      <div className="mt-3">
        <Outlet />
      </div>
    </section>
  );
}
