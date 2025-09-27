import { useContext } from "react";
import {Link} from 'react-router'
import ThemeContext from "../../context/themeContext.js";
import { Slider } from "../../components/00index.js";
import { motion } from "framer-motion";

const Home = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <section
      className={`min-h-screen flex flex-col items-center px-6 md:px-16 py-16 relative overflow-hidden transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* 🔹 Moving Gradient Blobs */}
      <motion.div
        className={`absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full ${
          darkMode
            ? "bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600"
            : "bg-gradient-to-br from-blue-300 via-green-300 to-teal-200"
        } opacity-40 blur-3xl`}
        animate={{ x: [0, 100, -100, 0], y: [0, 80, -80, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className={`absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full ${
          darkMode
            ? "bg-gradient-to-tr from-blue-500 via-purple-700 to-pink-600"
            : "bg-gradient-to-tr from-pink-200 via-red-200 to-yellow-200"
        } opacity-40 blur-3xl`}
        animate={{ x: [0, -120, 120, 0], y: [0, -100, 100, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      {/* 🔹 Big Slider at Top */}
      <div className="w-full max-w-6xl z-10 mb-16">
        <Slider />
      </div>

      {/* 🔹 Intro + Video */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 w-full max-w-6xl z-10">
        {/* Left: Intro */}
        <div className="flex flex-col text-center md:text-left gap-6 max-w-xl">
          <h2 className="text-2xl md:text-5xl font-extrabold hover:scale-105 transition-transform">
            Hi, I’m <span className="text-blue-400">Faizan Zahid</span> 👋
          </h2>

          <p className="text-base md:text-lg lg:text-xl max-w-lg hover:opacity-80 transition-opacity">
            A passionate{" "}
            <span className="font-semibold text-blue-400">Web Developer</span> who
            loves building modern, fast, and user-friendly apps using{" "}
            <span className="font-semibold">React, Node.js, and MongoDB</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-4">
            <Link
              to="/projects/gitprojects"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              🚀 View My Projects
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition"
            >
              👨‍💻 About Me
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition"
            >
              ✉️ Contact
            </Link>
          </div>
        </div>

        {/* Right: Video */}
        <div className="w-full max-w-md md:max-w-lg">
          <video
            className="w-full rounded-xl shadow-2xl border border-gray-300"
            autoPlay
            loop
            playsInline
            controls
          >
            <source src="/video/v_(1).mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* 🔹 Skills Section */}
      <div className="mt-20 w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-6 z-10">
        {["React", "Node.js", "Express", "MongoDB", "TailwindCSS", "GitHub", "Redux", "REST APIs", "PHP"].map(
          (skill, i) => (
            <motion.div
              key={i}
              className="p-4 text-center rounded-xl bg-white/10 hover:scale-105 shadow-md transition"
              whileHover={{ scale: 1.1 }}
            >
              <p className="font-semibold">{skill}</p>
            </motion.div>
          )
        )}
      </div>

      {/* 🔹 Highlights Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8  w-full max-w-5xl text-center z-10">
        <div className="p-6 bg-white/10 rounded-2xl hover:scale-105 shadow-md">
          <h3 className="text-3xl font-bold">20+</h3>
          <p className="text-gray-400">Projects Completed</p>
        </div>
        <div className="p-6 bg-white/10 rounded-2xl hover:scale-105 shadow-md">
          <h3 className="text-3xl font-bold">15+</h3>
          <p className="text-gray-400">GitHub Repos</p>
        </div>
        <div className="p-6 bg-white/10 rounded-2xl hover:scale-105 shadow-md">
          <h3 className="text-3xl font-bold">3+</h3>
          <p className="text-gray-400">Years Experience</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
