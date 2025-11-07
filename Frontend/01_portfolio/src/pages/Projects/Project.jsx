import React from "react";
import {Link} from "react-router"

export default function ProjectWelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600  to-green-500 flex flex-col items-center justify-center text-center px-6 text-white">
      
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
        Welcome to My Different Projects 🚀
      </h1>

      <p className="text-lg max-w-2xl opacity-90 leading-relaxed">
        Explore my projects created using <span className="font-semibold text-yellow-300">
        React, Next.js, Vite, Laravel, JavaScript, PHP</span> and other
        modern technologies. View live demos and source code from personal
        work and projects built for companies.
      </p>

      <div className="flex flex-wrap gap-4 mt-10">
        <Link
          to="/projects/repomanager"
          className="px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-300 transition shadow-md"
        >
          My Projects
        </Link>

        <Link
          to="/projects/githubrepo"
          className="px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-200 transition shadow-md"
        >
          Git hub Repo
        </Link>

        <Link
          to="/projects/githubmoro"
          className="px-6 py-3 bg-indigo-900 text-white rounded-full font-semibold hover:bg-indigo-800 transition shadow-md"
        >
          Company Work
        </Link>
      </div>

    </div>
  );
}
