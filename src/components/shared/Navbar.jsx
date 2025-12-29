import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 text-lg">🔨</div>
              <span className="text-lg font-semibold text-slate-800">Job Done</span>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-slate-700">
            <Link to="/" className="hover:text-slate-900">Find Pros</Link>
            <Link to="/" className="hover:text-slate-900">How It Works</Link>
            <Link to="/" className="hover:text-slate-900">Services</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/client-register" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.64 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Client Register</span>
            </Link>

            <Link to="/register" className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L15 8l6 .5-4.5 3.5L18 20 12 16 6 20l1.5-8L3 8.5 9 8z" />
              </svg>
              <span>Pro Register</span>
            </Link>

            <Link to="/login" className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="white">
                <path d="M12 2L15 8l6 .5-4.5 3.5L18 20 12 16 6 20l1.5-8L3 8.5 9 8z" />
              </svg>
              <span>Pro Login</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
