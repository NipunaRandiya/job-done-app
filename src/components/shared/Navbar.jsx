import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  FiLogIn, FiUser, FiBriefcase, 
  FiChevronDown, FiMenu, FiX 
} from "react-icons/fi";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const dropdownLinkClass = "flex items-center gap-3 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.12em] text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all group/item";

  const scrollToSection = (e, id) => {
    e.preventDefault();
    
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => performScroll(id), 100);
    } else {
      performScroll(id);
    }
    setIsMobileMenuOpen(false);
  };

  const performScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 0; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-xl shadow-sm py-4" 
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-12">

          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200 group-hover:scale-105 transition-transform">
              <FiBriefcase className="text-white text-xl" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter">
              Job<span className="text-blue-600">Done</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-10">
            <button 
              onClick={(e) => scrollToSection(e, "services-section")}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={(e) => scrollToSection(e, "how-it-works")}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={(e) => scrollToSection(e, "about-section")}
              className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 transition-colors"
            >
              About Us
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            
            <Link 
              to="/login" 
              className="flex items-center gap-2 px-6 py-2.5 rounded-2xl border border-slate-200 text-[11px] font-black uppercase tracking-widest text-slate-700 hover:bg-slate-50 transition-all shadow-sm"
            >
              <FiLogIn size={14} className="text-blue-600" />
              Login
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all">
                Join Us
                <FiChevronDown className="group-hover:rotate-180 transition-transform duration-300" />
              </button>

              <div className="absolute right-0 mt-3 w-60 rounded-[1.8rem] bg-white border border-slate-50 shadow-[0_20px_40px_rgba(15,23,42,0.06)] opacity-0 scale-95 invisible group-hover:visible group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] p-2 z-50">
                
                <Link 
                  to="/client-register" 
                  className={`${dropdownLinkClass} group/item`}
                >
                  <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                    <FiUser size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">I'm a Client</span>
                    <span className="text-[10px] text-slate-400 font-medium">Looking for professional help</span>
                  </div>
                </Link>

                <div className="h-px bg-slate-50 mx-4 my-1" />
                <Link 
                  to="/register" 
                  className={`${dropdownLinkClass} group/item`}
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors">
                    <FiBriefcase size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">I'm a Professional</span>
                    <span className="text-[10px] text-slate-400 font-medium">Want to offer my services</span>
                  </div>
                </Link>
                
              </div>
            </div>
          </div>

          <button 
            className="md:hidden p-2 text-slate-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>

        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6">
            <button onClick={(e) => scrollToSection(e, "services-section")} className="text-left font-black uppercase tracking-widest text-slate-900">Services</button>
            <button onClick={(e) => scrollToSection(e, "how-it-works")} className="text-left font-black uppercase tracking-widest text-slate-900">How It Works</button>
            <button onClick={(e) => scrollToSection(e, "about-section")} className="text-left font-black uppercase tracking-widest text-slate-900">About Us</button>
            <hr className="border-slate-50" />
            <Link to="/client-login" className="font-black uppercase tracking-widest text-blue-600">Client Access</Link>
            <Link to="/login" className="font-black uppercase tracking-widest text-slate-400">Pro Access</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;