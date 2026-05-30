// src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <span className="font-display font-bold text-2xl text-white">Blitz Wild Affairs</span>
          <p className="mt-3 text-sm leading-relaxed max-w-sm">
            A modern blogging platform for creators and thinkers. Share your ideas with the world.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/blogs" className="hover:text-white transition-colors">Blogs</Link></li>
            <li><Link to="/register" className="hover:text-white transition-colors">Get Started</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
            <li><Link to="/register" className="hover:text-white transition-colors">Sign up</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs">© {new Date().getFullYear()} Blitz Wild Affairs. All rights reserved.</p>
        <p className="text-xs">Built with ❤️ using React, Supabase &amp; Express</p>
      </div>
    </footer>
  );
}
