import React, { useState, useRef, useEffect } from "react";
import { FiMessageSquare, FiX, FiSend, FiUser, FiShield } from "react-icons/fi";
import axios from "axios";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [roleType, setRoleType] = useState("user"); 
  const [chatHistory, setChatHistory] = useState([
    { role: "assistant", content: "Hi there! 👋 How can I help you find the right pro for your home today?" }
  ]);
  
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || loading) return;

    const userMessage = message;
    setMessage(""); 
    setChatHistory(prev => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/ai/chat`, {
        message: userMessage,
        roleType: roleType 
      });

      const aiReply = response.data.reply || response.data.message;
      
      setChatHistory(prev => [...prev, { role: "assistant", content: aiReply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setChatHistory(prev => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting to the server. 🛠️" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] max-w-[calc(100vw-3rem)] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-5 duration-300 flex flex-col h-[500px]">
          
          <div className="bg-slate-900 p-6 text-white shrink-0">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <FiMessageSquare size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-tight uppercase">JobDone Bot</h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl">
                <FiX size={20} />
              </button>
            </div>

            <div className="flex bg-white/5 p-1 rounded-xl gap-1">
              {["user", "worker"].map((role) => (
                <button
                  key={role}
                  onClick={() => setRoleType(role)}
                  className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    roleType === role ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 bg-[#f8fafc] space-y-4 custom-scrollbar">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.role === "user" ? "bg-slate-900 text-white" : "bg-blue-100 text-blue-600"
                }`}>
                  {msg.role === "user" ? <FiUser size={14} /> : <FiShield size={14} />}
                </div>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm border ${
                  msg.role === "user" 
                    ? "bg-blue-600 text-white rounded-tr-none border-blue-500" 
                    : "bg-white text-slate-600 rounded-tl-none border-slate-100"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 p-4 italic text-slate-400 text-xs animate-pulse">
                Bot is thinking...
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-50 shrink-0">
            <div className="relative flex items-center">
              <input 
                type="text"
                placeholder={`Ask as ${roleType}...`}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-sm font-bold text-slate-700 outline-none focus:border-blue-500 focus:bg-white transition-all pr-12"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button 
                type="submit"
                disabled={loading || !message.trim()}
                className="absolute right-2 p-2 bg-blue-600 text-white rounded-xl hover:bg-slate-900 transition-all disabled:opacity-50"
              >
                <FiSend size={16} />
              </button>
            </div>
            <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em] mt-3">
              Powered by JobDone AI • {roleType} mode
            </p>
          </form>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl transition-all duration-500 active:scale-90 group ${
          isOpen ? "bg-slate-900 rotate-90" : "bg-blue-600 hover:bg-slate-900"
        }`}
      >
        {isOpen ? <FiX size={28} /> : <FiMessageSquare size={28} className="group-hover:scale-110 transition-transform" />}
      </button>
    </div>
  );
}