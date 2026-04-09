import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-slate-900 pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
             <h1 className="text-2xl font-black text-white tracking-tighter uppercase mb-6">
              Job<span className="text-blue-500">Done</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              Premium home maintenance services at your fingertips. Colombo's most trusted pro network.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Navigation</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">How it works</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Become a Pro</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Support</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="bg-slate-800 p-8 rounded-[2rem] border border-white/5">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-4">Newsletter</h4>
            <div className="flex bg-slate-900 rounded-xl p-2 border border-slate-700">
              <input placeholder="Email" className="bg-transparent border-none outline-none px-3 text-xs w-full text-white" />
              <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-500 transition-all">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">
            © 2025 JobDone. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-slate-500">
            <FaFacebook className="hover:text-white transition-all cursor-pointer" />
            <FaInstagram className="hover:text-white transition-all cursor-pointer" />
            <FaTwitter className="hover:text-white transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}