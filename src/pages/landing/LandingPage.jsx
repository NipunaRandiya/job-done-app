import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom"; 
import HowItWorksSection from "../../components/shared/HowItWorksSection";
import Navbar from "../../components/shared/Navbar";
import { FaLightbulb, FaHammer, FaWrench, FaTint, FaPaintRoller, FaThLarge } from "react-icons/fa";

const services = [
  // ... (Services array remains the same)
  {
    icon: <FaLightbulb className="text-blue-500 text-3xl" />,
    title: "Electrical",
    description: "Wiring, fixture installation, repairs and maintenance",
  },
  {
    icon: <FaHammer className="text-blue-500 text-3xl" />,
    title: "Carpentry",
    description: "Furniture assembly, repairs, custom woodwork",
  },
  {
    icon: <FaWrench className="text-blue-500 text-3xl" />,
    title: "Handyman",
    description: "General repairs, installations, and maintenance",
  },
  {
    icon: <FaTint className="text-blue-500 text-3xl" />,
    title: "Plumbing",
    description: "Leak repairs, installations, and maintenance",
  },
  {
    icon: <FaPaintRoller className="text-blue-500 text-3xl" />,
    title: "Painting",
    description: "Interior, exterior, and decorative painting",
  },
  {
    icon: <FaThLarge className="text-blue-500 text-3xl" />,
    title: "Flooring",
    description: "Installation and repairs of all kinds of flooring",
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
        <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100">
            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    {/* Left content */}
                    <section className="px-6 lg:px-0">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-slate-900">
                            Fix Your Home
                            <br />
                            <span className="text-blue-500">Problems Fast</span>
                        </h1>

                        <p className="mt-6 text-lg text-slate-600 max-w-xl">
                            Connect with trusted local professionals. Describe your problem and get instant estimates from qualified experts in your area.
                        </p>

                        <div className="mt-8">
                            <p className="text-slate-600 mb-3 font-medium">Popular services:</p>
                            <div className="flex flex-wrap gap-3">
                                {["Electrical Repair", "Plumbing", "Furniture Assembly", "House Cleaning", "AC Repair",].map((s) => (
                                    <button
                                        key={s}
                                        className="px-4 py-2 bg-white shadow-sm rounded-full border border-white text-blue-600 hover:bg-blue-50"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Right form card */}
                    <aside className="px-6 lg:px-0">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl mx-auto">
                            <h3 className="text-2xl font-semibold text-slate-900 mb-2">Describe Your Problem</h3>
                            <p className="text-sm text-slate-500 mb-4">Tell us what you need help with to get an accurate estimate</p>

                            <div className="border-2 border-blue-100 rounded-xl p-4 mb-6">
                                <textarea
                                    className="w-full h-32 resize-none outline-none placeholder-slate-400 text-slate-700 bg-transparent"
                                    placeholder={'e.g., My kitchen sink is leaking and water is dripping under the cabinet.\nThe leak started yesterday and seems to be getting worse...'}
                                    value={problemInput}
                                    onChange={(e) => setProblemInput(e.target.value)}
                                />
                                <div className="text-xs text-slate-400 mt-2 text-right">Be specific for better results</div>
                            </div>

                            <button 
                                // 4. Attach the new handler to the main button
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl text-lg font-medium" 
                                onClick={handleStartBooking}
                            >
                                Start Booking →
                            </button>
                            <p className="text-center text-slate-400 text-sm mt-4">Get instant estimates • Connect with verified pros • Book appointments</p>
                        </div>
                    </aside>
                </div>
            </main>
            
            {/* Service Categories Section */}
            <section className="pt-24 text-center px-4">
                <h1 className="text-4xl font-bold text-gray-900">
                    Browse Service Categories
                </h1>
                <p className="text-gray-600 mt-2">
                    Find the right professional for any home project
                </p>

                {/* Services Grid */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 text-center border border-gray-100"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="bg-blue-50 p-4 rounded-full">
                                    {service.icon}
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {service.title}
                            </h3>
                            <p className="text-gray-600 mt-2 text-sm">
                                {service.description}
                            </p>
                            <a
                                href="#" 
                                className="text-blue-500 mt-4 inline-block font-medium hover:underline"
                            >
                                View Services
                            </a>
                        </div>
                    ))}
                </div>
            </section>
            <HowItWorksSection />
        </div>
    );
}

export default LandingPage;