import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function FAQSection() {
  const [active, setActive] = useState(0);

  const faqs = [
    { q: "How do I pay for the service?", a: "Payments are handled securely through our platform via Card or Mobile Wallet. We hold the payment until the job is completed." },
    { q: "Are the workers background checked?", a: "Yes, every professional must submit their NIC/ID and professional certifications for manual vetting by our admin team." },
    { q: "What if I'm not happy with the work?", a: "We offer a Service Guarantee. If the work isn't up to standard, we'll send another pro to fix it or offer a refund." },
    { q: "Can I schedule a booking for later?", a: "Absolutely. You can request an immediate 'Emergency Fix' or schedule a specific date and time that suits you." }
  ];

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Got Questions?</h2>
          <p className="text-slate-400 font-black uppercase text-[10px] tracking-[0.3em] mt-4">Everything you need to know</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className={`rounded-[2rem] border transition-all duration-300 ${active === i ? 'border-blue-500 bg-blue-50/30' : 'border-slate-100 bg-[#F8FAFC]'}`}>
              <button 
                onClick={() => setActive(i)}
                className="w-full flex justify-between items-center p-8 text-left outline-none"
              >
                <span className="font-black text-slate-900 tracking-tight">{faq.q}</span>
                <div className={`p-2 rounded-full transition-all ${active === i ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {active === i ? <FaMinus size={10} /> : <FaPlus size={10} />}
                </div>
              </button>
              {active === i && (
                <div className="px-8 pb-8 text-slate-500 font-medium leading-relaxed animate-in slide-in-from-top-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}