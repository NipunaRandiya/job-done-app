import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HowItWorksSection from "../../components/shared/HowItWorksSection";
import AboutSection from "../../components/shared/AboutSection";
import FAQSection from "../../components/shared/FAQSection";
import Footer from "../../components/shared/Footer";
import Navbar from "../../components/shared/Navbar";
import ChatWidget from "../../components/shared/ChatWidget";
import { 
  FaLightbulb, FaHammer, FaWrench, FaTint, 
  FaPaintRoller, FaThLarge, FaArrowRight, FaCheckCircle 
} from "react-icons/fa";

const services = [
  {
    icon: <FaLightbulb />,
    title: "Electrical",
    description: "Wiring, fixture installation, repairs and maintenance",
    color: "blue"
  },
  {
    icon: <FaHammer />,
    title: "Carpentry",
    description: "Furniture assembly, repairs, custom woodwork",
    color: "orange"
  },
  {
    icon: <FaWrench />,
    title: "Handyman",
    description: "General repairs, installations, and maintenance",
    color: "slate"
  },
  {
    icon: <FaTint />,
    title: "Plumbing",
    description: "Leak repairs, installations, and maintenance",
    color: "cyan"
  },
  {
    icon: <FaPaintRoller />,
    title: "Painting",
    description: "Interior, exterior, and decorative painting",
    color: "purple"
  },
  {
    icon: <FaThLarge />,
    title: "Flooring",
    description: "Installation and repairs of all kinds of flooring",
    color: "green"
  },
];

function LandingPage() {
  const navigate = useNavigate();
  const [problemInput, setProblemInput] = useState('');

  const handleStartBooking = () => {
    if (problemInput) {
      const encodedProblem = encodeURIComponent(problemInput);
      navigate(`/booking?problem=${encodedProblem}`);
    } else {
      alert("Please describe your problem to start.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 lg:pt-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <section className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">Available in Colombo</p>
            </div>

            <h1 className="text-6xl md:text-7xl font-black leading-[0.9] text-slate-900 tracking-tighter">
              Fix Your Home <br />
              <span className="text-blue-600">Problems Fast.</span>
            </h1>

            <p className="text-lg text-slate-500 font-medium max-w-lg leading-relaxed">
              The smartest way to find trusted local professionals. Describe your issue and receive instant estimates from verified experts.
            </p>

            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Popular Services</p>
              <div className="flex flex-wrap gap-2">
                {["Electrical", "Plumbing", "AC Repair", "Cleaning"].map((s) => (
                  <button
                    key={s}
                    className="px-5 py-2.5 bg-white shadow-sm rounded-2xl border border-slate-100 text-sm font-bold text-slate-700 hover:border-blue-500 hover:text-blue-600 transition-all active:scale-95"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <aside className="relative">
            <div className="absolute -inset-4 bg-blue-500/5 rounded-[3rem] blur-2xl"></div>
            
            <div className="relative bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-8 md:p-10 border border-slate-50">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <FaWrench size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">Need a Fix?</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Get an estimate today</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 focus-within:bg-white focus-within:border-blue-500 transition-all">
                  <textarea
                    className="w-full h-32 resize-none outline-none placeholder-slate-300 text-sm font-bold text-slate-700 bg-transparent"
                    placeholder={'e.g., My kitchen sink is leaking and water is dripping under the cabinet...'}
                    value={problemInput}
                    onChange={(e) => setProblemInput(e.target.value)}
                  />
                </div>

                <button 
                  onClick={handleStartBooking}
                  className="w-full bg-slate-900 hover:bg-blue-600 text-white py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 group" 
                >
                  Start Booking
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <FaCheckCircle className="text-green-500" /> Instant Quotes
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <FaCheckCircle className="text-green-500" /> Verified Pros
                    </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <section id="services-section" className="py-32 bg-white rounded-t-[5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.02)] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Browse Categories</h2>
            <p className="text-slate-500 font-medium uppercase text-[10px] tracking-[0.3em]">Qualified Professionals for every task</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-[#f8fafc] rounded-[2.5rem] p-8 border border-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-blue-100 hover:border-blue-100 transition-all duration-500 cursor-pointer"
              >
                <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center text-2xl text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 group-hover:gap-4 transition-all">
                  Explore Services <FaArrowRight />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="about-section">
      <AboutSection />
      </section>
      <section id="how-it-works">
        <HowItWorksSection />
      </section>
      <FAQSection />
      <Footer />

      <ChatWidget />
    </div>
  );
}

export default LandingPage;