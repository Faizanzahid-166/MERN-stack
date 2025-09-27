// src/components/Footer.jsx
import { Github, Youtube, Linkedin } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-6 md:px-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Follow Us */}
        <div className="flex items-center gap-4">
          <span className="font-semibold text-lg">Follow Us:</span>
         <Link
            to="https://github.com/Faizanzahid-166"
            target="_blank"
            className="hover:text-green-500 flex flex-col items-center"
          >
            <Github size={20} />
            <span className="text-sm mt-1">GitHub</span>
          </Link>
          <Link
            to="https://www.linkedin.com/in/faizan-zahid-9671942a6/"
            target="_blank"
            className="hover:text-blue-400 flex flex-col items-center"
          >
            <Linkedin size={20} />
            <span className="text-sm mt-1">LinkedIn</span>
          </Link>
          <Link
            to="https://www.youtube.com/@entertainmenthub378/featured"
            target="_blank"
            className="hover:text-red-500 flex flex-col items-center"
          >
            <Youtube size={20} />
            <span className="text-sm mt-1">YouTube</span>
          </Link>
        </div>

        {/* Email */}
        <div className="text-center text-sm md:text-base">
          Email:{" "}
          <a
            href="mailto:faizanzahid166@gmail.com"
            className="underline hover:text-blue-400"
          >
            faizanzahid166@gmail.com
          </a>
        </div>

        {/* Report Issue Button */}
        <div>
          <Link
            to='/contact'
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm transition-colors"
          >
            Report Issue
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-4 text-xs text-gray-400">
        © {new Date().getFullYear()} Marked guts. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
