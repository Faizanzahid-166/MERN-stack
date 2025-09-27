import { Link } from "react-router";
import { useContext } from "react";
import ThemeContext from "../../context/themeContext.js";

export default function About() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <section
      className={`max-w-5xl mx-auto px-6 py-16 transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Title */}
      <h2 className="text-4xl font-extrabold mb-6 text-center">
        About Me
      </h2>

      {/* Main Description */}
      <p className="text-lg leading-relaxed mb-6 text-center">
        Hi, I’m{" "}
        <span className="text-blue-600 dark:text-blue-400 font-semibold">
          Faizan Zahid
        </span>
        , a <span className="font-semibold">MERN Stack Developer</span> who
        loves building responsive, modern, and scalable web applications.
        Skilled in{" "}
        <span className="font-semibold">React, Node.js, Express.js, MongoDB</span>,{" "}
        and <span className="font-semibold">Tailwind CSS</span>, I enjoy solving
        problems, writing clean code, and creating great user experiences 🚀.
      </p>

      {/* Highlights */}
      <div className="grid md:grid-cols-2 gap-8 text-left mb-16">
        {/* Strengths */}
        <div
          className={`p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            🚀 Strengths
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Clean, maintainable & scalable code</li>
            <li>Responsive, mobile-first UI design</li>
            <li>Performance optimization</li>
            <li>Debugging & problem-solving</li>
          </ul>
        </div>

        {/* Experience */}
        <div
          className={`p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            💼 Experience & Projects
          </h3>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>Developed multiple apps using <span className="font-semibold">MERN stack</span></li>
            <li>Used <span className="font-semibold">Redux, RTK Query & Context API</span></li>
            <li>Built backend APIs with <span className="font-semibold">Express.js + MongoDB</span></li>
            <li>Created UI with <span className="font-semibold">React & Tailwind</span></li>
            <li>Deployed apps on <span className="font-semibold">Vercel & Render</span></li>
            <li>Integrated full <span className="font-semibold">Contact Form</span></li>
          </ul>
        </div>
      </div>

      {/* About the Project */}
      <div
        className={`p-8 rounded-2xl shadow-lg transition-all mb-16 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h3 className="text-3xl font-bold mb-4 text-center text-green-600 dark:text-green-400">
          📌 About This MERN Project
        </h3>
        <p className="text-lg leading-relaxed mb-4">
          This portfolio project is more than just a static website — it’s a{" "}
          <span className="font-semibold">full MERN stack application</span>.
        </p>
        <ul className="list-disc list-inside space-y-3">
          <li>
            🔹 <span className="font-semibold">GitHub Repos Showcase</span> — I
            fetch my repositories dynamically and display them with{" "}
            <span className="font-semibold">category filters</span> and{" "}
            <span className="font-semibold">pagination</span>.
          </li>
          <li>
            🔹 <span className="font-semibold">Deployment Links</span> — Each
            project includes both a <span className="font-semibold">Code link</span> (GitHub) and a{" "}
            <span className="font-semibold">Live Demo</span> link (Vercel/Render).
          </li>
          <li>
            🔹 <span className="font-semibold">Custom Projects</span> — I also
            added my own apps like a{" "}
           <Link to="/projects/form"><span className="font-semibold underline">To-Do App</span></Link> where data is saved
            to the <span className="font-semibold">backend database</span> using
            Express.js and MongoDB.
          </li>
          <li>
            🔹 <span className="font-semibold">Docs & Articles</span> — A section
            where I write about frontend, backend, database, and GitHub to share
            knowledge.
          </li>
        </ul>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <Link
          to="https://github.com/Faizanzahid-166"
          target="_blank"
          rel="noreferrer"
          className="px-8 py-3 rounded-xl shadow-md text-white bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-all"
        >
          Explore My GitHub 🔗
        </Link>

        <Link
          to="/projects/githubmoro"
          className="px-8 py-3 rounded-xl shadow-md text-white bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all"
        >
          View Projects & Live Demos 🚀
        </Link>

        <Link
          to="/contact"
          className="px-8 py-3 rounded-xl shadow-md text-white bg-purple-600 hover:bg-purple-700 transform hover:scale-105 transition-all"
        >
          Contact Me ✉️
        </Link>
      </div>
    </section>
  );
}
